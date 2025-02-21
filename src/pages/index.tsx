import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { MainLayout } from '../components/layout/MainLayout';
import { TabNavigation } from '../components/shared/TabNavigation';
import { PacksTab } from '../components/tabs/PacksTab';
import { CollectionTab } from '../components/tabs/CollectionTab';
import { TrainingTab } from '../components/tabs/TrainingTab';
import { BattleTab } from '../components/tabs/BattleTab';
import { EnergyTab } from '../components/tabs/EnergyTab';

export default function Home() {
  const { publicKey } = useWallet();
  const [activeTab, setActiveTab] = useState('packs');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'packs':
        return <PacksTab />;
      case 'collection':
        return <CollectionTab />;
      case 'training':
        return <TrainingTab />;
      case 'battle':
        return <BattleTab />;
      case 'energy':
        return <EnergyTab />;
      default:
        return <PacksTab />;
    }
  };

  return (
    <MainLayout>
      {!publicKey ? (
        <div className="text-center py-20">
          <h2 className="text-2xl mb-4">Welcome to Neural Nexus</h2>
          <p className="text-gray-400">Connect your wallet to begin</p>
        </div>
      ) : (
        <div>
          <TabNavigation 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
          <div className="p-4 bg-gray-800 rounded">
            {renderTabContent()}
          </div>
        </div>
      )}
    </MainLayout>
  );
}