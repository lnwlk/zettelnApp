import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className="mx-auto max-w-7xl py-8">
      <div>
        <ul className="flex flex-col items-center gap-4 text-center text-sm text-gray-600 md:flex-row md:justify-center md:gap-8">
          <li>
            <a href="mailto:info@zetteln.app">info@zetteln.app</a>
          </li>
          <li>
            <Link to={'/imprint'}>Impressum & Datenschutz</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
