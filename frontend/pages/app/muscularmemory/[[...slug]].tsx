import React, { useEffect } from 'react';
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
} from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight, FaInfoCircle, FaPlusCircle, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Layout from '../../../components/Layouts/App';
import MemoryCard from '../../../components/App/MuscularMemory/MemoryCard';
import InfoText from '../../../components/Common/InfoText';
import AddMemoryModal from '../../../components/App/MuscularMemory/AddMemoryModal';
import BaseHttpService from '../../../services/base-http.service';

interface IMemory {
    id: string;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

interface IPaginationLinks {
    first: string;
    last: string;
    next: string;
    previous: string;
}

const MuscularMemory = () => {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [memory, setMemory] = useState<IMemory | null>(null);
    const [memories, setMemories] = useState<IMemory[]>([]);
    const [pagination, setPagination] = useState<IPaginationLinks | null>(null);
    const [search, setSearch] = useState<string>('');

    const { slug } = router.query;

    const getPaths = (links: any) => {
        for (const index in links) {
            links[index] = links[index].replace(process.env.BACKEND_URL, '');
        }
        return links;
    };

    const getMemories = async (paginate?: 'left' | 'right') => {
        const path =
            paginate && pagination
                ? paginate === 'left'
                    ? pagination.previous
                    : pagination.next
                : '/memories';
        const res: any = await BaseHttpService.get(path);

        const paths = getPaths(res.data.links);

        setMemories(res.data.items);
        setPagination(paths);
    };

    useEffect(() => {
        (async () => {
            await getMemories();
        })();
    }, []);

    useEffect(() => {
        const memory = memories.find((m) => m.id === slug?.[0]);
        if (memory) {
            setMemory(memory);
        } else {
            if (slug?.[0]) {
                setMemory(null);
                router.push('/app/muscularmemory');
            }
        }
    }, [memories, slug, router]);

    useEffect(() => {
        (async () => {
            const res: any = await BaseHttpService.get(`/memories?search=${search}`);
            const paths = getPaths(res.data.links);

            setMemories(res.data.items);
            setPagination(paths);
        })();
    }, [search]);

    return (
        <Layout>
            <Flex>
                <Flex flexDirection="column" flex="7">
                    <Flex justifyContent="space-between" alignItems="center" my="3">
                        {memory ? (
                            <Text fontWeight="bold" isTruncated>
                                {memory.title}
                            </Text>
                        ) : (
                            <Text />
                        )}
                        <Flex>
                            <Popover id="popover">
                                <PopoverTrigger>
                                    <Button
                                        bgColor="gray.300"
                                        textColor="white"
                                        _hover={{
                                            bgColor: 'gray.500',
                                        }}
                                        mr="2"
                                    >
                                        <Icon as={FaInfoCircle} />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader>Muscular Memory Trainer</PopoverHeader>
                                    <PopoverBody>
                                        Here you can train your muscular memory by typing the
                                        subject you need to remember multiple times. To make this
                                        process more fun, try to be faster each time!
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>

                            <Button
                                bgColor="green.300"
                                textColor="white"
                                _hover={{
                                    bgColor: 'green.500',
                                }}
                                onClick={onOpen}
                            >
                                <Icon mr="2" as={FaPlusCircle} /> New
                            </Button>
                            <AddMemoryModal
                                getMemories={getMemories}
                                isOpen={isOpen}
                                onClose={onClose}
                            />
                        </Flex>
                    </Flex>
                    <Box bgColor="white" rounded="xl" h="40" p="4">
                        {memory ? (
                            <Text>{memory.content}</Text>
                        ) : (
                            <InfoText text="No memory selected." />
                        )}
                    </Box>
                    <Input my="2" bgColor="white" />
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
                            <Input
                                placeholder="Search"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </InputGroup>
                    </Flex>
                    {memories ? (
                        memories.map(({ id, title, content }, index) => (
                            <Box key={index} my={2}>
                                <MemoryCard
                                    getMemories={getMemories}
                                    id={id}
                                    title={title}
                                    content={content}
                                />
                            </Box>
                        ))
                    ) : (
                        <InfoText text="No memories found. Create one by pressing the New button." />
                    )}
                    <Flex mt={1} justifyContent="end">
                        <Button
                            bgColor="gray.300"
                            textColor="white"
                            mr={2}
                            _hover={{
                                bgColor: 'gray.500',
                            }}
                            disabled={!pagination || pagination?.previous.length === 0}
                            onClick={() => getMemories('left')}
                        >
                            <Icon as={FaArrowLeft} />
                        </Button>
                        <Button
                            bgColor="gray.300"
                            textColor="white"
                            _hover={{
                                bgColor: 'gray.500',
                            }}
                            disabled={!pagination || pagination?.next.length === 0}
                            onClick={() => getMemories('right')}
                        >
                            <Icon as={FaArrowRight} />
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Layout>
    );
};

export default MuscularMemory;
