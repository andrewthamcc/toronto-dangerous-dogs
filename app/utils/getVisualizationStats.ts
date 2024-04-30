import { WARDS } from '~/data/constants'
import type { Dog, Severity } from '~/types'
import { getAvailableYears } from './getAvailableYears'

export interface DogRecord {
  [key: string]: number
}

interface AttacksByYear {
  [key: string]: Dog[]
}

export function getWardAttacks(data: Dog[]) {
  const wards = WARDS.map(({ number, ...rest }) => {
    const attacks = data.filter(({ Ward_Number }) => Ward_Number === number)

    const sortation = attacks.reduce(
      (acc: DogRecord, { Forward_Sortation_Area }) => {
        if (!acc[Forward_Sortation_Area])
          return { ...acc, [Forward_Sortation_Area]: 1 }
        acc[Forward_Sortation_Area] += 1

        return acc
      },
      {}
    )

    const byYear = getAvailableYears(data).reduce(
      (acc: AttacksByYear, curr) => {
        const attacksByYear = attacks.filter(
          ({ Date_of_Dangerous_Act }) =>
            new Date(Date_of_Dangerous_Act).getFullYear() === curr
        )

        return { ...acc, [curr]: attacksByYear }
      },
      {} as AttacksByYear
    )

    return {
      ...rest,
      number,
      attacks,
      byYear,
      sortation,
    }
  })

  return wards
}

function getYearlyAttacks(data: Dog[]) {
  const years = getAvailableYears(data).map((year) => {
    const acts = data.filter(
      ({ Date_of_Dangerous_Act }) =>
        new Date(Date_of_Dangerous_Act).getFullYear() === year
    )

    const severity = acts.reduce((acc: DogRecord, { Bite_Circumstance }) => {
      if (!acc[Bite_Circumstance]) return { ...acc, [Bite_Circumstance]: 1 }
      acc[Bite_Circumstance] += 1
      return acc
    }, {})

    const categorizedSeverity = Object.entries(severity).reduce(
      (acc, [key, value]) => {
        if (key.startsWith('LEVEL')) {
          const level = Number(key.split(' ')[1])
          if (level === 0) return { ...acc, nab: acc.nab + value }
          if (level <= 2) return { ...acc, nonSevere: acc.nonSevere + value }
          if (level >= 3) return { ...acc, severe: acc.severe + value }
        } else {
          if (key === 'NAB') return { ...acc, nab: acc.nab + value }
          if (key === 'NON-SEVERE')
            return { ...acc, nonSevere: acc.nonSevere + value }
          if (key === 'SEVERE') return { ...acc, severe: acc.severe + value }
        }

        return acc
      },
      { nab: 0, nonSevere: 0, severe: 0 }
    )

    return {
      year,
      total: acts.length,
      ...categorizedSeverity,
    }
  })

  return years
}

function getBreedAttacks(data: Dog[]) {
  const breeds = data.reduce((acc: DogRecord, { Breed }) => {
    if (!acc[Breed]) {
      return {
        ...acc,
        [Breed]: 1,
      }
    }

    acc[Breed] += 1
    return acc
  }, {})

  const consolodated: DogRecord = {}
  for (const breed in breeds) {
    if (breed.includes('/')) {
      const [primaryBreed] = breed.split(' / ')
      const mixName = `${primaryBreed} MIX`

      if (!consolodated[mixName]) consolodated[mixName] = breeds[breed]
      else consolodated[mixName] += breeds[breed]
    } else {
      consolodated[breed] = breeds[breed]
    }
  }

  const multiple: DogRecord = {}
  for (const breed in consolodated) {
    if (consolodated[breed] >= 5) multiple[breed] = consolodated[breed]
  }

  return { breeds, consolodated, multiple }
}

function getIncidentLocations(data: Dog[]) {
  const locations = data.reduce((acc: DogRecord, { Location_of_Incident }) => {
    if (!Location_of_Incident) return acc

    if (!acc[Location_of_Incident]) {
      return {
        ...acc,
        [Location_of_Incident]: 1,
      }
    }

    acc[Location_of_Incident] += 1
    return acc
  }, {})

  const byYear = Object.keys(locations).reduce((acc, curr) => {
    const years = getAvailableYears(data).reduce((acc, year) => {
      const countByYear = data.filter(
        ({ Date_of_Dangerous_Act, Location_of_Incident }) =>
          new Date(Date_of_Dangerous_Act).getFullYear() === year &&
          Location_of_Incident === curr
      )

      return { ...acc, [year]: countByYear }
    }, {})

    return { ...acc, [curr]: years }
  }, {})

  const bySeverity = Object.keys(locations).reduce(
    (acc, location) => {
      const severities = data
        .filter(({ Location_of_Incident }) => Location_of_Incident === location)
        .reduce(
          (acc, { Bite_Circumstance }) => {
            if (Bite_Circumstance.startsWith('LEVEL')) {
              const level = Number(Bite_Circumstance.split(' ')[1])
              if (level === 0) return { ...acc, nab: acc.nab + 1 }
              if (level <= 2) return { ...acc, nonSevere: acc.nonSevere + 1 }
              if (level >= 3) return { ...acc, severe: acc.severe + 1 }
            } else {
              if (Bite_Circumstance === 'NAB')
                return { ...acc, nab: acc.nab + 1 }
              if (Bite_Circumstance === 'NON-SEVERE')
                return { ...acc, nonSevere: acc.nonSevere + 1 }
              if (Bite_Circumstance === 'SEVERE')
                return { ...acc, severe: acc.severe + 1 }
            }

            return acc
          },
          { nab: 0, nonSevere: 0, severe: 0 }
        )

      return {
        ...acc,
        [location]: {
          ...severities,
        },
      }
    },
    {} as { [key: string]: Severity }
  )

  return { locations, byYear, bySeverity }
}

export function getVisualizationStats(data: Dog[]) {
  return {
    wards: getWardAttacks(data),
    years: getYearlyAttacks(data),
    breeds: getBreedAttacks(data),
    incidentLocations: getIncidentLocations(data),
  }
}
