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
  const NOTION_SUPPORT_DATABASE_ID = process.env.NOTION_SUPPORT_DATABASE_ID

  if (!NOTION_TOKEN || !NOTION_SUPPORT_DATABASE_ID) {
    return res.status(500).json({ error: 'Server config missing' })
  }

  try {
    const { answers, language, timestamp } = req.body

    console.log('📊 Received support survey:', {
      language,
      keys: Object.keys(answers || {}),
      email: answers.email || 'none',
    })

    // Helper: Konvertiere Antwort zu String
    const answerToString = (answer) => {
      if (!answer) return ''

      // Array (Multiple Choice)
      if (Array.isArray(answer)) {
        return answer.join(', ')
      }

      // Object mit selected (Single Choice)
      if (answer.selected) {
        return answer.followUp ? `${answer.selected} - ${answer.followUp}` : answer.selected
      }

      // Object mit selections (Multiple Choice mit other)
      if (answer.selections) {
        let result = answer.selections.join(', ')
        if (answer.otherText) {
          result += ` (Sonstiges: ${answer.otherText})`
        }
        return result
      }

      // Plain string
      return String(answer)
    }

    // Build properties object
    const properties = {
      Timestamp: {
        date: { start: timestamp || new Date().toISOString() },
      },
      Language: {
        rich_text: [{ text: { content: language || 'de' } }],
      },
      Role: {
        rich_text: [{ text: { content: answerToString(answers.role) } }],
      },
      Support: {
        rich_text: [{ text: { content: answerToString(answers.support) } }],
      },
      Name: {
        rich_text: [{ text: { content: answers.name || '' } }],
      },
      Message: {
        rich_text: [{ text: { content: answers.message || '' } }],
      },
    }

    // Email nur hinzufügen wenn vorhanden UND es ein gültiger String ist
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
        parent: { database_id: NOTION_SUPPORT_DATABASE_ID },
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
    console.log('✅ Success! ID:', data.id)

    return res.status(200).json({ success: true, notionId: data.id })
  } catch (error) {
    console.error('❌ Exception:', error.message)
    return res.status(500).json({ error: error.message })
  }
}
