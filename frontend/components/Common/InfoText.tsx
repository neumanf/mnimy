import React from "react";
import { Icon, Text } from "@chakra-ui/react";
import { FaInfoCircle } from "react-icons/fa";

interface IInfoText {
    text: string;
}

const InfoText = ({ text }: IInfoText) => {
    return (
        <Text textColor="gray.400" textAlign="center">
            <Icon mr="1" mb="1" as={FaInfoCircle} /> {text}
        </Text>
    );
};

export default InfoText;
