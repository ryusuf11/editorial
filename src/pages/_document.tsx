import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="notranslate" translate="no" lang="en">
      <Head>
        <meta name="google" content="notranslate" />
        <meta name="author" content="Ryan Yusuf" />
        <meta name="publisher" content="Ryan Yusuf" />
        <meta name="description" content="Rich Text Editor" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
