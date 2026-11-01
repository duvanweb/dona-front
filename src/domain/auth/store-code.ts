// Sin caracteres ambiguos (0/O, 1/I)
const SUFFIX_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const SUFFIX_LENGTH = 4
const PREFIX_MAX = 6

function prefixFrom(companyName: string): string {
  const prefix = companyName
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, PREFIX_MAX)
  return prefix || 'STORE'
}

function randomSuffix(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(SUFFIX_LENGTH))
  return Array.from(bytes, (b) => SUFFIX_ALPHABET[b % SUFFIX_ALPHABET.length]).join('')
}

// Código de tienda (tenant) legible y único, ej. "ACMESA-7K3P"
export function generateStoreCode(
  companyName: string,
  exists: (code: string) => boolean,
): string {
  const prefix = prefixFrom(companyName)
  let code: string
  do {
    code = `${prefix}-${randomSuffix()}`
  } while (exists(code))
  return code
}
