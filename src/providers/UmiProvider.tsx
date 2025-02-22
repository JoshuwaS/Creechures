// src/providers/UmiProvider.tsx
import { FC, ReactNode, createContext, useMemo } from 'react';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import * as walletAdapters from '@metaplex-foundation/umi-signer-wallet-adapters';
import { mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine';
import { useWallet } from '@solana/wallet-adapter-react';
import { Umi } from '@metaplex-foundation/umi';

export const UmiContext = createContext<Umi | null>(null);

interface UmiProviderProps {
  children: ReactNode;
  endpoint?: string;
}

export const UmiProvider: FC<UmiProviderProps> = ({ 
  children, 
  endpoint = "https://api.devnet.solana.com" 
}) => {
  const wallet = useWallet();

  const umi = useMemo(() => {
    const umi = createUmi(endpoint).use(mplCandyMachine());
    
    if (wallet.publicKey) {
      umi.use(walletAdapters.walletAdapterIdentity(wallet));
    }
    
    return umi;
  }, [endpoint, wallet]);

  return (
    <UmiContext.Provider value={umi}>
      {children}
    </UmiContext.Provider>
  );
};