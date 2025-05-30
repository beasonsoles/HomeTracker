import React from "react"
import { FaPlus } from "react-icons/fa"
import { Button } from "antd"

type Props = {
    openForm: () => void
}

const AddHomeButton: React.FC<Props> = ({ openForm }) => {
    return (
        <>
            <div className='pt-5 pl-5 pr-5 flex justify-end'>
                <Button
                    variant='outlined'
                    style={{ backgroundColor: "#86efac", border: "none", color: "black" }}
                    onClick={openForm}
                >
                    <FaPlus /> Añadir Piso
                </Button>
            </div>
        </>
    )
}

export default AddHomeButton
