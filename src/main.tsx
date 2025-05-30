import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "../styles/init.css"
import HomeTracker from "./HomeTracker"
import { ConfigProvider } from "antd"

const theme = {
    token: {
        colorPrimary: "#86efac",
    },
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ConfigProvider theme={theme}>
            <HomeTracker />
        </ConfigProvider>
    </StrictMode>
)
