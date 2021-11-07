import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Stack,
    Input,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import RequestHandler from "../../../handlers/request.handler";

interface IAddMemoryModal {
    getMemories: () => Promise<any>;
    isOpen: boolean;
    onClose: () => void;
}

const AddMemoryModal = ({ getMemories, isOpen, onClose }: IAddMemoryModal) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const toast = useToast();

    const createMemory = async () => {
        try {
            const { status, res } = await RequestHandler.make(
                "/memories",
                "POST",
                { title, content }
            );

            switch (status) {
                case 201: {
                    toast({
                        title: "Memory created.",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    });
                    break;
                }
                case 400: {
                    toast({
                        title: "Error, please try again.",
                        description: res.message.join(", "),
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    });
                    break;
                }
            }

            await getMemories();
        } catch (e: any) {
            toast({
                title: "Error, please try again later.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>New memory</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing="4">
                        <Text>Title</Text>
                        <Input onChange={(e) => setTitle(e.target.value)} />
                        <Text>Content</Text>
                        <Textarea
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button
                        bgColor="green.300"
                        textColor="white"
                        _hover={{ bgColor: "green.500" }}
                        onClick={createMemory}
                    >
                        Create
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddMemoryModal;
