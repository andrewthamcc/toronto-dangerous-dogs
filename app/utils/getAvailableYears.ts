import { Dog } from "~/types"

export function getAvailableYears(data: Dog[]) {
  return data
    .reduce((acc: number[], curr) => {
      const year = new Date(curr.Date_of_Dangerous_Act).getFullYear()
      if (!acc.includes(year) && !isNaN(year)) return [...acc, year]
      return acc
    }, [])
    .sort()
}
