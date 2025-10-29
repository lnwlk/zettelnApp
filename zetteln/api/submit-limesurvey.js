export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const NOTION_TOKEN = process.env.NOTION_TOKEN
  const NOTION_LIMESURVEY_DATABASE_ID = process.env.NOTION_LIMESURVEY_DATABASE_ID

  if (!NOTION_TOKEN || !NOTION_LIMESURVEY_DATABASE_ID) {
    return res.status(500).json({ error: 'Server config missing' })
  }

  try {
    const { answers, timestamp } = req.body

    console.log('📊 LimeSurvey received:', {
      keys: Object.keys(answers || {}),
      name: answers?.name || 'none',
      email: answers?.email || 'none',
    })

    // Helper: Convert answer to string
    const answerToString = (answer) => {
      if (!answer) return ''

      // Array (Multiple Choice)
      if (Array.isArray(answer)) {
        return answer.join(', ')
      }

      // Plain string
      return String(answer)
    }

    // Build properties object
    const properties = {
      Timestamp: {
        date: { start: timestamp || new Date().toISOString() },
      },
      Name: {
        title: [{ text: { content: answers.name || '' } }],
      },
      Question1: {
        rich_text: [{ text: { content: answerToString(answers.question1) } }],
      },
      Question2: {
        rich_text: [{ text: { content: answerToString(answers.question2) } }],
      },
      Message: {
        rich_text: [{ text: { content: answers.message || '' } }],
      },
    }

    // Email only add if valid
    if (answers.email && typeof answers.email === 'string' && answers.email.trim() !== '') {
      properties.Email = {
        email: answers.email.trim(),
      }
      console.log('✅ Adding email:', answers.email.trim())
    } else {
      console.log('⚠️ No valid email provided')
    }

    const notionResponse = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_LIMESURVEY_DATABASE_ID },
        properties: properties,
      }),
    })

    const responseText = await notionResponse.text()

    if (!notionResponse.ok) {
      console.error('❌ Notion error:', responseText)
      return res.status(500).json({
        error: 'Notion failed',
        status: notionResponse.status,
        details: responseText.substring(0, 500),
      })
    }

    const data = JSON.parse(responseText)
    console.log('✅ LimeSurvey success! ID:', data.id)

    return res.status(200).json({ success: true, notionId: data.id })
  } catch (error) {
    console.error('❌ Exception:', error.message)
    return res.status(500).json({ error: error.message })
  }
}
