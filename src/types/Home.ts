export type Status = "Guardado" | "Contactado" | "Visita concertada" | "Visitado" | "Rechazado" | "Despublicado"
export type App = "Idealista" | "Fotocasa"
export type Advertiser = "Inmobiliaria" | "Particular"
export type IsGroundFloor = "Sí" | "No" | "No sé"
export const Kitchen = {
    frigo: "Frigo",
    congelador: "Congelador",
    microondas: "Microondas",
    vitro: "Vitro",
    lavadora: "Lavadora",
    campana: "Campana",
    horno: "Horno",
    lavavajillas: "Lavavajillas",
} as const
export type EnergyEfficiency = "N/A" | "A" | "B" | "C" | "D" | "E" | "F" | "G"

export const statusMap = {
    "1": "Guardado",
    "2": "Contactado",
    "3": "Visita concertada",
    "4": "Visitado",
    "5": "Rechazado",
    "6": "Despublicado",
} as const

export const appMap = {
    "1": "Idealista",
    "2": "Fotocasa",
} as const

export const advertiserMap = {
    "1": "Inmobiliaria",
    "2": "Particular",
} as const

export const isGroundFloorMap = {
    "1": "Sí",
    "2": "No",
    "3": "No sé",
} as const

export const energyEfficiencyMap = {
    "1": "N/A",
    "2": "A",
    "3": "B",
    "4": "C",
    "5": "D",
    "6": "E",
    "7": "F",
    "8": "G",
} as const

export const kitchenMap: Record<string, keyof typeof Kitchen> = {
    "1": "frigo",
    "2": "congelador",
    "3": "microondas",
    "4": "vitro",
    "5": "lavadora",
    "6": "campana",
    "7": "horno",
    "8": "lavavajillas",
}

export interface Home {
    key: string // ID
    status: Status // ESTADO
    app: App // APP
    rent: number // RENTA
    neighborhood: string // BARRIO
    street: string // CALLE
    numRooms: string // # HABS
    squareMeters: number // M^2
    advertiser: Advertiser // ANUNCIANTE
    conditions: string // CONDICIONES
    distanceToTransport: string // DISTANCIA (min) AL METRO/CERCANÍAS
    isGroundFloor: IsGroundFloor // ES UN BAJO
    hasElevator: boolean // ASCENSOR
    hasAC: boolean // A/C
    hasGarage: boolean // GARAJE
    kitchen: Record<keyof typeof Kitchen, boolean> // COCINA
    energyEfficiency: EnergyEfficiency // EFICIENCIA ENERGÉTICA
    nearbySupermarkets: boolean // SUPERMERCADOS CERCA
    hasGoodLighting: boolean // SUFICIENTE LUZ EN EL PISO
    individualHeating: boolean // CALEFACCIÓN INDIVIDUAL
    hasVentilationGrilles: boolean // REJILLAS DE VENTILACIÓN
    faucetsCondition: boolean // GRIFOS
    outletsCondition: boolean // ENCHUFES
    doorHandlesCondition: boolean // POMOS DE LAS PUERTAS
    windowsCondition: boolean // VENTANAS
    showerCondition: boolean // DUCHA
    hasCeilingHumidity: boolean // HUMEDAD EN EL TECHO
    canTurnOnLights: boolean // ENCENDER LUCES
    numRadiators: number // # RADIADORES
    notes: string // NOTAS
}
