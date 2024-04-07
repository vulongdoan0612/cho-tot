import { Html, Head, Main, NextScript } from "next/document";
import { ToastContainer } from "react-toastify";

export default function Document() {
  return (
    <Html lang="en">
      <ToastContainer></ToastContainer>

      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
