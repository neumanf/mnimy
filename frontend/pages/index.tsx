import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import Layout from "../components/Layouts/home";

const Home: NextPage = () => {
    return (
        <Layout>
            <Head>
                <title>Mnimy</title>
                <meta name="description" content="Homepage" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main></main>
        </Layout>
    );
};

export default Home;
