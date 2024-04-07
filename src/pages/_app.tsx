import "@/styles/global.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ToastContainer></ToastContainer>

      <Component {...pageProps} />
    </Provider>
  );
}
