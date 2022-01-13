import { useRouter } from 'next/router';
import React, { ReactNode, ReactText } from 'react';
import { IconType } from 'react-icons';
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Button,
} from '@chakra-ui/react';

import { FiMenu } from 'react-icons/fi';
import { FaBrain } from 'react-icons/fa';
import { GiCardExchange } from 'react-icons/gi';
import { MdSpaceDashboard } from 'react-icons/md';
import { IoMdSettings } from 'react-icons/io';

import BaseHttpService from '../../../services/base-http.service';

interface LinkItemProps {
    name: string;
    icon: IconType;
    path: string;
}

const LinkItems: Array<LinkItemProps> = [
    { name: 'Dashboard', icon: MdSpaceDashboard, path: '/app/dashboard' },
    {
        name: 'Muscular Memory',
        icon: FaBrain,
        path: '/app/muscularmemory',
    },
    { name: 'Flashcards', icon: GiCardExchange, path: '/app/flashcards' },
    { name: 'Settings', icon: IoMdSettings, path: '/app/settings' },
];

export default function Sidebar({ children }: { children: ReactNode }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const router = useRouter();

    const signOut = async () => {
        const request = new BaseHttpService();
        await request.get('/auth/signout');
        await router.push('/');
    };

    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex flexDirection="column" justifyContent="space-between">
                <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                    <Text fontSize="2xl" color="red.500" fontWeight="bold">
                        mnimy
                    </Text>
                    <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
                </Flex>
                {LinkItems.map((link) => (
                    <NavItem key={link.name} icon={link.icon} path={link.path}>
                        {link.name}
                    </NavItem>
                ))}
                <Button onClick={signOut} m="4">
                    Sign Out
                </Button>
            </Flex>
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
    path: string;
}

const NavItem = ({ icon, path, children, ...rest }: NavItemProps) => {
    return (
        <Link href={path} style={{ textDecoration: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    color: 'green.300',
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'green.300',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent="flex-start"
            {...rest}
        >
            <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
                Logo
            </Text>
        </Flex>
    );
};
