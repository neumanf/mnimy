import Icon from "@chakra-ui/icon";
import { Flex, Text, Box } from "@chakra-ui/layout";
import { Button, Tooltip } from "@chakra-ui/react";
import React from "react";
import { FaArrowAltCircleRight, FaTrash } from "react-icons/fa";

interface IMemoryCard {
    title: string;
    content: string;
}

const MemoryCard = ({ title, content }: IMemoryCard) => {
    return (
        <Box bgColor="white" p="4" rounded="lg" maxW="full">
            <Flex alignItems="center">
                <Flex flexDirection="column" flex="1">
                    <Text fontWeight="bold" fontSize="lg" maxW="lg" isTruncated>
                        {title}
                    </Text>
                    <Text maxW="lg" isTruncated>
                        {content}
                    </Text>
                </Flex>
                <Flex flexDirection="column">
                    <Tooltip label="Access">
                        <Button
                            bgColor="gray.300"
                            textColor="white"
                            _hover={{ bgColor: "gray.500" }}
                        >
                            <Icon as={FaArrowAltCircleRight} />
                        </Button>
                    </Tooltip>

                    <Tooltip label="Delete">
                        <Button
                            mt="2"
                            bgColor="red.300"
                            textColor="white"
                            _hover={{ bgColor: "red.400" }}
                        >
                            <Icon as={FaTrash} />
                        </Button>
                    </Tooltip>
                </Flex>
            </Flex>
        </Box>
    );
};

export default MemoryCard;
