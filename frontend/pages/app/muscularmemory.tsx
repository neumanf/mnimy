import { useEffect } from "react";

import Layout from "../../components/Layouts/App";
import authorize from "../../utils/authorize";

const MuscularMemory = () => {
    useEffect(() => {
        authorize();
    }, []);

    return <Layout>Muscular Memory</Layout>;
};

export default MuscularMemory;
