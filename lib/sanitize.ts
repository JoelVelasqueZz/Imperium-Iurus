import sanitizeHtml from 'sanitize-html'

const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'b', 'i', 'u',
  'h2', 'h3', 'h4',
  'ul', 'ol', 'li',
  'blockquote', 'a', 'span', 'div',
]

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions['allowedAttributes'] = {
  a:    ['href', 'target', 'rel'],
  span: ['class'],
  div:  ['class'],
  p:    ['class'],
}

export function sanitizeBlogHtml(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags:       ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes:    ['https', 'mailto', 'tel'],
    // Forzar rel en links externos para evitar tabnapping
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          rel: 'noopener noreferrer',
          ...(attribs.href?.startsWith('http') ? { target: '_blank' } : {}),
        },
      }),
    },
  })
}
