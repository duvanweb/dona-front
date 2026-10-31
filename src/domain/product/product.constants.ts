// DIAN — Unidades de medida aceptadas en facturación electrónica (Anexo Técnico)
// Las etiquetas viven en i18n: `dian.units.<code>`
export const UNIT_OF_MEASURE_CODES = [
  '94', 'KGM', 'MTR', 'LTR', 'MTK', 'MTQ',
  'HUR', 'DAY', 'GRM', 'TNE', 'SET', 'PR', 'C62', 'MMT',
] as const
export type UnitOfMeasureCode = (typeof UNIT_OF_MEASURE_CODES)[number]

// DIAN — Categorías tributarias IVA
// Las etiquetas viven en i18n: `dian.tax.<code>`
export const TAX_CATEGORY_CODES = ['01', '02', '03', '04', '05'] as const
export type TaxCategoryCode = (typeof TAX_CATEGORY_CODES)[number]
