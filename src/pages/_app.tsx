import "../styles/globals.css";
import { AppProps } from "next/app";
import Layout from "../components/PageLayout";
import { Provider as AuthProvider } from "next-auth/client";
import { CookiesProvider } from "react-cookie";
import { appWithTranslation } from "next-i18next";
import { SWRConfig } from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const resJson = await res.json();
    const error = new Error(resJson.error);
    throw error;
  }

  return res.json();
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{ revalidateOnFocus: false, shouldRetryOnError: false, fetcher }}
    >
      <AuthProvider session={pageProps.session}>
        <CookiesProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CookiesProvider>
      </AuthProvider>
    </SWRConfig>
  );
}

export default appWithTranslation(MyApp);
