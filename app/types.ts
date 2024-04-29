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

export interface Ward {
  name: string
  number: string
  attacks: Dog[]
  byYear: { [key: string]: Dog[] }
  sortation: {
    string: number
  }
}
