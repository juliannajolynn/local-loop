import { Search, UserPlus, Check, X } from 'lucide-react';
import { useState } from 'react';
import imgProfilePic from "figma:asset/ddd0b4eca52d033edaca02267dc23dd631c3e64d.png";

interface User {
  username: string;
  location: string;
  actionsCompleted: number;
  isFriend: boolean;
}

const mockUsers: User[] = [
  { username: 'foodiefred', location: 'Oakland, CA', actionsCompleted: 6, isFriend: true },
  { username: 'civic_jen', location: 'Oakland, CA', actionsCompleted: 15, isFriend: true },
  { username: 'sarah_m', location: 'Berkeley, CA', actionsCompleted: 13, isFriend: true },
  { username: 'green_thumb', location: 'Oakland, CA', actionsCompleted: 8, isFriend: false },
  { username: 'neighbor_ned', location: 'Oakland, CA', actionsCompleted: 8, isFriend: false },
  { username: 'budget_watcher', location: 'Oakland, CA', actionsCompleted: 8, isFriend: false },
  { username: 'activist_amy', location: 'Berkeley, CA', actionsCompleted: 12, isFriend: false },
  { username: 'vote_ready', location: 'Oakland, CA', actionsCompleted: 10, isFriend: false },
];

interface AddFriendsProps {
  onClose: () => void;
}

export function AddFriends({ onClose }: AddFriendsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState<Set<string>>(
    new Set(mockUsers.filter(u => u.isFriend).map(u => u.username))
  );
  const [pendingRequests, setPendingRequests] = useState<Set<string>>(new Set());

  const filteredUsers = mockUsers.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddFriend = (username: string) => {
    setPendingRequests(prev => new Set([...prev, username]));
    setTimeout(() => {
      setFriends(prev => new Set([...prev, username]));
      setPendingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(username);
        return newSet;
      });
    }, 1500);
  };

  const handleRemoveFriend = (username: string) => {
    setFriends(prev => {
      const newSet = new Set(prev);
      newSet.delete(username);
      return newSet;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center p-4">
      <div className="bg-[#FBF6F2] rounded-[14px] border border-gray-300 max-w-md w-full max-h-[85vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-['Inria_Serif',serif] font-bold text-[20px] text-[#1e1e1e]">
              Connect with friends!
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <p className="font-['Hind_Mysuru',sans-serif] text-[13px] text-gray-600">
            Find and connect with other civic participants
          </p>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by username or location..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#F99257] focus:border-transparent"
            />
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="px-4 py-3 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <p className="font-['Hind_Mysuru',sans-serif] font-medium text-[12px] text-gray-600">
              Your Network
            </p>
            <p className="font-['Inria_Serif',serif] font-bold text-[12px] text-[#F99257]">
              {friends.size} friends
            </p>
          </div>
          <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-[#F99257] rounded-full transition-all duration-500"
              style={{ width: `${Math.min((friends.size / 10) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* User List */}
        <div className="overflow-y-auto max-h-[400px]">
          {filteredUsers.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredUsers.map((user) => {
                const isFriend = friends.has(user.username);
                const isPending = pendingRequests.has(user.username);

                return (
                  <div
                    key={user.username}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={imgProfilePic}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-['Inria_Serif',serif] font-bold text-[14px] text-gray-900 truncate">
                          {user.username}
                        </p>
                        <p className="font-['Hind_Mysuru',sans-serif] text-[12px] text-gray-500 truncate">
                          {user.location}
                        </p>
                        <p className="font-['Hind_Mysuru',sans-serif] text-[11px] text-[#F99257]">
                          {user.actionsCompleted} actions completed
                        </p>
                      </div>
                      <div>
                        {isFriend ? (
                          <button
                            onClick={() => handleRemoveFriend(user.username)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-[12px] font-['Hind_Mysuru',sans-serif] font-medium hover:bg-gray-300 transition-colors flex items-center gap-1"
                          >
                            <Check size={14} />
                            Friends
                          </button>
                        ) : isPending ? (
                          <button
                            disabled
                            className="px-4 py-2 bg-gray-100 text-gray-400 rounded-full text-[12px] font-['Hind_Mysuru',sans-serif] font-medium flex items-center gap-1"
                          >
                            <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                            Pending
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddFriend(user.username)}
                            className="px-4 py-2 bg-[#F99257] text-white rounded-full text-[12px] font-['Hind_Mysuru',sans-serif] font-medium hover:bg-[#E67A3E] transition-colors flex items-center gap-1"
                          >
                            <UserPlus size={14} />
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500 text-[14px]">No users found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#F99257] text-white rounded-full font-['Inria_Serif',serif] font-bold text-[14px] hover:bg-[#E67A3E] transition-colors"
          >
            Done!
          </button>
        </div>
      </div>
    </div>
  );
}
