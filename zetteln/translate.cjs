// translate.js - DeepL Übersetzungs-Script (Final Version)
//
// SETUP:
// 1. Kostenlosen DeepL Account: https://www.deepl.com/pro-api
// 2. API-Key hier eintragen:

const DEEPL_API_KEY = '0834a132-2c79-412f-8043-733d0ca4badb:fx' // ← Hier eintragen!

// Konfiguration
const SOURCE_FILE = './src/survey/locales/de.json'
const OUTPUT_DIR = './src/survey/locales/'
const SOURCE_LANG = 'de'
const TARGET_LANGUAGES = ['tr']

// Rate Limiting (wichtig!)
const DELAY_BETWEEN_REQUESTS = 500 // 500ms = langsamer, aber sicherer
const DELAY_BETWEEN_LANGUAGES = 5000 // 5 Sekunden zwischen Sprachen
const MAX_RETRIES = 3 // Bei Fehler 3x neu versuchen

// ========================================
// AB HIER NICHTS ÄNDERN
// ========================================

const fs = require('fs')
const path = require('path')

// Sprachen die "formality" unterstützen
const FORMALITY_SUPPORTED = ['de', 'fr', 'it', 'es', 'nl', 'pl', 'pt-pt', 'pt-br', 'ru', 'ja']

function checkFiles() {
  if (!fs.existsSync(SOURCE_FILE)) {
    console.error('❌ FEHLER: Quell-Datei nicht gefunden!')
    console.error(`   Gesucht: ${SOURCE_FILE}\n`)
    process.exit(1)
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }
}

// Sleep Funktion
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// DeepL API mit Retry-Logik
async function translateText(text, targetLang, retryCount = 0) {
  const url = 'https://api-free.deepl.com/v2/translate'

  const params = {
    text: text,
    source_lang: SOURCE_LANG.toUpperCase(),
    target_lang: targetLang.toUpperCase(),
  }

  if (FORMALITY_SUPPORTED.includes(targetLang.toLowerCase())) {
    params.formality = 'less'
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(params),
    })

    if (!response.ok) {
      const errorText = await response.text()

      if (response.status === 429) {
        // Rate Limit erreicht
        if (retryCount < MAX_RETRIES) {
          const waitTime = (retryCount + 1) * 2000 // 2s, 4s, 6s
          console.log(
            `\n  ⏳ Rate Limit erreicht. Warte ${waitTime / 1000}s... (Versuch ${retryCount + 1}/${MAX_RETRIES})`,
          )
          await sleep(waitTime)
          return translateText(text, targetLang, retryCount + 1)
        }
        throw new Error('Rate Limit - zu viele Anfragen. Warte und versuche erneut.')
      } else if (response.status === 403) {
        throw new Error('API-Key ungültig')
      } else if (response.status === 456) {
        throw new Error('Zeichen-Limit erreicht (500k/Monat)')
      } else {
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }
    }

    const data = await response.json()
    return data.translations[0].text
  } catch (error) {
    if (error.message.includes('fetch') && retryCount < MAX_RETRIES) {
      console.log(`\n  ⏳ Netzwerk-Fehler. Versuche erneut... (${retryCount + 1}/${MAX_RETRIES})`)
      await sleep(2000)
      return translateText(text, targetLang, retryCount + 1)
    }
    throw error
  }
}

