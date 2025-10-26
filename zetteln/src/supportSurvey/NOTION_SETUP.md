# Notion Database Setup for Support Survey

This document explains how to set up the Notion database for the support survey submissions.

## Required Notion Database Fields

Create a new Notion database with the following properties:

### 1. **Timestamp** (Date)
- **Type**: Date
- **Description**: Automatically captures when the form was submitted

### 2. **Language** (Text)
- **Type**: Rich Text
- **Description**: The language code (always "de" for German)

### 3. **Role** (Text)
- **Type**: Rich Text
- **Description**: User's role selection from question 1
- **Possible values**:
  - privatePerson (Ich bin eine Privatperson / Ehrenamtliche)
  - organization (Ich bin Teil einer Organisation)
  - administration (Ich komme aus der Verwaltung)
  - other - [custom text] (Andere)

### 4. **Support** (Text)
- **Type**: Rich Text
- **Description**: How the user wants to support from question 2
- **Possible values**:
  - testApp (Ich möchte die App testen)
  - integrateApp (Ich möchte die App in ein bestehendes Hilfsangebot einbinden)
  - shareExperience (Ich möchte mein Erfahrung mit Behörden teilen / bei der Appentwicklung beraten)
  - other - [custom text] (Andere)

### 5. **Name** (Text)
- **Type**: Rich Text
- **Description**: User's name from question 3

### 6. **Email** (Email)
- **Type**: Email
- **Description**: User's email address from question 4
- **Note**: This is an Email property type, not Rich Text

### 7. **Message** (Text)
- **Type**: Rich Text
- **Description**: User's message from question 5 (optional field)

## Environment Variable Setup

After creating the Notion database, you need to set up the following environment variables:

### 1. **NOTION_TOKEN**
- This should already exist if you have the user survey set up
- If not, create a new Notion integration at https://www.notion.so/my-integrations
- Copy the Internal Integration Token

### 2. **NOTION_SUPPORT_DATABASE_ID**
- Open your Notion database
- Copy the database ID from the URL
- Format: `https://notion.so/[workspace]/[DATABASE_ID]?v=...`
- Add to your `.env` file:
  ```
  NOTION_SUPPORT_DATABASE_ID=your_database_id_here
  ```

## Database Permissions

Make sure to share the database with your Notion integration:
1. Open the database in Notion
2. Click "..." in the top right
3. Click "Add connections"
4. Select your integration

## Testing

After setup, test the form submission:
1. Fill out the form at `/app-waitlist`
2. Submit the form
3. Check your Notion database for the new entry
4. Verify all fields are populated correctly

## Field Mapping

The form answers are mapped to Notion fields as follows:

| Form Question | Notion Field | Type |
|--------------|-------------|------|
| Was beschreibt deine Rolle am Besten? | Role | Rich Text |
| Wie kannst du unterstützen? | Support | Rich Text |
| Dein Name | Name | Rich Text |
| Deine E-Mail | Email | Email |
| Nachricht | Message | Rich Text |
| (metadata) | Timestamp | Date |
| (metadata) | Language | Rich Text |

## Troubleshooting

### "Server config missing" error
- Make sure both `NOTION_TOKEN` and `NOTION_SUPPORT_DATABASE_ID` are set in your environment variables
- Restart your development server after adding environment variables

### "Notion failed" error
- Check that the database is shared with your integration
- Verify the database ID is correct
- Ensure all required fields exist in the database with the correct property types
- Check the console logs for detailed error messages

### Email field not saving
- Make sure the "Email" field in Notion is of type "Email", not "Rich Text"
- The API will skip the email if it's empty or invalid
