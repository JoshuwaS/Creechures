interface TabNavigationProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
  }
  
  export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
    const tabs = ['packs', 'collection', 'training', 'battle', 'energy'];
  
    return (
      <nav className="flex space-x-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab 
                ? 'bg-purple-600' 
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>
    );
  };