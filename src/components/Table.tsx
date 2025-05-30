import React from "react"
import { Button, Table } from "antd"
import { FaTrash, FaEdit } from "react-icons/fa"
import type { TableColumnsType, TableProps } from "antd"
import { Kitchen, type Home } from "../types/Home"

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

const onChange: TableProps<Home>["onChange"] = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra)
}

type Props = {
    homes: Home[]
    onDelete: (selectedHome: Home) => void
    onEdit: (selectedHome: Home) => void
}

const HomeTable: React.FC<Props> = ({ homes, onDelete, onEdit }) => {
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
            onFilter: (value, record) => record.status === value,
            render: (text) => renderColoredText(text, false),
        },
        {
            title: "App",
            dataIndex: "app",
            filters: [
                { text: "Idealista", value: "idealista" },
                { text: "Fotocasa", value: "fotocasa" },
            ],
            onFilter: (value, record) => record.app === value,
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
                { text: "Inmobiliaria", value: "inmobiliaria" },
                { text: "Particular", value: "particular" },
            ],
            onFilter: (value, record) => record.advertiser === value,
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
            render: (text) => renderColoredText(text, true),
        },
        {
            title: "Ascensor",
            dataIndex: "hasElevator",
            render: (val) => {
                const text = val === true ? "Sí" : "No"
                return renderColoredText(text, false)
            },
        },
        {
            title: "A/C",
            dataIndex: "hasAC",
            render: (val) => {
                const text = val === true ? "Sí" : "No"
                return renderColoredText(text, false)
            },
        },
        {
            title: "Garaje",
            dataIndex: "hasGarage",
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
        <Table<Home>
            columns={columns}
            dataSource={homes}
            rowClassName={(record) => (record.status === "Despublicado" ? "bg-gray-200" : "")}
            onChange={onChange}
            scroll={{ x: "max-content" }}
        />
    )
}

export default HomeTable
