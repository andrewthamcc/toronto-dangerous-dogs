import { WARDS } from '~/data/constants'
import { Dog } from '~/types'

export interface DogRecord {
  [key: string]: number
}

interface AttacksByYear {
  [key: string]: Dog[]
}

function getAvailableYears(data: Dog[]) {
  return data
    .reduce((acc: number[], curr) => {
      const year = new Date(curr.Date_of_Dangerous_Act).getFullYear()
      if (!acc.includes(year) && !isNaN(year)) return [...acc, year]
      return acc
    }, [])
    .sort()
}

function getWards(data: Dog[]) {
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

    const byYear = getAvailableYears(data).reduce((acc: AttacksByYear, curr) => {
      const attacksByYear = attacks.filter(
        ({ Date_of_Dangerous_Act }) =>
          new Date(Date_of_Dangerous_Act).getFullYear() === curr
      )

      return { ...acc, [curr]: attacksByYear }
    }, {} as AttacksByYear)

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

function getYears(data: Dog[]) {
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
          else if (key <= 'NON-SEVERE')
            return { ...acc, nonSevere: acc.nonSevere + value }
          else if (key >= 'SEVERE')
            return { ...acc, severe: acc.severe + value }
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

function getBreeds(data: Dog[]) {
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
    if (consolodated[breed] > 2) multiple[breed] = consolodated[breed]
  }

  return { breeds, consolodated, multiple }
}

function getIncidentLocations(data: Dog[]) {
  const locations = data.reduce((acc: DogRecord, { Location_of_Incident }) => {
    if (!acc[Location_of_Incident]) {
      return {
        ...acc,
        [Location_of_Incident]: 1,
      }
    }

    acc[Location_of_Incident] += 1
    return acc
  }, {})

  return locations
}

export function getStats(data: Dog[]) {
  return {
    wards: getWards(data),
    years: getYears(data),
    breeds: getBreeds(data),
    incidentLocations: getIncidentLocations(data),
  }
}
