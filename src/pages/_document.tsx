import { Html, Head, Main, NextScript } from "next/document";
import NextAdapterApp from "next-query-params/app";
import { QueryParamProvider } from "use-query-params";
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
          <Main />
          <NextScript />{" "}
      </body>
    </Html>
  );
}
