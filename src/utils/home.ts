import { advertiserMap, appMap, energyEfficiencyMap, isGroundFloorMap, Kitchen, kitchenMap, statusMap, type Home } from "../types/Home"

export const mapKitchen = (codes: string[]): Record<keyof typeof Kitchen, boolean> => {
    const kitchenPresence = Object.keys(Kitchen).reduce((acc, key) => {
        acc[key as keyof typeof Kitchen] = false
        return acc
    }, {} as Record<keyof typeof Kitchen, boolean>)

    codes.forEach((code) => {
        const key = kitchenMap[code]
        if (key) kitchenPresence[key] = true
    })

    return kitchenPresence
}

export const mapRawToHome = (raw: any): Home => {
    return {
        key: raw.key || "",
        status: statusMap[raw.status as keyof typeof statusMap] || "Guardado",
        app: appMap[raw.app as keyof typeof appMap] || "Idealista",
        rent: Number(raw.rent),
        neighborhood: raw.neighborhood,
        street: raw.street,
        numRooms: raw.numRooms,
        squareMeters: Number(raw.squareMeters),
        advertiser: advertiserMap[raw.advertiser as keyof typeof advertiserMap] || "Particular",
        conditions: raw.conditions || "",
        distanceToTransport: raw.distanceToTransport || "",
        isGroundFloor: isGroundFloorMap[raw.isGroundFloor as keyof typeof isGroundFloorMap] || "No sé",
        hasElevator: raw.hasElevator === "1",
        hasAC: raw.hasAC === "1",
        hasGarage: raw.hasGarage === "1",
        kitchen: mapKitchen(raw.kitchen || []),
        energyEfficiency: energyEfficiencyMap[raw.energyEfficiency as keyof typeof energyEfficiencyMap] || "N/A",
        nearbySupermarkets: Boolean(raw.nearbySupermarkets),
        hasGoodLighting: Boolean(raw.hasGoodLighting),
        individualHeating: Boolean(raw.individualHeating),
        hasVentilationGrilles: Boolean(raw.hasVentilationGrilles),
        faucetsCondition: Boolean(raw.faucetsCondition),
        outletsCondition: Boolean(raw.outletsCondition),
        doorHandlesCondition: Boolean(raw.doorHandlesCondition),
        windowsCondition: Boolean(raw.windowsCondition),
        showerCondition: Boolean(raw.showerCondition),
        hasCeilingHumidity: Boolean(raw.hasCeilingHumidity),
        canTurnOnLights: Boolean(raw.canTurnOnLights),
        numRadiators: Number(raw.numRadiators) || 0,
        notes: raw.notes || "",
    }
}

export const mapHomeToRaw = (home: Home) => {
    return {
        ...home,
        status: Object.entries(statusMap).find(([_,label]) => label === home.status)?.[0] ?? "2",
        app: Object.entries(appMap).find(([_,label]) => label === home.app)?.[0] ?? "1",
        advertiser: Object.entries(advertiserMap).find(([_,label]) => label === home.advertiser)?.[0] ?? "1",
        conditions: home.conditions || "",
        distanceToTransport: home.distanceToTransport || "",
        isGroundFloor: Object.entries(isGroundFloorMap).find(([_,label]) => label === home.isGroundFloor)?.[0] ?? "3",
        hasElevator: home.hasElevator ? "1" : "2",
        hasAC: home.hasAC ? "1" : "2",
        hasGarage: home.hasGarage ? "1" : "2",
        kitchen: Object.entries(kitchenMap).filter(([_,label]) => home.kitchen?.[label]).map(([key]) => key),
        energyEfficiency: Object.entries(energyEfficiencyMap).find(([_,label]) => label === home.energyEfficiency)?.[0] ?? "1",
        nearbySupermarkets: Boolean(home.nearbySupermarkets),
        hasGoodLighting: Boolean(home.hasGoodLighting),
        individualHeating: Boolean(home.individualHeating),
        hasVentilationGrilles: Boolean(home.hasVentilationGrilles),
        faucetsCondition: Boolean(home.faucetsCondition),
        outletsCondition: Boolean(home.outletsCondition),
        doorHandlesCondition: Boolean(home.doorHandlesCondition),
        windowsCondition: Boolean(home.windowsCondition),
        showerCondition: Boolean(home.showerCondition),
        hasCeilingHumidity: Boolean(home.hasCeilingHumidity),
        canTurnOnLights: Boolean(home.canTurnOnLights),
        numRadiators: Number(home.numRadiators) || 0,
        notes: home.notes || "",
    }
}
