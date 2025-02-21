import { WalletContextProvider } from '../providers/WalletProvider';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import '@/styles/wallet.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletContextProvider>
      <Component {...pageProps} />
    </WalletContextProvider>
  );
}

export default MyApp;