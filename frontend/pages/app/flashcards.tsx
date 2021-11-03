import { useEffect } from "react";

import Layout from "../../components/Layouts/App";
import { authorize } from "../../utils/authorize";

const Flashcards = () => {
    useEffect(() => {
        authorize();
    }, []);

    return <Layout>Flashcards</Layout>;
};

export default Flashcards;
