import React from "react"
import { advertiserMap, appMap, statusMap, type Home } from "../types/Home"
import { PieChart, Pie, Tooltip, Cell } from "recharts"
import AnimatedNumber from "./AnimatedNumber"

const status_colors = [
    "#f9a8d4", // Guardado
    "#93c5fd", // Contactado
    "#fde68a", // Visita concertada
    "#bbf7d0", // Visitado
    "#fc6d6d", // Rechazado
    "#d1d5db", // Despublicado
]

const app_colors = [
    "#a0f078", // Idealista
    "#93c5fd", // Fotocasa
]

const advertiser_colors = [
    "#fc6d6d", // Inmobiliaria
    "#86efac", // Particular
]

type Props = {
    data: Home[]
}

const StatsCharts: React.FC<Props> = ({ data }) => {
    const statusCounts = Object.entries(statusMap).map((status) => {
        return {
            key: status?.[1],
            name: data.filter((item) => item.status === status?.[1]).length,
        }
    })

    const appCounts = Object.entries(appMap).map((app) => {
        return {
            key: app?.[1],
            name: data.filter((item) => item.app === app?.[1]).length,
        }
    })

    const advertiserCounts = Object.entries(advertiserMap).map((adv) => {
        return {
            key: adv?.[1],
            name: data.filter((item) => item.advertiser === adv?.[1]).length,
        }
    })

    return (
        <div className='grid grid-cols-2 gap-5 pt-10 pb-10'>
            <div className='flex flex-col items-center'>
                <p className="font-bold">Número total de pisos</p>
                <AnimatedNumber value={data.length} />
            </div>
            <div className='flex flex-col items-center'>
                <h1 className='font-bold'>Estado de los pisos</h1>
                <PieChart width={180} height={180}>
                    <Pie data={statusCounts} dataKey='name' nameKey='key' cx='50%' cy='50%' outerRadius={80}>
                        {statusCounts.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={status_colors[index % status_colors.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
            <div className='flex flex-col items-center'>
                <h1 className='font-bold'>App en la que se anuncian</h1>
                <PieChart width={180} height={180}>
                    <Pie data={appCounts} dataKey='name' nameKey='key' cx='50%' cy='50%' outerRadius={80}>
                        {appCounts.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={app_colors[index % app_colors.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
            <div className='flex flex-col items-center'>
                <h1 className='font-bold'>Anunciante</h1>
                <PieChart width={180} height={180}>
                    <Pie data={advertiserCounts} dataKey='name' nameKey='key' cx='50%' cy='50%' outerRadius={80}>
                        {advertiserCounts.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={advertiser_colors[index % advertiser_colors.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
        </div>
    )
}

export default StatsCharts
