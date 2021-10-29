import { Container } from "@chakra-ui/layout";
import { NextPage } from "next";
import React from "react";
import Navbar from "../Common/Navbar";

const Layout: NextPage = ({ children }) => {
    return (
        <>
            <Navbar />
            <Container p="6">{children}</Container>
        </>
    );
};

export default Layout;
