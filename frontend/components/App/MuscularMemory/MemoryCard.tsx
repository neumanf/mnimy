import Icon from '@chakra-ui/icon';
import { Flex, Text, Box } from '@chakra-ui/layout';
import { Button, Tooltip, useToast } from '@chakra-ui/react';
import React from 'react';
import { FaArrowAltCircleRight, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/router';

import BaseHttpService from '../../../services/base-http.service';

interface IMemoryCard {
    getMemories: () => Promise<any>;
    id: string;
    title: string;
    content: string;
}

const MemoryCard = ({ getMemories, id, title, content }: IMemoryCard) => {
    const toast = useToast();
    const router = useRouter();

    const deleteMemory = async () => {
        try {
            const request = new BaseHttpService();
            await request.delete(`/memories/${id}`);

            toast({
                title: 'Memory deleted.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            await getMemories();
        } catch (e: any) {
            toast({
                title: 'Error, please try again later.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const redirectToMemory = () => {
        router.push(`/app/muscularmemory/${id}`);
    };

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
                            _hover={{ bgColor: 'gray.500' }}
                            onClick={redirectToMemory}
                        >
                            <Icon as={FaArrowAltCircleRight} />
                        </Button>
                    </Tooltip>

                    <Tooltip label="Delete">
                        <Button
                            mt="2"
                            bgColor="red.300"
                            textColor="white"
                            _hover={{ bgColor: 'red.400' }}
                            onClick={deleteMemory}
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
