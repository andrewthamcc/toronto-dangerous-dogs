import { HEADERS, type Dog } from '~/types'

export function transformData(text: string) {
  const data = text.split('\n').map((i) => i.split(','))
  const headerData = data.shift() as string[]
  const headers = headerData.map((d) =>
    d.replace(/(\r\n|\n|\r)/gm, '')
  ) as unknown as typeof HEADERS

  return data.reduce((acc: Dog[], curr) => {
    const entry = {} as Dog
    headers.forEach((h, i) => {
      entry[h] = curr[i]
    })

    return [...acc, entry]
  }, [])
}
