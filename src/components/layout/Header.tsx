import { WalletButton } from '../shared/WalletButton';

export const Header = () => {
  return (
    <header className="border-b border-gray-800 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Neural Nexus</h1>
        <WalletButton />
      </div>
    </header>
  );
};