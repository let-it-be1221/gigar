export function formatDate(input, opts = {}) {
  if (!input) return ''
  const d = new Date(input)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    ...opts,
  })
}

export function timeAgo(input) {
  if (!input) return ''
  const d = new Date(input)
  const diff = (Date.now() - d.getTime()) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} h ago`
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)} d ago`
  return formatDate(input)
}

export function truncate(text, n = 140) {
  if (!text) return ''
  return text.length > n ? text.slice(0, n).trimEnd() + '…' : text
}

export function getMediaPath(url) {
  if (!url) return ''
  return url.startsWith('http') ? url : `${import.meta.env.VITE_PUBLIC_BASE_URL || 'http://localhost:8000'}/storage/${url.replace(/^\/+/, '')}`
}
