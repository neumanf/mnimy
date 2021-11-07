import { Flex, Text, Divider } from "@chakra-ui/layout";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import userStore from "../../stores/user.store";

const Navbar = () => {
    const [isLoggedIn, setLogin] = useState(false);

    useEffect(() => {
        const isLoggedIn = userStore.getAccessToken();

        if (isLoggedIn) {
            setLogin(true);
        }
    }, []);

    const renderButtons = () => {
        if (isLoggedIn) {
            return (
                <Link href="/signin" passHref>
                    <Text cursor="pointer">Open Mnimy</Text>
                </Link>
            );
        }
        return (
            <>
                <Link href="/signin" passHref>
                    <Text cursor="pointer">Sign In</Text>
                </Link>
                <Link href="/signup" passHref>
                    <Text pl="4" cursor="pointer">
                        Sign Up
                    </Text>
                </Link>
            </>
        );
    };

    return (
        <>
            <Flex justifyContent="space-between" p="6">
                <Link href="/" passHref>
                    <Text fontWeight="bold" cursor="pointer">
                        Mnimy
                    </Text>
                </Link>
                <Flex>{renderButtons()}</Flex>
            </Flex>
            <Divider />
        </>
    );
};

export default Navbar;
