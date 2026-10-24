import { useState } from 'react'

/**
 * Image component that auto-falls-back to a working placeholder image
 * (picsum.photos) if the primary URL fails to load. This is a safety net
 * for the carousel and product cards — if any external Unsplash URL goes
 * 404, the page still looks great.
 *
 * Usage: <SmartImage src={url} alt="..." className="..." />
 */
export default function SmartImage({ src, alt = '', className = '', fallbackSeed = 'gigar', ...rest }) {
  const [failed, setFailed] = useState(false)

  const finalSrc = failed
    ? `https://picsum.photos/seed/${encodeURIComponent(fallbackSeed)}/1200/800`
    : src

  return (
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => { if (!failed) setFailed(true) }}
      {...rest}
    />
  )
}
