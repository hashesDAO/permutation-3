import type { AppProps } from 'next/app'
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react'
import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import Layout from '../components/Layout';
import HeadContent from '../components/HeadContent';
import { wagmiClient, chains } from "../util/rainbow";
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <HeadContent />
      </Head>

      <ChakraProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </>
  )
}

export default MyApp
