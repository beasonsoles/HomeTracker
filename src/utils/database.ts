import type { Advertiser, App, EnergyEfficiency, Home, IsGroundFloor, Status } from "../types/Home"

const URL = "https://home-tracker-c748d-default-rtdb.firebaseio.com/"
export async function storeHome(homeData: Home): Promise<string> {
    try {
        const response = await fetch(URL + "homes.json", {
            method: "POST",
            body: JSON.stringify(homeData),
        })
        if (!response.ok) {
            throw new Error("Could not save home")
        }
        const data: { name: string } = await response.json()
        return data.name // unique ID created by Firebase
    } catch (error: any) {
        throw new Error("Could not save home: " + error.message)
    }
}

export async function fetchHomes(): Promise<Home[]> {
    try {
        const response = await fetch(URL + "homes.json")
        if (!response.ok) {
            throw new Error("Could not get your saved homes")
        } else {
            const data: Record<string, any> = await response.json()
            const homes: Home[] = []

            for (const key in data) {
                const item = data[key]

                const homeObj: Home = {
                    key: key,
                    status: item.status as Status,
                    app: item.app as App,
                    rent: Number(item.rent),
                    neighborhood: item.neighborhood,
                    street: item.street,
                    numRooms: item.numRooms,
                    squareMeters: Number(item.squareMeters),
                    advertiser: item.advertiser as Advertiser,
                    conditions: item.conditions,
                    distanceToTransport: item.distanceToTransport,
                    isGroundFloor: item.isGroundFloor as IsGroundFloor,
                    hasElevator: Boolean(item.hasElevator),
                    hasAC: Boolean(item.hasAC),
                    hasGarage: Boolean(item.hasGarage),
                    kitchen: {
                        lavadora: Boolean(item.kitchen?.lavadora),
                        frigo: Boolean(item.kitchen?.frigo),
                        congelador: Boolean(item.kitchen?.congelador),
                        microondas: Boolean(item.kitchen?.microondas),
                        vitro: Boolean(item.kitchen?.vitro),
                        campana: Boolean(item.kitchen?.campana),
                        horno: Boolean(item.kitchen?.horno),
                        lavavajillas: Boolean(item.kitchen?.lavavajillas),
                    },
                    energyEfficiency: item.energyEfficiency as EnergyEfficiency,
                    nearbySupermarkets: Boolean(item.nearbySupermarkets),
                    hasGoodLighting: Boolean(item.hasGoodLighting),
                    individualHeating: Boolean(item.individualHeating),
                    hasVentilationGrilles: Boolean(item.hasVentilationGrilles),
                    faucetsCondition: Boolean(item.faucetsCondition),
                    outletsCondition: Boolean(item.outletsCondition),
                    doorHandlesCondition: Boolean(item.doorHandlesCondition),
                    windowsCondition: Boolean(item.windowsCondition),
                    showerCondition: Boolean(item.showerCondition),
                    hasCeilingHumidity: Boolean(item.hasCeilingHumidity),
                    canTurnOnLights: Boolean(item.canTurnOnLights),
                    numRadiators: Number(item.numRadiators),
                    notes: item.notes ?? "",
                }

                homes.push(homeObj)
            }
            return homes
        }
    } catch (error: any) {
        throw new Error("Could not get your saved homes: "+ error.message)
    }
}

export async function updateHome(id: string, homeData: Home) {
    try {
        const response = await fetch(`${URL}homes/${id}.json`, {
            method: "PATCH",
            body: JSON.stringify(homeData),
        })
        if (!response.ok) {
            throw new Error("Could not update home")
        }
    } catch (error: any) {
        throw new Error("Could not update home:"+ error.message)
    }
}

export async function deleteHome(id: string) {
    try {
        const response = await fetch(`${URL}homes/${id}.json`, {
            method: "DELETE",
        })
        if (!response.ok) {
            throw new Error("Could not delete home")
        }
    } catch (error: any) {
        throw new Error("Could not delete home:"+ error.message)
    }
}
