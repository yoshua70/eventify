import Head from "next/head";

type AppProps = {
  children: JSX.Element[];
  title?: string;
};

const Layout = ({ children, title }: AppProps) => {
  return (
    <div className="flex flex-col min-h-screen items-center">
      <Head>
        <title>{title ? title : "Eventify"}</title>
        <meta
          name="description"
          content="Create and share events with your friends"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  );
};

export default Layout;
