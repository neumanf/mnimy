import { NextPage } from "next";
import React from "react";

import Sidebar from "../Common/Sidebar/Sidebar";

const Layout: NextPage = ({ children }) => {
    return (
        <>
            <Sidebar>{children}</Sidebar>
        </>
    );
};

export default Layout;
