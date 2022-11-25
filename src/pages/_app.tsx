import type { AppProps } from 'next/app';
import { Inter } from '@next/font/google';
import Head from 'next/head';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { theme } from '@/config/theme';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Rich Text Editor</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1, initial-scale=1"
        />
        ;
      </Head>
      <style jsx global>{`
        html,
        body.chakra-ui-light,
        body.chakra-ui-dark {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
