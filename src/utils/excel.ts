import * as XLSX from "xlsx"

const headers = [
    "ESTADO",
    "APP",
    "RENTA",
    "BARRIO",
    "CALLE",
    "# HABS",
    "M²",
    "ANUNCIANTE",
    "CONDICIONES",
    "DISTANCIA (min) AL METRO/CERCANÍAS",
    "ES UN BAJO",
    "ASCENSOR",
    "A/C",
    "GARAJE",
    "COCINA",
    "EFICIENCIA ENERGÉTICA",
    "SUPERMERCADOS CERCA",
    "SUFICIENTE LUZ EN EL PISO",
    "CALEFACCIÓN INDIVIDUAL",
    "REJILLAS DE VENTILACIÓN",
    "GRIFOS",
    "ENCHUFES",
    "POMOS DE LAS PUERTAS",
    "VENTANAS",
    "DUCHA",
    "HUMEDAD EN EL TECHO",
    "ENCENDER LUCES",
    "# RADIADORES",
    "NOTAS",
]

export const exportToExcel = (data: any[], filename: string) => {
    const finalData = data.map((row) => {
        // ignore the first column (key)
        let filteredEntries = Object.entries(row).slice(1)
        // map the data to the new headers
        filteredEntries = filteredEntries.map(([_, value], i) => {
            if (value === true) return [headers[i], "Sí"]
            if (value === false) return [headers[i], "No"]
            if (value && typeof value === "object") {
                const trueKeys = Object.entries(value)
                    .filter(([_, val]) => val === true)
                    .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
                    .join(", ")
                return [headers[i], trueKeys || ""]
            }
            return [headers[i], value]
        })
        return Object.fromEntries(filteredEntries)
    })

    const worksheet = XLSX.utils.json_to_sheet(finalData, { header: headers })
    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workbook, worksheet, "Pisos")

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
    })

    const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    })

    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${filename}.xlsx`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    a.remove()
}
