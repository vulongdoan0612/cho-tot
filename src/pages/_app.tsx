import "@/styles/global.scss";
import type { AppProps } from "next/app";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import NextAdapterPages from "next-query-params/pages";
import "slick-carousel/slick/slick-theme.css";
import { QueryParamProvider } from "use-query-params";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {" "}
      <PayPalScriptProvider
        options={{ clientId: "AV2d102_lOS646majeFw5LvidmeY_GQhIGQ7jSsTfl8P2I7x3eRRtB9WlhtoqWlZCkz9z5Ql8iDM1vKJ", currency: "USD" }}
      >
        <ToastContainer />
        <QueryParamProvider adapter={NextAdapterPages}>
          <Component {...pageProps} />
        </QueryParamProvider>
      </PayPalScriptProvider>{" "}
    </Provider>
  );
}
