import { Flex, Text, Divider } from "@chakra-ui/layout";
import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <>
            <Flex justifyContent="space-between" p="6">
                <Link href="/" passHref>
                    <Text fontWeight="bold" cursor="pointer">
                        Mnimy
                    </Text>
                </Link>
                <Flex>
                    <Link href="/signin" passHref>
                        <Text cursor="pointer">Sign In</Text>
                    </Link>
                    <Link href="/signup" passHref>
                        <Text pl="4" cursor="pointer">
                            Sign Up
                        </Text>
                    </Link>
                </Flex>
            </Flex>
            <Divider />
        </>
    );
};

export default Navbar;
