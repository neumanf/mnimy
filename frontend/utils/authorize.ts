import Router from 'next/router';

import userStore from '../stores/user.store';

const redirectIfLoggedIn = async () => {
    const userIsLoggedIn = userStore.isLoggedIn();

    if (userIsLoggedIn) {
        await Router.push('/app/dashboard');
    }
};

const signOut = async () => {
    userStore.signout();
    await Router.push('/signin');
};

export { redirectIfLoggedIn, signOut };
