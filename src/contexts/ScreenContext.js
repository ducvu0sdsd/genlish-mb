import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import { userContext } from "./UserContext";
export const screenContext = createContext()

const ScreenProvider = ({ children }) => {

    const [currentScreen, setCurrentScreen] = useState(0)

    const navigate = (route) => {
        switch (route) {
            case 'landing':
                setCurrentScreen(0)
                break
            case 'course':
                setCurrentScreen(1)
                break
            case 'course-detail':
                setCurrentScreen(2)
                break
            case 'viewing-course':
                setCurrentScreen(3)
                break
            case 'learn':
                setCurrentScreen(4)
                break
            case 'search':
                setCurrentScreen(5)
                break
            case 'broadcast':
                setCurrentScreen(6)
                break
            case 'record':
                setCurrentScreen(7)
                break
        }
    }

    const data = {
        currentScreen
    }

    const handler = {
        navigate,

    }

    return (
        <screenContext.Provider value={{ screenData: data, screenHandler: handler }}>
            {children}
        </screenContext.Provider>
    )
}

export default ScreenProvider