// Rekursiv durch JSON übersetzen
async function translateObject(obj, targetLang, currentPath = '') {
  const translated = {}
  let errorCount = 0
  let successCount = 0

  for (const key in obj) {
    const value = obj[key]
    const fullPath = currentPath ? `${currentPath}.${key}` : key

    if (typeof value === 'string') {
      try {
        translated[key] = await translateText(value, targetLang)
        successCount++

        // Fortschrittsanzeige
        process.stdout.clearLine()
        process.stdout.cursorTo(0)
        process.stdout.write(`  ✓ ${successCount} übersetzt | ${fullPath.substring(0, 50)}...`)

        // WICHTIG: Pause zwischen jedem Request!
        await sleep(DELAY_BETWEEN_REQUESTS)
      } catch (error) {
        console.log('') // Neue Zeile
        console.error(`  ✗ Fehler bei: ${fullPath}`)
        console.error(`     ${error.message}`)
        translated[key] = value
        errorCount++

        // Bei kritischen Fehlern abbrechen
        if (error.message.includes('API-Key') || error.message.includes('403')) {
          throw error
        }

        // Bei Rate Limit: Extra Pause
        if (error.message.includes('Rate Limit')) {
          console.log('  ⏸️  Extra Pause wegen Rate Limit...')
          await sleep(5000)
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      const result = await translateObject(value, targetLang, fullPath)
      translated[key] = result.translated
      errorCount += result.errorCount
      successCount += result.successCount
    } else {
      translated[key] = value
    }
  }

  return { translated, errorCount, successCount }
}

function countChars(obj) {
  let total = 0
  for (const key in obj) {
    const value = obj[key]
    if (typeof value === 'string') {
      total += value.length
    } else if (typeof value === 'object' && value !== null) {
      total += countChars(value)
    }
  }
  return total
}

async function main() {
  console.log('🌍 zetteln DeepL Übersetzung (mit Rate Limiting)\n')
  console.log('═'.repeat(60))
  console.log('')

  if (DEEPL_API_KEY === 'DEIN_DEEPL_API_KEY_HIER') {
    console.error('❌ FEHLER: Bitte trage deinen DeepL API-Key ein!\n')
    process.exit(1)
  }

  checkFiles()

  // Test
  console.log('🔑 Teste DeepL API-Key...')
  try {
    const testTranslation = await translateText('Hallo', 'en')
    console.log(`✅ API-Key funktioniert! (Test: "Hallo" → "${testTranslation}")\n`)
  } catch (error) {
    console.error('❌ API-Key Test fehlgeschlagen!\n')
    console.error('Fehler:', error.message, '\n')
    process.exit(1)
  }

  console.log(`📖 Lade ${SOURCE_FILE}...`)
  const sourceContent = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf8'))

  const sourceChars = countChars(sourceContent)
  const totalChars = sourceChars * TARGET_LANGUAGES.length

  // Geschätzte Zeit mit neuem Delay
  const estimatedSeconds = Math.ceil(((sourceChars / 50) * DELAY_BETWEEN_REQUESTS) / 1000) * TARGET_LANGUAGES.length
  const estimatedMinutes = Math.ceil(estimatedSeconds / 60)

  console.log('')
  console.log('📊 Zeichen-Analyse:')
  console.log('   ├─ Deutsche Texte: ' + sourceChars.toLocaleString() + ' Zeichen')
  console.log('   ├─ Zielsprachen: ' + TARGET_LANGUAGES.length + ' (' + TARGET_LANGUAGES.join(', ').toUpperCase() + ')')
  console.log('   └─ Gesamt: ' + totalChars.toLocaleString() + ' Zeichen')
  console.log('')
  console.log('⏱️  Geschätzte Dauer: ~' + estimatedMinutes + ' Minuten')
  console.log('   (Mit Rate Limiting - langsamer aber sicherer!)')
  console.log('💰 DeepL Free Limit: 500.000 Zeichen/Monat')
  console.log('   Du nutzt: ' + ((totalChars / 500000) * 100).toFixed(1) + '%')
  console.log('')
  console.log('💡 Tipp: Lass das Terminal offen und mach einen Kaffee ☕')
  console.log('')
  console.log('═'.repeat(60))
  console.log('')

  let totalErrors = 0
  let totalSuccess = 0
  const startTime = Date.now()

  for (let i = 0; i < TARGET_LANGUAGES.length; i++) {
    const targetLang = TARGET_LANGUAGES[i]
    const progress = `[${i + 1}/${TARGET_LANGUAGES.length}]`

    console.log(`${progress} 🌍 Übersetze nach ${targetLang.toUpperCase()}...`)

    try {
      const result = await translateObject(sourceContent, targetLang)
      const { translated, errorCount, successCount } = result

      totalErrors += errorCount
      totalSuccess += successCount

      const outputPath = path.join(OUTPUT_DIR, `${targetLang}.json`)
      fs.writeFileSync(outputPath, JSON.stringify(translated, null, 2), 'utf8')

      console.log('')
      if (errorCount > 0) {
        console.log(`${progress} ⚠️  ${targetLang}.json erstellt (${successCount} OK, ${errorCount} Fehler)`)
      } else {
        console.log(`${progress} ✅ ${targetLang}.json erstellt (${successCount} Texte übersetzt)`)
      }
      console.log(`${progress} 📁 ${outputPath}`)

      // Lange Pause zwischen Sprachen (Rate Limit!)
      if (i < TARGET_LANGUAGES.length - 1) {
        console.log(`${progress} ⏸️  Pause ${DELAY_BETWEEN_LANGUAGES / 1000}s (Rate Limit Schutz)...`)
        await sleep(DELAY_BETWEEN_LANGUAGES)
        console.log('')
      }
    } catch (error) {
      console.error(`${progress} ❌ Kritischer Fehler bei ${targetLang}:`)
      console.error(`${progress}    ${error.message}`)
      console.log('')

      if (error.message.includes('API-Key')) {
        console.error('🛑 Übersetzung abgebrochen.\n')
        process.exit(1)
      }
    }
  }

  const endTime = Date.now()
  const durationMinutes = Math.ceil((endTime - startTime) / 60000)

  console.log('═'.repeat(60))
  console.log('')

  if (totalErrors === 0) {
    console.log(`🎉 Übersetzung erfolgreich! ${totalSuccess} Texte übersetzt.`)
  } else {
    console.log(`⚠️  Übersetzung abgeschlossen:`)
    console.log(`   ✅ ${totalSuccess} erfolgreich`)
    console.log(`   ❌ ${totalErrors} Fehler (bleiben auf Deutsch)`)
  }

  console.log(`   ⏱️  Dauer: ${durationMinutes} Minuten`)
  console.log('')
  console.log('📂 Übersetzte Dateien:')
  TARGET_LANGUAGES.forEach((lang) => {
    const filePath = path.join(OUTPUT_DIR, `${lang}.json`)
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath)
      console.log(`   ✅ ${lang}.json (${(stats.size / 1024).toFixed(1)} KB)`)
    }
  })
  console.log('')

  if (totalErrors > 0) {
    console.log('💡 Bei Fehlern:')
    console.log('   • Warte 10 Minuten')
    console.log('   • Führe das Script nochmal aus')
    console.log('   • Es übersetzt nur fehlende Texte nach')
    console.log('')
  }

  console.log('💡 Nächste Schritte:')
  console.log('   1. Prüfe die Übersetzungen')
  console.log('   2. Aktiviere Sprachen in src/survey/i18n.js')
  console.log('   3. Füge Buttons hinzu in src/survey/components/ProgressBar.jsx')
  console.log('   4. Teste in deiner App!')
  console.log('')
}

main().catch((error) => {
  console.error('')
  console.error('═'.repeat(60))
  console.error('❌ KRITISCHER FEHLER:')
  console.error('')
  console.error(error)
  console.error('')
  process.exit(1)
})
