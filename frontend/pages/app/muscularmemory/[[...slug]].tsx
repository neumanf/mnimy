import React, { useEffect } from "react";
import {
    Box,
    Button,
    Input,
    Text,
    Flex,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    InputGroup,
    InputLeftElement,
    useDisclosure,
} from "@chakra-ui/react";

import Layout from "../../../components/Layouts/App";
import { authorize } from "../../../utils/authorize";
import { FaInfoCircle, FaPlusCircle, FaSearch } from "react-icons/fa";
import MemoryCard from "../../../components/App/MuscularMemory/MemoryCard";
import InfoText from "../../../components/Common/InfoText";
import AddMemoryModal from "../../../components/App/MuscularMemory/AddMemoryModal";
import { useRouter } from "next/router";

const MuscularMemory = () => {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { slug } = router.query;

    useEffect(() => {
        authorize();
    }, []);

    return (
        <Layout>
            <Flex>
                <Flex flexDirection="column" flex="7">
                    <Flex justifyContent="end" my="2">
                        <Popover id="popover">
                            <PopoverTrigger>
                                <Button
                                    bgColor="gray.300"
                                    textColor="white"
                                    _hover={{
                                        bgColor: "gray.500",
                                    }}
                                    mr="2"
                                >
                                    <Icon as={FaInfoCircle} />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>
                                    Muscular Memory Trainer
                                </PopoverHeader>
                                <PopoverBody>
                                    Here you can train your muscular memory by
                                    typing the subject you need to remember
                                    multiple times. To make this process more
                                    fun, try to be faster each time!
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>

                        <Button
                            bgColor="green.300"
                            textColor="white"
                            _hover={{
                                bgColor: "green.500",
                            }}
                            onClick={onOpen}
                        >
                            <Icon mr="2" as={FaPlusCircle} /> New
                        </Button>
                        <AddMemoryModal isOpen={isOpen} onClose={onClose} />
                    </Flex>
                    <Box bgColor="white" rounded="xl" h="40" p="4">
                        {slug ? (
                            <Text>{slug[0]}</Text>
                        ) : (
                            <InfoText text="No memory selected." />
                        )}
                    </Box>
                    <Input my="2" bgColor="white"></Input>
                </Flex>
                <Flex flexDirection="column" flex="5" ml="4" px="4" maxW="3xl">
                    <Flex mb="4">
                        <Text flex="14" fontSize="2xl" fontWeight="bold">
                            Memories
                        </Text>
                        <InputGroup flex="10" bgColor="white">
                            <InputLeftElement pointerEvents="none">
                                <Icon mr="1" mb="1" as={FaSearch} />
                            </InputLeftElement>
                            <Input placeholder="Search" />
                        </InputGroup>
                    </Flex>
                    <InfoText text="No memories found. Create one by pressing the New button." />
                    {/* <MemoryCard title="test" content="content" /> */}
                </Flex>
            </Flex>
        </Layout>
    );
};

export default MuscularMemory;
