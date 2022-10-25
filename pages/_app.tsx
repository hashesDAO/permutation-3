import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>The Sigils</title>
        <meta
            name="description"
            content="Sigils description"
        />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:creator" content="@Hsigils" key="twhandle" />
        <meta name="twitter:site" content="@sigils" />
        <meta name="twitter:title" content="The Sigils" />
        <meta
            name="twitter:description"
            content="Sigils description"
        />
        <meta
            name="twitter:image"
            content="some jpeg"
        />

        <meta property="og:url" content="https://www.thesigil.xyz/" key="ogurl" />
        <meta
            property="og:image"
            content="some jpeg"
            key="ogimage"
        />
        <meta property="og:site_name" content="The Sigils" key="ogsitename" />
        <meta property="og:title" content="The Sigils" key="ogtitle" />
        <meta
            property="og:description"
            content="Sigil description"
            key="ogdesc"
        />
      </Head>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  )
}

export default MyApp
