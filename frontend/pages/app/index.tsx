import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";

import userStore from "../../stores/user.store";

const Dashboard = () => {
    const router = useRouter();

    const signout = () => {
        userStore.signout();
        router.push("/");
    };

    return <Button onClick={signout}>Sign Out</Button>;
};

export default Dashboard;
