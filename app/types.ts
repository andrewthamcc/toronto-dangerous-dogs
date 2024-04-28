export const HEADERS = [
  '_id',
  'Forward_Sortation_Area',
  'Name_of_Dog',
  'Breed',
  'Color',
  'Ward_Number',
  'Ward_Name',
  'Bite_Circumstance',
  'Location_of_Incident',
  'Date_of_Dangerous_Act',
] as const

type EntryKey = (typeof HEADERS)[number]

export type Dog = Record<EntryKey, string>
