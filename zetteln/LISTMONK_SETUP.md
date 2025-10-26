# Listmonk Email Notification Setup

This guide will help you set up Listmonk integration for sending email notifications to users who complete the survey and provide their email address.

## Prerequisites

1. A running Listmonk instance (self-hosted or cloud-hosted)
2. Listmonk admin credentials
3. Access to your deployment environment variables (Vercel, etc.)

## Step 1: Set Up Listmonk

### Option A: Self-Hosted Listmonk

1. Follow the [official Listmonk installation guide](https://listmonk.app/docs/installation/)
2. Install using Docker (recommended):
   ```bash
   # Download docker-compose.yml from Listmonk
   wget -O docker-compose.yml https://raw.githubusercontent.com/knadh/listmonk/master/docker-compose.yml

   # Start Listmonk
   docker-compose up -d
   ```
3. Access Listmonk at `http://localhost:9000`
4. Complete the initial setup wizard

### Option B: Cloud-Hosted Listmonk

Use a managed Listmonk hosting service or deploy to your preferred cloud provider.

## Step 2: Configure Listmonk

### 2.1 Create a Subscriber List

1. Log in to your Listmonk admin panel
2. Go to **Lists** → **Create new**
3. Create a list for your survey respondents (e.g., "Survey Participants")
4. Note the **List ID** (you'll see it in the URL or list details)

### 2.2 Create Email Template (Optional)

If you want to send a welcome/confirmation email when users complete the survey:

1. Go to **Campaigns** → **Templates** → **Create new**
2. Create a template with your welcome message
3. Use template variables like `{{ .Name }}` and `{{ .Language }}` for personalization
4. Example template:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
    <h1>Thank you, {{ .Name }}!</h1>
    <p>We appreciate you taking the time to complete our survey.</p>
    <p>We'll keep you updated about the project.</p>
    <p>Best regards,<br>The Team</p>
</body>
</html>
```

5. Note the **Template ID**

### 2.3 Configure SMTP Settings

1. Go to **Settings** → **SMTP**
2. Configure your SMTP server (Gmail, SendGrid, AWS SES, etc.)
3. Test the connection to ensure emails can be sent

## Step 3: Set Environment Variables

Add the following environment variables to your deployment (e.g., in Vercel):

### Required Variables:

```bash
# Listmonk instance URL
LISTMONK_URL=https://your-listmonk-instance.com

# Listmonk API credentials
LISTMONK_USERNAME=your_listmonk_username
LISTMONK_PASSWORD=your_listmonk_password

# List ID where subscribers will be added
LISTMONK_LIST_ID=1
```

### Optional Variables:

```bash
# Template ID for welcome email (if you want to send immediate confirmation)
LISTMONK_TEMPLATE_ID=1
```

### In Vercel:

1. Go to your project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable with its value
4. Redeploy your application for changes to take effect

### Local Development:

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in your Listmonk credentials
3. The `.env.local` file is already in `.gitignore` to prevent committing secrets

## Step 4: How It Works

When a user completes the survey and provides an email:

1. **Survey data is saved to Notion** (existing functionality)
2. **User is added to Listmonk subscriber list** with:
   - Email address
   - Name (from survey or derived from email)
   - Custom attributes: language, survey completion date, etc.
   - Status: `enabled` (immediately subscribed)
3. **Optional welcome email is sent** (if `LISTMONK_TEMPLATE_ID` is configured)

### Data Flow:

```
User completes survey with email
           ↓
    Save to Notion ✓
           ↓
    Add to Listmonk list
           ↓
  Send welcome email (optional)
           ↓
      Done!
```

## Step 5: Subscriber Attributes

The integration automatically stores these attributes for each subscriber:

- `language`: Survey language (de, en, fr, etc.)
- `survey_completed_at`: Timestamp of survey completion
- `name`: User's name from survey
- `languages`: Languages the user speaks
- `frequency`: How often they write letters

You can use these attributes in Listmonk for:
- Segmentation
- Personalized campaigns
- Analytics

## Step 6: Create Email Campaigns

After collecting subscribers, you can create campaigns in Listmonk:

1. Go to **Campaigns** → **Create new**
2. Select your subscriber list
3. Choose a template or create content
4. Schedule or send immediately
5. Track opens, clicks, and engagement

## Troubleshooting

### Subscribers not being added

1. Check Vercel/deployment logs for errors
2. Verify environment variables are set correctly
3. Test Listmonk API credentials:
   ```bash
   curl -u "username:password" https://your-listmonk-instance.com/api/lists
   ```
4. Ensure `LISTMONK_LIST_ID` matches an existing list

### Welcome emails not sending

1. Verify `LISTMONK_TEMPLATE_ID` is set and correct
2. Check Listmonk SMTP settings
3. Review Listmonk logs for email delivery errors
4. Check spam folder

### Duplicate subscribers

The integration handles duplicates automatically:
- If email already exists, it updates the subscriber
- Lists are merged (won't create duplicates in the same list)

## API Endpoints

The Listmonk service (`api/services/listmonk.js`) provides these functions:

- `addSubscriber(email, name, listIds, attributes)` - Add/update subscriber
- `sendTransactionalEmail(email, templateId, data)` - Send immediate email
- `triggerCampaign(campaignId, subscriberEmail)` - Trigger specific campaign

## Security Notes

- Never commit `.env.local` or environment variables to git
- Use strong passwords for Listmonk admin account
- Consider enabling double opt-in for GDPR compliance
- Review Listmonk's privacy and security settings

## Advanced Configuration

### Enable Double Opt-In

In `api/services/listmonk.js`, change:

```javascript
preconfirm_subscriptions: true  // Skip double opt-in
```

to:

```javascript
preconfirm_subscriptions: false  // Require confirmation
```

### Custom Subscriber Status

Change the default status in `api/services/listmonk.js`:

```javascript
status: 'enabled'  // Options: 'enabled', 'disabled', 'blocklisted'
```

## Resources

- [Listmonk Documentation](https://listmonk.app/docs/)
- [Listmonk API Reference](https://listmonk.app/docs/apis/)
- [Listmonk GitHub](https://github.com/knadh/listmonk)

## Support

If you encounter issues:
1. Check deployment logs
2. Review Listmonk admin panel for errors
3. Verify all environment variables are set correctly
4. Test Listmonk API access independently
