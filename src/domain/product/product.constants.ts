// DIAN — Unidades de medida aceptadas en facturación electrónica (Anexo Técnico)
export const UNIT_OF_MEASURE_CODES = [
  '94', 'KGM', 'MTR', 'LTR', 'MTK', 'MTQ',
  'HUR', 'DAY', 'GRM', 'TNE', 'SET', 'PR', 'C62', 'MMT',
] as const
export type UnitOfMeasureCode = (typeof UNIT_OF_MEASURE_CODES)[number]

export const UNIT_OF_MEASURES: ReadonlyArray<{
  code: UnitOfMeasureCode
  label: string
}> = [
  { code: '94', label: 'Unidad' },
  { code: 'KGM', label: 'Kilogramo' },
  { code: 'MTR', label: 'Metro' },
  { code: 'LTR', label: 'Litro' },
  { code: 'MTK', label: 'Metro cuadrado' },
  { code: 'MTQ', label: 'Metro cúbico' },
  { code: 'HUR', label: 'Hora' },
  { code: 'DAY', label: 'Día' },
  { code: 'GRM', label: 'Gramo' },
  { code: 'TNE', label: 'Tonelada' },
  { code: 'SET', label: 'Conjunto' },
  { code: 'PR', label: 'Par' },
  { code: 'C62', label: 'Centímetro' },
  { code: 'MMT', label: 'Milímetro' },
]

// DIAN — Categorías tributarias IVA
export const TAX_CATEGORY_CODES = ['01', '02', '03', '04', '05'] as const
export type TaxCategoryCode = (typeof TAX_CATEGORY_CODES)[number]

export const TAX_CATEGORIES: ReadonlyArray<{
  code: TaxCategoryCode
  label: string
}> = [
  { code: '01', label: 'IVA 19% (tasa general)' },
  { code: '02', label: 'IVA 5% (tasa reducida)' },
  { code: '03', label: 'IVA 0% (exento)' },
  { code: '04', label: 'No responsable de IVA (excluido)' },
  { code: '05', label: 'No gravado con IVA' },
]

// Lookup helpers para tablas/badges
export function unitOfMeasureLabel(code: string): string {
  return UNIT_OF_MEASURES.find((u) => u.code === code)?.label ?? code
}

export function taxCategoryLabel(code: string): string {
  return TAX_CATEGORIES.find((t) => t.code === code)?.label ?? code
}
