import userStore from "../stores/user.store";
import Router from "next/router";

const authorize = async () => {
    const hasToken = userStore.getAccessToken();

    if (!hasToken) {
        await Router.push("/signin");
    }
};

const redirectIfLoggedIn = async () => {
    const hasToken = userStore.getAccessToken();

    if (hasToken) {
        await Router.push("/app/dashboard");
    }
};

const signOut = async () => {
    userStore.signout();
    await Router.push("/signin");
};

export { authorize, redirectIfLoggedIn, signOut };
