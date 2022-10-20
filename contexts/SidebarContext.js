import {createContext, useContext, useState} from "react";
import {useMediaQuery} from "@mui/material";

export const SidebarContext = createContext({
    isOpen: true,
    setIsOpen: (isLoading) => {}
});

export function SidebarContextProvider(props) {
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const [isOpen, setIsOpen] = useState(!isDesktop);

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