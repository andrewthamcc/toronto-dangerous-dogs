import type { Dog } from '~/types'
import { getAvailableYears } from './getAvailableYears'

type WardRecord = { [key: string]: Dog[] }

type WardCount = { [key: string]: number }

function getAttacksByYear(data: Dog[]) {
  const years = getAvailableYears(data)

  return years.reduce((acc, curr) => {
    const yearData = data.filter(
      ({ Date_of_Dangerous_Act }) =>
        new Date(Date_of_Dangerous_Act).getFullYear() === curr
    )

    return { ...acc, [curr]: yearData }
  }, {} as WardRecord)
}

function getAttacksBySeverity(data: Dog[]) {
  return data.reduce(
    (acc, { Bite_Circumstance }) => {
      if (Bite_Circumstance.startsWith('LEVEL')) {
        const level = Number(Bite_Circumstance.split(' ')[1])
        if (level === 0) return { ...acc, nab: acc.nab + 1 }
        if (level <= 2) return { ...acc, nonSevere: acc.nonSevere + 1 }
        if (level >= 3) return { ...acc, severe: acc.severe + 1 }
      } else {
        if (Bite_Circumstance === 'NAB') return { ...acc, nab: acc.nab + 1 }
        if (Bite_Circumstance === 'NON-SEVERE')
          return { ...acc, nonSevere: acc.nonSevere + 1 }
        if (Bite_Circumstance === 'SEVERE')
          return { ...acc, severe: acc.severe + 1 }
      }

      return acc
    },
    { nab: 0, nonSevere: 0, severe: 0 }
  )
}

function getAttacksBySortingArea(data: Dog[]) {
  const postalCodes = {} as WardCount
  data
    .map(({ Forward_Sortation_Area }) => Forward_Sortation_Area)
    .forEach((code) => {
      if (!postalCodes[code]) postalCodes[code] = 1
      else postalCodes[code] += 1
    })

  return postalCodes
}

export function getWardStats(data: Dog[]) {
  return {
    years: getAttacksByYear(data),
    severity: getAttacksBySeverity(data),
    sortingArea: getAttacksBySortingArea(data),
  }
}
