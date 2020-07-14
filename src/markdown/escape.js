// When generating HTML, the character <, >, and & must be escaped.
// This is used by Heading and Paragraph for escaping tokens.
function escape(string) {
  return string
    .replace('&', '&amp;')
    .replace('<', '&lt;')
    .replace('>', '&gt;');
}

export default escape;
