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
} from "@chakra-ui/react";
import React from "react";

interface IAddMemoryModal {
    isOpen: boolean;
    onClose: () => void;
}

const AddMemoryModal = ({ isOpen, onClose }: IAddMemoryModal) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>New memory</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing="4">
                        <Text>Title</Text>
                        <Input />
                        <Text>Content</Text>
                        <Textarea />
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button
                        bgColor="green.300"
                        textColor="white"
                        _hover={{ bgColor: "green.500" }}
                        onClick={onClose}
                    >
                        Create
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddMemoryModal;
