import { Box, Button, Input, Text, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import userStore from "../stores/user.store";
import Layout from "../components/Layouts/Home";
import authorize from "../utils/authorize";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string[] | null>(null);

    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        authorize();
    }, []);

    const submit = async (e: any) => {
        e.preventDefault;

        if (confirmedPassword !== password) {
            setErrorMessage(["passwords do not match"]);
            return;
        }

        try {
            setLoading(true);
            await userStore.signup(username, email, password);
            await router.push("/signin");
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
        <Layout>
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
                        Sign Up
                    </Text>
                </div>
                <div>
                    <Text py={2}>Username</Text>
                    <Input onChange={(e: any) => setUsername(e.target.value)} />
                </div>
                <div>
                    <Text py={2}>Email</Text>
                    <Input
                        type="email"
                        onChange={(e: any) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <Text py={2}>Password</Text>
                    <Input
                        type="password"
                        onChange={(e: any) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <Text py={2}>Confirm password</Text>
                    <Input
                        type="password"
                        onChange={(e: any) =>
                            setConfirmedPassword(e.target.value)
                        }
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
                        SIGN UP
                    </Button>
                </div>

                <hr />

                <Text textAlign="center" mt={4}>
                    Already have an account?{" "}
                    <Link href="/signin" textColor="purple.500">
                        Sign in
                    </Link>
                </Text>
            </div>
        </Layout>
    );
};

export default SignUp;
