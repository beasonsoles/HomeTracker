import React, { useState } from "react"
import { Button, Table } from "antd"
import { FaTrash, FaEdit, FaPlus, FaChartPie } from "react-icons/fa"
import type { TableColumnsType, TableProps } from "antd"
import { advertiserMap, appMap, isGroundFloorMap, Kitchen, statusMap, type Home } from "../types/Home"
import HomeButton from "../components/HomeButton"
import Excel from "../assets/excel.png"
import { exportToExcel } from "../utils/excel"
import { FaFilterCircleXmark } from "react-icons/fa6"

const renderColoredText = (text: string, swap: boolean) => {
    let color = ""
    switch (text) {
        case "Sí":
            if (swap) {
                color = "text-red-600"
            } else {
                color = "text-green-600"
            }
            break
        case "No":
            if (swap) {
                color = "text-green-600"
            } else {
                color = "text-red-600"
            }
            break
        case "Contactado":
            color = "text-blue-400"
            break
        case "Visita concertada":
            color = "text-yellow-400"
            break
        case "Visitado":
            color = "text-green-600"
            break
        case "Rechazado":
            color = "text-red-600"
            break
        case "Despublicado":
            color = "text-gray-400"
            break
        case "Inmobiliaria":
            color = "text-red-600"
            break
        case "Particular":
            color = "text-green-600"
            break
        default:
            color = "text-black"
    }
    return <span className={color}>{text}</span>
}

type OnChange = NonNullable<TableProps<Home>["onChange"]>
type Filters = Parameters<OnChange>[1]

type Props = {
    homes: Home[]
    onAdd: () => void
    onDelete: (selectedHome: Home) => void
    onEdit: (selectedHome: Home) => void
    onStatsClick: () => void
}

