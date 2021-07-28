import "../styles/globals.scss";
import { AppProps } from "next/app";
import Layout from "../components/PageLayout";
import { Provider as AuthProvider } from "next-auth/client";
import { CookiesProvider } from "react-cookie";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider session={pageProps.session}>
      <CookiesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CookiesProvider>
    </AuthProvider>
  );
}

export default appWithTranslation(MyApp);
