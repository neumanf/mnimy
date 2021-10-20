import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ChakraProvider, Container } from "@chakra-ui/react";

import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <Navbar />
            <Container p="6">
                <Component {...pageProps} />
            </Container>
        </ChakraProvider>
    );
}
export default MyApp;
