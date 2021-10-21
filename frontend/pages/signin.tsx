import { Box, Button, Input, Text, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

import userStore from "../stores/user.store";

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string[] | null>(null);

    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    const submit = async (e: any) => {
        e.preventDefault;

        try {
            setLoading(true);
            await userStore.signin(username, password);
            router.push("/app");
        } catch (error: any) {
            const newErrorMessage: string | string[] =
                error?.response?.data?.message;
            setErrorMessage(
                typeof newErrorMessage === "string"
                    ? [newErrorMessage]
                    : newErrorMessage
            );
            setLoading(false);
        }
    };

    return (
        <div className="fullscreen-wrapper">
            <div>
                {errorMessage && (
                    <Box
                        py={2}
                        px={8}
                        textColor="white"
                        rounded="lg"
                        bg="tomato"
                    >
                        {errorMessage.map((msg: string, id: number) => (
                            <li key={id}>{msg}</li>
                        ))}
                    </Box>
                )}

                <div>
                    <Text py={2} fontWeight="bold" fontSize="2xl">
                        Welcome back, sign in
                    </Text>
                </div>
                <div>
                    <Text py={2}>Username</Text>
                    <Input onChange={(e: any) => setUsername(e.target.value)} />
                </div>
                <div>
                    <Text py={2}>Password</Text>
                    <Input
                        type="password"
                        onChange={(e: any) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <Button
                        mt={4}
                        mb={8}
                        colorScheme="purple"
                        onClick={submit}
                        isLoading={isLoading}
                    >
                        SIGN IN
                    </Button>
                </div>

                <hr />

                <Text textAlign="center" mt={4}>
                    Do not have an account yet?{" "}
                    <Link href="/signup" textColor="purple.500">
                        Sign up
                    </Link>
                </Text>
            </div>
        </div>
    );
};

export default SignIn;
