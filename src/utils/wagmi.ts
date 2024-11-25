import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { base, mainnet, sepolia, zora } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';
import { RPC_URL, WC_PROJECT_ID } from './constants';

export function getConfig() {
  return createConfig({
    chains: [base, mainnet],
    connectors: [
      injected(),
      coinbaseWallet(),
      walletConnect({ projectId: WC_PROJECT_ID }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [base.id]: http(),
      [mainnet.id]: http(),
    },
  });
}

export function getBaseConfig() {
  return createConfig({
    chains: [base],
    connectors: [
      injected(),
      coinbaseWallet(),
      walletConnect({ projectId: WC_PROJECT_ID }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [base.id]: http(),
    },
  });
}

export function getZoraConfig() {
  return createConfig({
    chains: [zora],
    connectors: [injected()],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [zora.id]: http(),
    },
  });
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
