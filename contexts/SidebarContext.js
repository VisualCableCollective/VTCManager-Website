import {createContext, useContext, useState} from "react";

export const SidebarContext = createContext({
    isOpen: true,
    setIsOpen: (isLoading) => {}
});

export function SidebarContextProvider(props) {
    const [isOpen, setIsOpen] = useState(false);

    const context = {
        isOpen,
        setIsOpen
    };

    return (
        <SidebarContext.Provider value={context}>
            {props.children}
        </SidebarContext.Provider>
    );
}

export const useSidebar = () => useContext(SidebarContext);