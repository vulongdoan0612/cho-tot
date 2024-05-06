import "@/styles/global.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import NextAdapterPages from "next-query-params/pages";

import "slick-carousel/slick/slick-theme.css";
import { QueryParamProvider } from "use-query-params";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ToastContainer></ToastContainer>
      <QueryParamProvider adapter={NextAdapterPages}>
        <Component {...pageProps} />{" "}
      </QueryParamProvider>
    </Provider>
  );
}
