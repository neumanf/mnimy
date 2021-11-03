import userStore from "../stores/user.store";
import Router from "next/router";

const authorize = async () => {
    const isLoggedIn = userStore.isLoggedIn();

    if (!isLoggedIn) {
        await Router.push("/signin");
    }
};

const redirectIfLoggedIn = async () => {
    const isLoggedIn = userStore.isLoggedIn();

    if (isLoggedIn) {
        await Router.push("/app/dashboard");
    }
};

export { authorize, redirectIfLoggedIn };
