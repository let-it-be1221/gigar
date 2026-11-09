import DOMPurify from 'dompurify'

// SAST FIX (CWE-79): Sanitize all admin-authored HTML before rendering
// with dangerouslySetInnerHTML. This prevents stored XSS — an admin
// could inject <script> tags in a blog post description, which would
// execute in every visitor's browser.
//
// Usage:  <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }} />

// Allow common formatting tags but strip scripts, event handlers,
// and other dangerous elements/attributes.
const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's',
  'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li',
  'a', 'span', 'div',
  'img', 'blockquote', 'code', 'pre',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
]

const ALLOWED_ATTR = [
  'href', 'src', 'alt', 'title', 'class', 'style',
  'target', 'rel',
]

export function sanitizeHtml(dirty) {
  if (!dirty) return ''
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onsubmit', 'onchange', 'oninput'],
  })
}
