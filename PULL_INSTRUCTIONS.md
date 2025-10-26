# Instructions to Get the Support Survey Code

Run these commands in your terminal (in the zettelnApp directory):

## Step 1: Check your current branch
```bash
git branch
```
You should see a `*` next to `claude/replace-tally-with-limesurvey-011CUVaqqxofE9g5dBZuLjxv`

## Step 2: Check your current commit
```bash
git log --oneline -1
```
You should see: `8005025 Simplify support survey to German-only`

If you DON'T see this commit, continue to Step 3.

## Step 3: Pull the latest changes
```bash
git pull origin claude/replace-tally-with-limesurvey-011CUVaqqxofE9g5dBZuLjxv
```

## Step 4: Verify the files exist
```bash
ls zetteln/src/supportSurvey/
```
You should see:
- NOTION_SETUP.md
- Survey.jsx
- components/
- i18n.js
- index.js
- locales/
- questions.js

## Alternative: Hard Reset (if pull doesn't work)

If the pull command doesn't work, you might have local changes. You can reset to match the remote:

```bash
git fetch origin
git reset --hard origin/claude/replace-tally-with-limesurvey-011CUVaqqxofE9g5dBZuLjxv
```

⚠️ WARNING: This will discard any local uncommitted changes!

## After getting the code:

Check that these files exist:
- `zetteln/src/supportSurvey/` (new folder)
- `zetteln/api/submit-support-survey.js` (new file)
- `zetteln/src/pages/AppWaitlistPage.tsx` (modified)

## Still not working?

Make sure you're in the correct directory. Run:
```bash
pwd
```

You should be in a path ending with `/zettelnApp`

If you're in the wrong directory, navigate to your zettelnApp folder first:
```bash
cd /path/to/your/zettelnApp
```
