import { publicKey } from '@metaplex-foundation/umi';
import { 
  fetchCandyMachine,
  mintV2,
  safeFetchCandyGuard,
  CandyMachine,
  CandyGuard,
} from '@metaplex-foundation/mpl-candy-machine';
import { Umi } from '@metaplex-foundation/umi';
import { generateSigner } from '@metaplex-foundation/umi';
import { UnexpectedAccountError } from '@metaplex-foundation/umi';

export const CANDY_MACHINE_ID = publicKey('8djYXvUtqBTJ5bSqwuaCFRU4NFF6BC3Uphg9V8jtNAkr');

export async function fetchCandyMachineInfo(umi: Umi) {
  try {
    const candyMachine = await fetchCandyMachine(umi, CANDY_MACHINE_ID);
    const candyGuard = await safeFetchCandyGuard(umi, candyMachine.mintAuthority);
    
    // Log the fetched candy machine and guard for debugging
    console.log('Candy Machine Address:', candyMachine.publicKey.toString());
    console.log('Candy Guard Address:', candyGuard?.publicKey.toString());
    
    return { candyMachine, candyGuard };
  } catch (error) {
    console.error('Error fetching Candy Machine:', error);
    if (error instanceof UnexpectedAccountError) {
      console.error('Unexpected account error:', error);
    }
    throw error;
  }
}

export async function mintNFT(
  umi: Umi,
  candyMachine: CandyMachine,
  candyGuard: CandyGuard | null
) {
  try {
    const nftMint = generateSigner(umi);
    
    const solPayment = candyGuard?.guards.solPayment.__option === 'Some'
      ? candyGuard.guards.solPayment.value
      : null;
    
    if (!solPayment) {
      throw new Error('Sol payment not found in guard config');
    }

    const { signature } = await mintV2(umi, {
      candyMachine: candyMachine.publicKey,
      nftMint,
      collectionMint: candyMachine.collectionMint,
      collectionUpdateAuthority: candyMachine.authority,
      tokenStandard: candyMachine.tokenStandard,
      candyGuard: candyGuard?.publicKey,
      mintArgs: {
        groups: [],
        guards: {
          solPayment: {
            destination: solPayment.destination,
            lamports: solPayment.lamports,
            payer: umi.identity // Add the payer account
          }
        }
      },
    }).addRemainingAccounts([
      {
        pubkey: solPayment.destination,
        isWritable: true,
        isSigner: false,
      }
    ]).sendAndConfirm(umi);
    return signature;
  } catch (error) {
    console.error('Error minting NFT:', error);
    throw error;
  }
}