const LOCATION_TYPES = [
  'OTHER PRIVATE PROPERTY',
  'OWNERS PROPERTY',
  'PARK - LEASH FREE AREA',
  'PARK - LEASH REQUIRED AREA',
  'PUBLIC PROPERTY',
] as const

export type Location = (typeof LOCATION_TYPES)[number]

export function formatIncidentLocation(location: Location) {
  switch (location) {
    case 'OTHER PRIVATE PROPERTY':
      return 'Private property'
    case 'OWNERS PROPERTY':
      return `Owner's property`
    case 'PARK - LEASH FREE AREA':
      return 'Leash free area'
    case 'PARK - LEASH REQUIRED AREA':
      return 'Park'
    case 'PUBLIC PROPERTY':
      return 'Public property'
  }
}

const SEVERITIES = [
  'LEVEL 1',
  'LEVEL 2',
  'LEVEL 3',
  'LEVEL 4',
  'LEVEL 5',
  'NAB',
  'NON-SEVERE',
  'SEVERE',
] as const

export type Severity = typeof SEVERITIES[number]

export function getSeverity(serverity: Severity) {
  switch(serverity) {
    case 'LEVEL 1':
      return 'Lvl 1'
    case 'LEVEL 2':
      return 'Lvl 2'
    case 'LEVEL 3':
      return 'Lvl 3'
    case 'LEVEL 4':
      return 'Lvl 4'
    case 'LEVEL 5':
      return 'Lvl 5'
    case 'NAB':
      return 'NAB'
    case 'NON-SEVERE':
      return 'Non-severe'
    case 'SEVERE':
      return 'Severe'
  }
}
