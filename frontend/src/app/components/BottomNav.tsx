import { Home, Calendar, Search, Award, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'activity', icon: Award, label: 'Activity' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#FBF6F2] border-t-2 border-[#F99257] border-opacity-20 shadow-lg z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center gap-1 p-2 min-w-[60px] group"
              title={tab.label}
            >
              <Icon
                size={24}
                className={`transition-colors ${
                  isActive ? 'text-[#F99257]' : 'text-gray-600'
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`font-['Hind_Mysuru',sans-serif] text-[10px] transition-colors ${
                  isActive ? 'text-[#F99257] font-semibold' : 'text-gray-600'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
