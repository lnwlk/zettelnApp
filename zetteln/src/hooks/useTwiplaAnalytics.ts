import { useEffect } from 'react'

export const useTwiplaAnalytics = () => {
  useEffect(() => {
    const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname)
    if (isLocal) {
      console.log('[TWIPLA] Skipped (local environment).')
      return
    }

    console.log('[TWIPLA] Initializing...')

    ;(function (v: any, i: Document, s: string, a: string, t: string) {
      v[t] =
        v[t] ||
        function () {
          ;(v[t].v = v[t].v || []).push(arguments)
        }

      if (!v._visaSettings) {
        v._visaSettings = {}
      }

      v._visaSettings[a] = { v: '1.0', s: a, a: '1', t: t }

      const p = i.createElement('script')
      p.defer = true
      p.async = true
      p.src = `${s}?s=${a}`
      p.onload = () => console.log('[TWIPLA] Script loaded:', p.src)
      p.onerror = (err) => console.error('[TWIPLA] Script failed to load:', err)

      i.body.appendChild(p)
      console.log('[TWIPLA] Script appended:', p.src)
    })(
      window,
      document,
      'https://app-worker.visitor-analytics.io/main.js',
      '83a804a4-a4f9-11f0-84e1-960004340fd3',
      'va',
    )
  }, [])
}
