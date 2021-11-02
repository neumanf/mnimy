import { useEffect } from "react";

import Layout from "../../components/Layouts/App";
import authorize from "../../utils/authorize";

const Dashboard = () => {
    useEffect(() => {
        authorize();
    }, []);

    return <Layout>dashboard</Layout>;
};

export default Dashboard;
