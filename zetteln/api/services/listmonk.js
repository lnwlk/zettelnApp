/**
 * Listmonk API Service
 * Handles subscriber management and email campaign triggers
 */

/**
 * Add a subscriber to Listmonk
 * @param {string} email - User's email address
 * @param {string} name - User's name (optional)
 * @param {number[]} listIds - Array of list IDs to subscribe to
 * @param {Object} attributes - Additional subscriber attributes
 * @returns {Promise<Object>} Subscriber data from Listmonk
 */
export async function addSubscriber(email, name = '', listIds = [], attributes = {}) {
  const listmonkUrl = process.env.LISTMONK_URL
  const listmonkUser = process.env.LISTMONK_USERNAME
  const listmonkPassword = process.env.LISTMONK_PASSWORD

  if (!listmonkUrl || !listmonkUser || !listmonkPassword) {
    throw new Error('Listmonk configuration missing. Please set LISTMONK_URL, LISTMONK_USERNAME, and LISTMONK_PASSWORD environment variables.')
  }

  // Prepare subscriber data
  const subscriberData = {
    email: email,
    name: name || email.split('@')[0], // Use email prefix as name if not provided
    status: 'enabled', // 'enabled', 'disabled', or 'blocklisted'
    lists: listIds,
    attribs: attributes,
    preconfirm_subscriptions: true // Skip double opt-in if you want immediate subscription
  }

  try {
    const response = await fetch(`${listmonkUrl}/api/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${listmonkUser}:${listmonkPassword}`).toString('base64')
      },
      body: JSON.stringify(subscriberData)
    })

    const data = await response.json()

    if (!response.ok) {
      // Check if subscriber already exists
      if (response.status === 409 || data.message?.includes('already exists')) {
        console.log(`⚠️ Subscriber already exists: ${email}`)
        // Optionally update existing subscriber
        return await updateSubscriberByEmail(email, listIds, attributes)
      }
      throw new Error(`Listmonk API error: ${data.message || response.statusText}`)
    }

    console.log(`✅ Successfully added subscriber to Listmonk: ${email}`)
    return data.data
  } catch (error) {
    console.error('❌ Error adding subscriber to Listmonk:', error.message)
    throw error
  }
}

/**
 * Update existing subscriber by email
 * @param {string} email - User's email address
 * @param {number[]} listIds - Array of list IDs to subscribe to
 * @param {Object} attributes - Additional subscriber attributes
 * @returns {Promise<Object>} Updated subscriber data
 */
async function updateSubscriberByEmail(email, listIds = [], attributes = {}) {
  const listmonkUrl = process.env.LISTMONK_URL
  const listmonkUser = process.env.LISTMONK_USERNAME
  const listmonkPassword = process.env.LISTMONK_PASSWORD

  try {
    // First, get the subscriber ID by email
    const searchResponse = await fetch(
      `${listmonkUrl}/api/subscribers?query=subscribers.email='${email}'`,
      {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${listmonkUser}:${listmonkPassword}`).toString('base64')
        }
      }
    )

    const searchData = await searchResponse.json()

    if (!searchData.data?.results?.length) {
      throw new Error('Subscriber not found')
    }

    const subscriberId = searchData.data.results[0].id
    const currentLists = searchData.data.results[0].lists || []

    // Merge list IDs (avoid duplicates)
    const existingListIds = currentLists.map(list => list.id)
    const mergedListIds = [...new Set([...existingListIds, ...listIds])]

    // Update subscriber
    const updateResponse = await fetch(`${listmonkUrl}/api/subscribers/${subscriberId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${listmonkUser}:${listmonkPassword}`).toString('base64')
      },
      body: JSON.stringify({
        email: email,
        lists: mergedListIds,
        attribs: attributes
      })
    })

    const updateData = await updateResponse.json()

    if (!updateResponse.ok) {
      throw new Error(`Failed to update subscriber: ${updateData.message}`)
    }

    console.log(`✅ Successfully updated existing subscriber: ${email}`)
    return updateData.data
  } catch (error) {
    console.error('❌ Error updating subscriber:', error.message)
    throw error
  }
}

/**
 * Trigger a campaign for a subscriber
 * @param {number} campaignId - Campaign ID to trigger
 * @param {string} subscriberEmail - Email address to send to
 * @returns {Promise<Object>} Campaign response
 */
export async function triggerCampaign(campaignId, subscriberEmail) {
  const listmonkUrl = process.env.LISTMONK_URL
  const listmonkUser = process.env.LISTMONK_USERNAME
  const listmonkPassword = process.env.LISTMONK_PASSWORD

  if (!listmonkUrl || !listmonkUser || !listmonkPassword) {
    throw new Error('Listmonk configuration missing')
  }

  try {
    // Note: You need to set up a transactional template/campaign in Listmonk
    // This is a basic example - adjust based on your Listmonk setup
    console.log(`📧 Campaign trigger for ${subscriberEmail} - Campaign ID: ${campaignId}`)
    console.log('Note: Implement specific campaign triggering based on your Listmonk setup')

    // For transactional emails, you might use the TX API endpoint instead
    // See: https://listmonk.app/docs/apis/transactional/

    return { success: true, message: 'Subscriber added to list. Campaign will be sent based on Listmonk automation.' }
  } catch (error) {
    console.error('❌ Error triggering campaign:', error.message)
    throw error
  }
}

/**
 * Send a transactional email via Listmonk
 * @param {string} email - Recipient email
 * @param {number} templateId - Template ID from Listmonk
 * @param {Object} data - Template variables
 * @returns {Promise<Object>} Response from Listmonk
 */
export async function sendTransactionalEmail(email, templateId, data = {}) {
  const listmonkUrl = process.env.LISTMONK_URL
  const listmonkUser = process.env.LISTMONK_USERNAME
  const listmonkPassword = process.env.LISTMONK_PASSWORD

  if (!listmonkUrl || !listmonkUser || !listmonkPassword) {
    throw new Error('Listmonk configuration missing')
  }

  try {
    const response = await fetch(`${listmonkUrl}/api/tx`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${listmonkUser}:${listmonkPassword}`).toString('base64')
      },
      body: JSON.stringify({
        subscriber_email: email,
        template_id: templateId,
        data: data,
        content_type: 'html'
      })
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(`Failed to send transactional email: ${responseData.message || response.statusText}`)
    }

    console.log(`✅ Successfully sent transactional email to: ${email}`)
    return responseData
  } catch (error) {
    console.error('❌ Error sending transactional email:', error.message)
    throw error
  }
}
