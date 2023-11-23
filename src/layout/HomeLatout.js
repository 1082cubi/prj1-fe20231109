import React from "react";
import {NavBar} from "../component/NavBar";

export function HomeLatout() {
    return (
        <Box>
            <NavBar />
            <Outlet></Outlet>
        </Box>
    );
}

