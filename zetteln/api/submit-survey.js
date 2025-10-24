// api/submit-survey.js
// Vercel Serverless Function für Notion Integration

export default async function handler(req, res) {
  // Nur POST erlauben
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

  if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
    return res.status(500).json({ error: 'Server configuration missing' });
  }

  try {
    const { answers, language, timestamp } = req.body;

    // Notion API Call
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({
        parent: {
          database_id: NOTION_DATABASE_ID
        },
        properties: {
          // Timestamp
          'Timestamp': {
            date: {
              start: timestamp || new Date().toISOString()
            }
          },
          
          // Language
          'Language': {
            rich_text: [{
              text: { content: language || 'de' }
            }]
          },
          
          // Age
          'Age': {
            rich_text: [{
              text: { 
                content: answers.age?.selected || '' 
              }
            }]
          },
          
          // Gender
          'Gender': {
            rich_text: [{
              text: { 
                content: answers.gender?.selected || '' 
              }
            }]
          },
          
          // Employment
          'Employment': {
            rich_text: [{
              text: { 
                content: answers.employment?.selected || '' 
              }
            }]
          },
          
          // Education
          'Education': {
            rich_text: [{
              text: { 
                content: answers.education?.selected || '' 
              }
            }]
          },
          
          // Contact
          'Contact': {
            rich_text: [{
              text: { 
                content: answers.contact?.selected || '' 
              }
            }]
          },
          
          // Digital Skills
          'DigitalSkills': {
            rich_text: [{
              text: { 
                content: answers.digitalSkills?.selected || '' 
              }
            }]
          },
          
          // App Usage
          'AppUsage': {
            rich_text: [{
              text: { 
                content: answers.appUsage 
                  ? `${answers.appUsage.selected}${answers.appUsage.followUp ? ' - ' + answers.appUsage.followUp : ''}`
                  : ''
              }
            }]
          },
          
          // Challenges (Multiple Choice - als Liste)
          'Challenges': {
            rich_text: [{
              text: { 
                content: Array.isArray(answers.challenges) 
                  ? answers.challenges.join(', ')
                  : (answers.challenges?.selections || []).join(', ')
              }
            }]
          },
          
          // Perfect Help (Text)
          'PerfectHelp': {
            rich_text: [{
              text: { 
                content: answers.perfectHelp || '' 
              }
            }]
          },
          
          // Email
          'Email': {
            rich_text: [{
              text: { 
                content: answers.email?.wantsUpdates 
                  ? answers.email.email 
                  : 'Keine Angabe'
              }
            }]
          }
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Notion API Error:', error);
      throw new Error('Notion API failed');
    }

    const data = await response.json();
    
    return res.status(200).json({ 
      success: true, 
      notionId: data.id 
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Failed to save to Notion',
      message: error.message 
    });
  }
}
