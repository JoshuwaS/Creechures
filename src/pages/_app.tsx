import { WalletContextProvider } from '../providers/WalletProvider';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import '@/styles/wallet.css';
import { UmiProvider } from '../providers/UmiProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletContextProvider>
      <UmiProvider>
        <Component {...pageProps} />
      </UmiProvider>
    </WalletContextProvider>
  );
}
export default MyApp;
