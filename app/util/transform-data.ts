const HEADERS = [
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

export function transformData(text: string) {
  const data = text.split('\n').map((i) => i.split(','))
  const headerData = data.shift() as string[]
  const headers = headerData.map((d) =>
    d.replace(/(\r\n|\n|\r)/gm, '')
  ) as unknown as typeof HEADERS

  const output = data.reduce((acc: Dog[], curr) => {
    const entry = {} as Dog
    headers.forEach((h, i) => {
      entry[h] = curr[i]
    })

    return [...acc, entry]
  }, [])

  return output
}
