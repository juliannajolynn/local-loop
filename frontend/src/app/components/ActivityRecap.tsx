import { Share2, Award, MapPin, Calendar, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import imgProfilePic from "figma:asset/ddd0b4eca52d033edaca02267dc23dd631c3e64d.png";
import svgPaths from "../../imports/svg-0b5z27xn29";

interface CompletedAction {
  id: number;
  title: string;
  date: string;
  location: string;
  isOnline: boolean;
  coordinates: { x: number; y: number };
  type: 'event' | 'petition' | 'comment';
}

const mockCompletedActions: CompletedAction[] = [
  {
    id: 1,
    title: "Attended city council meeting - zoning vote",
    date: "March 18",
    location: "Berkeley City Hall",
    isOnline: false,
    coordinates: { x: 120, y: 276 },
    type: 'event'
  },
  {
    id: 2,
    title: "Submitted public comment on school budget",
    date: "March 7",
    location: "Online",
    isOnline: true,
    coordinates: { x: 228, y: 314 },
    type: 'comment'
  },
  {
    id: 3,
    title: "Signed petition on city water bill",
    date: "March 4",
    location: "Online",
    isOnline: true,
    coordinates: { x: 319, y: 296 },
    type: 'petition'
  },
  {
    id: 4,
    title: "Community garden cleanup volunteer",
    date: "March 22",
    location: "Fruitvale Garden",
    isOnline: false,
    coordinates: { x: 42, y: 347 },
    type: 'event'
  }
];

interface Badge {
  name: string;
  color: string;
  textColor: string;
}

const badges: Badge[] = [
  { name: "First voter", color: "#c7dfff", textColor: "#0950f5" },
  { name: "3-month streak", color: "#ffe1c7", textColor: "#ac5f00" },
  { name: "Petitioner", color: "#e5ffc7", textColor: "#008214" }
];

export function ActivityRecap() {
  const [selectedMonth, setSelectedMonth] = useState("March 2026");

  const stats = {
    actions: 7,
    events: 4,
    ranking: 12,
    streak: 4
  };

  const handleShare = () => {
    alert("Share your civic impact recap with friends!");
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-[#FBF6F2]">
      {/* Header Section */}
      <div className="bg-[#F99257] px-6 pt-6 pb-4 relative overflow-hidden">
        {/* Profile Picture in corner */}
        <div className="absolute right-0 top-4">
          <img
            src={imgProfilePic}
            alt="Profile"
            className="w-32 h-32 object-cover opacity-30"
          />
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="relative">
            <svg className="w-11 h-11" fill="none" preserveAspectRatio="none" viewBox="0 0 45 45">
              <path d={svgPaths.p353c9a00} fill="#FFB380" />
            </svg>
            <p className="absolute inset-0 flex items-center justify-center font-extrabold text-[#A83C00] text-[20px]">
              AR
            </p>
          </div>
          <div>
            <p className="font-['Inria_Serif',serif] font-bold text-white text-[20px] leading-tight">
              Allie Rivera
            </p>
            <p className="font-['Hind_Mysuru',sans-serif] text-white text-[14px] opacity-90">
              Oakland, CA | District 4
            </p>
          </div>
        </div>

        {/* Monthly Recap Title */}
        <div className="relative z-10">
          <p className="font-['Hind_Mysuru',sans-serif] font-medium text-white text-[14px] tracking-[1.4px] mb-1 opacity-90">
            MONTHLY RECAP
          </p>
          <p className="font-['Inria_Serif',serif] font-black text-white text-[32px] leading-tight">
            {selectedMonth}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#E67A3E] px-6 py-5">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="font-['Inria_Serif',serif] font-extrabold text-white text-[32px] leading-tight">
              {stats.actions}
            </p>
            <p className="font-['Hind_Mysuru',sans-serif] font-medium text-white text-[14px]">
              Actions
            </p>
          </div>
          <div>
            <p className="font-['Inria_Serif',serif] font-extrabold text-white text-[32px] leading-tight">
              {stats.events}
            </p>
            <p className="font-['Hind_Mysuru',sans-serif] font-medium text-white text-[14px]">
              Events
            </p>
          </div>
          <div>
            <p className="font-['Inria_Serif',serif] font-extrabold text-white text-[32px] leading-tight">
              #{stats.ranking}
            </p>
            <p className="font-['Hind_Mysuru',sans-serif] font-medium text-white text-[14px]">
              In District
            </p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-[#FFF0E6] px-6 py-8 relative" style={{ minHeight: '200px' }}>
        {/* Map Visualization */}
        <div className="relative w-full h-[140px] mb-4">
          {/* Route line */}
          <div className="absolute" style={{ left: '48px', top: '40px', width: '280px', height: '112px' }}>
            <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 284 94">
              <g filter="url(#filter0_d_7_89)">
                <path d={svgPaths.p3a19200} stroke="#F99257" strokeLinecap="round" strokeWidth="4" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="94" id="filter0_d_7_89" width="284" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_7_89" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_7_89" mode="normal" result="shape" />
                </filter>
              </defs>
            </svg>
          </div>

          {/* Location pins */}
          {mockCompletedActions.filter(a => !a.isOnline).map((action, index) => (
            <div
              key={action.id}
              className="absolute transition-transform hover:scale-110"
              style={{
                left: `${action.coordinates.x}px`,
                top: `${action.coordinates.y - 135}px`
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="9.5" fill="#FFB380" stroke="white" />
              </svg>
              {index === 0 && (
                <p className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-['Hind_Mysuru',sans-serif] font-medium text-[#F99257] text-[12px]">
                  City Hall
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Actions List */}
      <div className="px-4 py-4">
        <div className="space-y-3">
          {mockCompletedActions.map((action) => (
            <div key={action.id} className="border-b border-purple-200 pb-3 last:border-0">
              <div className="flex items-start gap-3">
                <div className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${
                  action.isOnline ? 'bg-[#FFB380]' : 'bg-[#FF8A50]'
                }`} />
                <div className="flex-1">
                  <p className="font-['Hind_Mysuru',sans-serif] font-semibold text-[#F99257] text-[14px] leading-tight mb-1">
                    {action.title}
                  </p>
                  <p className="font-['Hind_Mysuru',sans-serif] font-medium text-gray-600 text-[11px]">
                    {action.date} - {action.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="px-4 py-4 border-t border-purple-200">
        <div className="flex flex-wrap gap-2 mb-4">
          {badges.map((badge) => (
            <div
              key={badge.name}
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: badge.color }}
            >
              <p
                className="font-['Hind_Mysuru',sans-serif] font-semibold text-[12px]"
                style={{ color: badge.textColor }}
              >
                {badge.name}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <p className="font-['Hind_Mysuru',sans-serif] font-semibold text-[12px] text-gray-600">
            {stats.streak} month streak 🔥
          </p>
          <button
            onClick={handleShare}
            className="bg-[#FFDBCC] hover:bg-[#d0bcff] px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Share2 size={16} className="text-[#F99257]" />
            <p className="font-['Inria_Serif',serif] font-extrabold text-[#F99257] text-[15px]">
              Share Recap
            </p>
          </button>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="px-4 py-6 bg-[#FFF0E6]">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={20} className="text-[#F99257]" />
          <h3 className="font-['Inria_Serif',serif] font-bold text-[16px]">
            District 4 Leaderboard
          </h3>
        </div>

        <div className="bg-[#FBF6F2] rounded-lg overflow-hidden shadow-sm">
          {[
            { rank: 1, name: "civic_jen", actions: 15, streak: 6 },
            { rank: 2, name: "maria_g", actions: 13, streak: 5 },
            { rank: 11, name: "neighbor_ned", actions: 8, streak: 3 },
            { rank: 12, name: "You (Allie Rivera)", actions: 7, streak: 4, isYou: true },
            { rank: 13, name: "foodiefred", actions: 6, streak: 2 }
          ].map((entry) => (
            <div
              key={entry.rank}
              className={`flex items-center justify-between px-4 py-3 border-b last:border-0 ${
                entry.isYou ? 'bg-[#FFDBCC] font-bold' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`font-['Inria_Serif',serif] font-bold text-[16px] w-6 ${
                  entry.isYou ? 'text-[#F99257]' : 'text-gray-600'
                }`}>
                  #{entry.rank}
                </span>
                <span className={`text-[14px] ${entry.isYou ? 'text-[#F99257]' : ''}`}>
                  {entry.name}
                </span>
              </div>
              <div className="flex items-center gap-4 text-[12px] text-gray-600">
                <span>{entry.actions} actions</span>
                <span className="text-orange-600">{entry.streak}mo 🔥</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