const HomeTable: React.FC<Props> = ({ homes, onAdd, onDelete, onEdit, onStatsClick }) => {
    const [filteredInfo, setFilteredInfo] = useState<Filters>({})

    const onChange: TableProps<Home>["onChange"] = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra)
        setFilteredInfo(filters)
    }

    const columns: TableColumnsType<Home> = [
        {
            title: "",
            dataIndex: "",
            key: "x",
            render: (_: any, record: Home) => {
                return (
                    <div className='flex gap-1'>
                        <Button
                            onClick={() => onEdit(record)}
                            style={{
                                padding: 0,
                                borderColor: "#fcc800",
                                backgroundColor: "transparent",
                                boxShadow: "none",
                                width: "40px",
                                height: "40px",
                            }}
                        >
                            <FaEdit color={"black"} />
                        </Button>
                        <Button
                            onClick={() => onDelete(record)}
                            style={{
                                padding: 0,
                                borderColor: "red",
                                backgroundColor: "transparent",
                                boxShadow: "none",
                                width: "40px",
                                height: "40px",
                            }}
                        >
                            <FaTrash color={"red"} />
                        </Button>
                    </div>
                )
            },
        },
        {
            title: "Estado",
            dataIndex: "status",
            filters: [
                { text: "Guardado", value: "1" },
                { text: "Contactado", value: "2" },
                { text: "Visita concertada", value: "3" },
                { text: "Visitado", value: "4" },
                { text: "Rechazado", value: "5" },
                { text: "Despublicado", value: "6" },
            ],
            filteredValue: filteredInfo.status || ["1", "2", "3", "4", "5"],
            onFilter: (value, record) => record.status === statusMap[value as keyof typeof statusMap],
            render: (text) => renderColoredText(text, false),
        },
        {
            title: "App",
            dataIndex: "app",
            filters: [
                { text: "Idealista", value: "1" },
                { text: "Fotocasa", value: "2" },
            ],
            filteredValue: filteredInfo.app || [],
            onFilter: (value, record) => record.app === appMap[value as keyof typeof appMap],
        },
        {
            title: "Renta",
            dataIndex: "rent",
            sorter: (a, b) => a.rent - b.rent,
            render: (rent) => rent + "€",
        },
        {
            title: "Barrio",
            dataIndex: "neighborhood",
        },
        {
            title: "Calle",
            dataIndex: "street",
        },
        {
            title: "Habs",
            dataIndex: "numRooms",
        },
        {
            title: "m²",
            dataIndex: "squareMeters",
            sorter: (a, b) => a.squareMeters - b.squareMeters,
        },
        {
            title: "Anunciante",
            dataIndex: "advertiser",
            filters: [
                { text: "Inmobiliaria", value: "1" },
                { text: "Particular", value: "2" },
            ],
            filteredValue: filteredInfo.advertiser || [],
            onFilter: (value, record) => record.advertiser === advertiserMap[value as keyof typeof advertiserMap],
            render: (text) => renderColoredText(text, false),
        },
        {
            title: "Condiciones",
            dataIndex: "conditions",
            width: "180px",
        },
        {
            title: "Distancia a transportes (min)",
            dataIndex: "distanceToTransport",
        },
        {
            title: "Es un bajo",
            dataIndex: "isGroundFloor",
            filters: [
                { text: "Sí", value: "1" },
                { text: "No", value: "2" },
                { text: "No sé", value: "3" },
            ],
            filteredValue: filteredInfo.isGroundFloor || [],
            onFilter: (value, record) =>
                record.isGroundFloor === isGroundFloorMap[value as keyof typeof isGroundFloorMap],
            render: (text) => renderColoredText(text, true),
        },
        {
            title: "Ascensor",
            dataIndex: "hasElevator",
            filters: [
                { text: "Sí", value: true },
                { text: "No", value: false },
            ],
            filteredValue: filteredInfo.hasElevator || [],
            onFilter: (value, record) => record.hasElevator === value,
            render: (val) => {
                const text = val === true ? "Sí" : "No"
                return renderColoredText(text, false)
            },
        },
        {
            title: "A/C",
            dataIndex: "hasAC",
            filters: [
                { text: "Sí", value: true },
                { text: "No", value: false },
            ],
            filteredValue: filteredInfo.hasAC || [],
            onFilter: (value, record) => record.hasAC === value,
            render: (val) => {
                const text = val === true ? "Sí" : "No"
                return renderColoredText(text, false)
            },
        },
        {
            title: "Garaje",
            dataIndex: "hasGarage",
            filters: [
                { text: "Sí", value: true },
                { text: "No", value: false },
            ],
            filteredValue: filteredInfo.hasGarage || [],
            onFilter: (value, record) => record.hasGarage === value,
            render: (val) => {
                const text = val === true ? "Sí" : "No"
                return renderColoredText(text, false)
            },
        },
        {
            title: "Cocina",
            dataIndex: "kitchen",
            render: (kitchen) =>
                kitchen
                    ? Object.entries(kitchen)
                          .filter(([_, value]) => value)
                          .map(([key]) => Kitchen[key as keyof typeof Kitchen])
                          .join(", ")
                    : "",
            width: "180px",
        },
        {
            title: "EE",
            dataIndex: "energyEfficiency",
        },
        {
            title: "Notas",
            dataIndex: "notes",
            width: "180px",
        },
    ]
    return (
        <>
            <div className='pt-5 pl-5 pr-5 flex justify-between flex-wrap gap-5'>
                <div className='flex justify-center gap-2'>
                    <HomeButton
                        action={() => setFilteredInfo({})}
                        style={{ borderWidth: 2, borderColor: "#86efac", color: "black", width: 35, padding: 0 }}
                    >
                        <FaFilterCircleXmark />
                    </HomeButton>
                    <HomeButton
                        action={onStatsClick}
                        style={{ borderWidth: 2, borderColor: "#86efac", color: "black", width: 35, padding: 0 }}
                    >
                        <FaChartPie />
                    </HomeButton>
                    <HomeButton
                        action={() => exportToExcel(homes, "pisos")}
                        style={{ borderWidth: 2, borderColor: "#86efac", color: "black", width: 35, padding: 0 }}
                    >
                        <img src={Excel} width={20} alt='Excel icon' />
                    </HomeButton>
                </div>
                <HomeButton action={onAdd} style={{ backgroundColor: "#86efac", border: "none", color: "black" }}>
                    <FaPlus /> Añadir Piso
                </HomeButton>
            </div>
            <div className='p-5 h-[90%]'>
                <Table<Home>
                    columns={columns}
                    dataSource={homes}
                    rowClassName={(record) => (record.status === "Despublicado" ? "bg-gray-200" : "")}
                    onChange={onChange}
                    scroll={{ x: "max-content" }}
                />
            </div>
        </>
    )
}

export default HomeTable
