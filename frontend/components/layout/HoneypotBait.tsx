// Hidden bait links for bot/crawler traps — real users never see these.
// Bots that crawl these routes get IP-banned by the backend middleware.

const BAIT_LINKS = [
  '/admin/backup/',
  '/admin/config/',
  '/admin/users/',
  '/api/keys/',
  '/api/config/',
  '/api/internal/',
  '/private/',
  '/secret/',
  '/internal/',
  '/config/',
  '/logs/',
  '/debug/info/',
  '/test/',
  '/staging/',
  '/beta/',
  '/console/',
  '/dashboard/',
  '/api/v2/',
  '/graphql/',
  '/sitemap.xml',
]

export function HoneypotBait() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
      {BAIT_LINKS.map((href) => (
        <a key={href} href={href} tabIndex={-1}>{href}</a>
      ))}
    </div>
  )
}
