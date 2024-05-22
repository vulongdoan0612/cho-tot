import "@/styles/global.scss";
import type { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import NextAdapterPages from "next-query-params/pages";
import "slick-carousel/slick/slick-theme.css";
import { QueryParamProvider } from "use-query-params";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <ToastContainer />
    <QueryParamProvider adapter={NextAdapterPages}>
      <Component {...pageProps} />
    </QueryParamProvider>
  </>
);

export default wrapper.withRedux(MyApp);
