import React from "react"
import { Button } from "antd"

type Props = {
    action: () => void
    style: React.CSSProperties
    children: React.ReactNode
}

const HomeButton: React.FC<Props> = ({ action, style, children }) => {
    return (
        <Button variant='outlined' style={style} onClick={action}>
            {children}
        </Button>
    )
}

export default HomeButton
