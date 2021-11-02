import { useEffect } from "react";

import Layout from "../../components/Layouts/App";
import authorize from "../../utils/authorize";

const Settings = () => {
    useEffect(() => {
        authorize();
    }, []);

    return <Layout>Settings</Layout>;
};

export default Settings;
