import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient
} from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

export const { chains, provider } = configureChains(
  [chain.goerli, chain.mainnet],
  [
    infuraProvider(), //TODO: generate API key to prevent being rate-limited
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'The Sigils',
  chains
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});