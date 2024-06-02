import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import React, { useMemo } from "react";
import { ToastContainer } from "react-toastify";

interface PropsPage {
  children: React.ReactNode;
  style?: any;
  title?: string;
}

const Page = (props: PropsPage) => {
  const { children, style, title } = props;
  const page = useMemo(() => {
    return <>{children}</>;
  }, [children]);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <ToastContainer></ToastContainer>
      <div className="page" id="page" style={style}>
        <Header></Header>
        {page}
        <Footer></Footer>
      </div>
    </>
  );
};
export default Page;
