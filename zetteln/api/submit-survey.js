export default async function handler(req, res) {
  // CORS Headers ZUERST!
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // OPTIONS Handler (Browser Preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Nur POST erlauben
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const NOTION_TOKEN = process.env.NOTION_TOKEN
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID

  console.log('✅ Handler called with POST')
  console.log('ENV:', { hasToken: !!NOTION_TOKEN, hasDbId: !!NOTION_DATABASE_ID })

  if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
    console.error('❌ Missing env vars')
    return res.status(500).json({ error: 'Server config missing' })
  }

  try {
    const { answers, language, timestamp } = req.body

    console.log('📊 Received data:', { language, answerKeys: Object.keys(answers || {}) })

    const notionResponse = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          Timestamp: {
            date: { start: timestamp || new Date().toISOString() },
          },
          Language: {
            rich_text: [{ text: { content: language || 'de' } }],
          },
          Answers: {
            rich_text: [{ text: { content: JSON.stringify(answers).substring(0, 2000) } }],
          },
        },
      }),
    })

    const responseText = await notionResponse.text()
    console.log('Notion status:', notionResponse.status)

    if (!notionResponse.ok) {
      console.error('❌ Notion error:', responseText)
      return res.status(500).json({
        error: 'Notion failed',
        status: notionResponse.status,
        details: responseText.substring(0, 500),
      })
    }

    const data = JSON.parse(responseText)
    console.log('✅ Success! ID:', data.id)

    return res.status(200).json({ success: true, notionId: data.id })
  } catch (error) {
    console.error('❌ Exception:', error.message)
    return res.status(500).json({ error: error.message })
  }
}
