import React, { useState, useEffect } from "react"
import AddHomeButton from "./components/AddHomeButton"
import Header from "./components/Header"
import HomeTable from "./components/Table"
import AddHomeForm from "./components/AddHomeForm"
import { Modal } from "antd"
import type { Home } from "./types/Home"
import { deleteHome, fetchHomes, storeHome, updateHome } from "./utils/database"

const HomeTracker: React.FC = () => {
    const [homes, setHomes] = useState<Home[]>([])
    const [selectedHome, setSelectedHome] = useState<Home | null>(null)
    const [showForm, setShowForm] = useState<boolean>(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)

    useEffect(() => {
        const getHomes = async () => {
            try {
                const homes = await fetchHomes()
                setHomes(homes)
            } catch (error) {
                console.error(error)
            }
        }
        getHomes()
    }, [])

    const handleDelete = () => {
        try {
            if (selectedHome)
                deleteHome(selectedHome.key)
                setHomes(homes.filter((home) => home.key !== selectedHome?.key))
        } catch (error) {
            console.error(error)
        }
        setDeleteModalOpen(false)
    }

    const handleSave = async (home: Home) => {        
        try {
            if (isEditing) {
                setIsEditing(false)
                updateHome(home.key, home)
                setHomes(homes.map((h) => h.key === selectedHome?.key ? home : h))
            } else {
                const id = await storeHome(home)
                home.key = id
                setHomes([...homes, home])
            }
            setSelectedHome(null)
        } catch (error) {
            console.error(error)
        }
    }

    const handleOpenDeleteModal = (selectedHome: Home) => {
        setSelectedHome(selectedHome)
        setDeleteModalOpen(true)
    }

    const handleEditStatus = (selectedHome: Home) => {
        setIsEditing(true)
        setSelectedHome(selectedHome)
        setShowForm(true)
    }

    return (
        <>
            <Header />
            <AddHomeButton openForm={() => setShowForm(true)} />
            <div className='p-5 h-[90%]'>
                <HomeTable homes={homes} onDelete={handleOpenDeleteModal} onEdit={handleEditStatus} />
            </div>
            <AddHomeForm open={showForm} selectedHome={selectedHome} onClose={() => setShowForm(false)} onSave={handleSave}/>
            <Modal
                open={deleteModalOpen}
                onCancel={() => setDeleteModalOpen(false)}
                title='Delete Home'
                okText='Delete'
                okButtonProps={{ danger: true }}
                onOk={handleDelete}
            >
                <p>
                    Are you sure you want to delete this home?
                </p>
            </Modal>
        </>
    )
}

export default HomeTracker
