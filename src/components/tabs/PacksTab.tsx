// src/components/tabs/PacksTab.tsx
import { FC, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { LoadingState } from '../shared/LoadingState';
import { fetchCandyMachineInfo, mintNFT } from '@/utils/candyMachine';
import type { CandyMachine, CandyGuard } from '@metaplex-foundation/mpl-candy-machine';
import { useUmi } from '@/hooks/useUmi';

export const PacksTab: FC = () => {
  const [isMinting, setIsMinting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [candyMachine, setCandyMachine] = useState<CandyMachine | null>(null);
  const [candyGuard, setCandyGuard] = useState<CandyGuard | null>(null);
  
  const wallet = useWallet();
  const umi = useUmi();

  useEffect(() => {
    const loadCandyMachine = async () => {
      try {
        setIsLoading(true);
        const { candyMachine, candyGuard } = await fetchCandyMachineInfo(umi);
        setCandyMachine(candyMachine);
        setCandyGuard(candyGuard);
      } catch (err) {
        setError('Failed to load pack information');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (wallet.publicKey) {
      loadCandyMachine();
    }
  }, [wallet.publicKey, umi]);

  const handleMint = async () => {
    if (!wallet.publicKey || !candyMachine || !candyGuard) return;
    
    setIsMinting(true);
    setError(null);
    
    try {
      const signature = await mintNFT(umi, candyMachine, candyGuard);
      console.log('Minted successfully:', signature);
      // You might want to add a success notification here
    } catch (err) {
      setError('Failed to mint pack');
      console.error(err);
    } finally {
      setIsMinting(false);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div>
      <h2 className="text-xl mb-4">Pack Shop</h2>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded p-4 mb-4 text-red-300">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-700 rounded">
          <h3 className="text-lg font-medium">Starter Pack</h3>
          <p className="text-sm text-gray-400 mt-2">
            Contains 1 Neural Master and 3 Synthetics
          </p>
          {candyMachine && (
            <p className="text-sm text-gray-400 mt-1">
              Available: {candyMachine.data.itemsAvailable}
            </p>
          )}
          <button
            onClick={handleMint}
            disabled={!wallet.publicKey || isMinting || !candyMachine}
            className={`mt-4 px-4 py-2 rounded w-full ${
              !wallet.publicKey
                ? 'bg-gray-600 cursor-not-allowed'
                : isMinting
                ? 'bg-purple-800 cursor-wait'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {isMinting ? (
              <span className="flex items-center justify-center">
                <LoadingState />
                <span className="ml-2">Minting...</span>
              </span>
            ) : !wallet.publicKey ? (
              'Connect Wallet'
            ) : !candyMachine ? (
              'Loading...'
            ) : (
              'Mint Pack'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};