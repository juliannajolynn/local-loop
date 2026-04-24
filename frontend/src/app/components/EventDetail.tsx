import { ArrowLeft, Info, Share2, Check, X } from 'lucide-react';
import { CivicEvent } from './EventCard';
import { useState } from 'react';
import imgEventImage from "figma:asset/73bf7531b6811b47ea9f37977c5b9a4c37003806.png";
import imgProfilePic from "figma:asset/ddd0b4eca52d033edaca02267dc23dd631c3e64d.png";

interface EventDetailProps {
  event: CivicEvent;
  onClose: () => void;
  onRSVP: (eventId: number) => void;
  isRSVPd: boolean;
}

export function EventDetail({ event, onClose, onRSVP, isRSVPd }: EventDetailProps) {
  const [showInfo, setShowInfo] = useState(false);

  const handleRSVP = () => {
    onRSVP(event.id);
  };

  const handleShare = () => {
    alert("Share this event with friends!");
  };

  const myFriends = ['foodiefred', 'civic_jen', 'sarah_m', 'green_thumb', 'neighbor_ned'];
  const friendsAttending = event.attendees.filter(a => myFriends.includes(a));

  const effortDescriptions: Record<number, string> = {
    1: "Very Low - Quick and easy participation",
    2: "Low - Minimal time commitment",
    3: "Moderate - Some active participation required",
    4: "High - Significant time and engagement",
    5: "Very High - Intense commitment required"
  };

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 flex items-start justify-center overflow-y-auto">
      <div className="bg-[#FBF6F2] max-w-md w-full min-h-full relative pb-32">
        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={onClose}
            className="p-2 bg-[#FBF6F2] rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        </div>

        {/* Title */}
        <h1 className="font-['Inria_Serif',serif] text-[36px] text-center px-4 pt-7 pb-4 leading-tight font-bold">
          {event.title}
        </h1>

        {/* Event Image */}
        <div className="px-5 mb-4">
          <img
            src={imgEventImage}
            alt={event.title}
            className="w-full h-[178px] object-cover rounded-lg"
          />
        </div>

        {/* From Your Loop Section */}
        <div className="px-6 mb-4">
          <div className="inline-block bg-orange-100 rounded-full px-3 py-1 mb-3">
            <p className="font-['Hind_Mysuru',sans-serif] text-[13px] font-bold text-[#F99257]">
              FROM YOUR LOOP:
            </p>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="flex -space-x-3">
              {friendsAttending.slice(0, 3).map((friend) => (
                <img
                  key={friend}
                  src={imgProfilePic}
                  alt={friend}
                  className="w-12 h-12 rounded-full border-2 border-[#FBF6F2] object-cover"
                />
              ))}
            </div>

            <button className="border-2 border-[#F99257] rounded-full px-4 py-1 hover:bg-orange-50 transition-colors">
              <p className="font-['Hind_Mysuru',sans-serif] text-[13px] font-medium text-[#F99257]">
                View All
              </p>
            </button>
          </div>

          <p className="font-['Hind_Mysuru',sans-serif] text-[13px] text-gray-700">
            <span className="font-bold text-[#F99257]">
              {friendsAttending[0] || event.attendees[0]}
            </span>
            {friendsAttending.length > 1 || event.attendeeCount > 1 ? (
              <>
                {' '}and {friendsAttending.length > 1 ? friendsAttending.length - 1 : event.attendeeCount - 1} other
                {friendsAttending.length > 2 || event.attendeeCount > 2 ? 's' : ''} attending
              </>
            ) : (
              ' attending'
            )}
          </p>
        </div>

        {/* Effort Rating Section */}
        <div className="bg-gray-100 py-4 px-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="inline-block bg-orange-100 rounded-full px-3 py-1">
              <p className="font-['Hind_Mysuru',sans-serif] text-[13px] font-bold text-[#F99257]">
                EFFORT RATING:
              </p>
            </div>
            <p className="font-['Inria_Serif',serif] text-[18px] font-bold text-[#F99257]">
              {event.effortRating}/5
            </p>
          </div>

          {/* Effort Bars */}
          <div className="flex gap-[9px] mb-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`h-[3px] flex-1 rounded-full ${
                  level <= event.effortRating ? 'bg-[#F99257]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <p className="font-['Hind_Mysuru',sans-serif] text-[10px] text-gray-600">
            {effortDescriptions[event.effortRating]}
          </p>
        </div>

        {/* About This Event Section */}
        <div className="px-6 mb-6">
          <p className="font-['Inria_Serif',serif] text-[14px] font-bold mb-3">
            About This Event
          </p>
          <p className="font-['Hind_Mysuru',sans-serif] text-[13px] text-gray-700 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Event Details */}
        <div className="px-6 space-y-4">
          <div>
            <p className="font-['Hind_Mysuru',sans-serif] text-[13px] font-bold text-[#F99257] mb-1">
              Date & Time
            </p>
            <p className="font-['Hind_Mysuru',sans-serif] text-[13px]">
              {event.date}
            </p>
            <p className="font-['Hind_Mysuru',sans-serif] text-[13px]">
              {event.time}
            </p>
          </div>

          <div>
            <p className="font-['Hind_Mysuru',sans-serif] text-[13px] font-bold text-[#F99257] mb-1">
              Location
            </p>
            <p className="font-['Hind_Mysuru',sans-serif] text-[13px]">
              {event.location}
            </p>
            <p className="font-['Hind_Mysuru',sans-serif] text-[12px] text-gray-600">
              {event.distance} away
            </p>
          </div>

          <div>
            <p className="font-['Hind_Mysuru',sans-serif] text-[13px] font-bold text-[#F99257] mb-1">
              Duration
            </p>
            <p className="font-['Hind_Mysuru',sans-serif] text-[13px]">
              {event.duration}
            </p>
          </div>

          {/* Good to Know Section */}
          <div className="bg-orange-50 rounded-lg p-4 mt-6 border border-[#F99257] border-opacity-20">
            <p className="font-['Inria_Serif',serif] text-[14px] font-bold mb-3">
              Good to Know
            </p>
            <ul className="text-[13px] text-gray-700 space-y-2 list-disc list-inside font-['Hind_Mysuru',sans-serif]">
              <li>Free and open to the public</li>
              <li>Arrive 10 minutes early to check in</li>
              <li>Bring questions for the Q&A session</li>
            </ul>
          </div>

          {showInfo && (
            <div className="bg-gray-50 rounded-lg p-4 mt-4 border border-gray-200">
              <p className="font-['Inria_Serif',serif] text-[14px] font-bold mb-2">
                Additional Information
              </p>
              <div className="space-y-3 text-[13px] text-gray-700">
                <div>
                  <p className="font-['Hind_Mysuru',sans-serif] font-semibold mb-1">Category</p>
                  <p className="font-['Hind_Mysuru',sans-serif]">{event.category}</p>
                </div>
                <div>
                  <p className="font-['Hind_Mysuru',sans-serif] font-semibold mb-1">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#F99257] text-white px-3 py-1 rounded-full text-[11px] font-['Pavanam',sans-serif]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating Bottom Action Buttons */}
        <div className="fixed bottom-6 left-0 right-0 z-20 pointer-events-none">
          <div className="flex justify-center gap-16 max-w-md mx-auto pointer-events-auto">
            {/* GOING Button */}
            <button
              onClick={handleRSVP}
              className="flex flex-col items-center gap-2 drop-shadow-lg"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                isRSVPd ? 'bg-[#F99257]' : 'bg-gray-400'
              }`}>
                {isRSVPd ? (
                  <Check size={28} className="text-white" />
                ) : (
                  <X size={28} className="text-white" />
                )}
              </div>
              <p className="font-['Hind_Mysuru',sans-serif] text-[11px] bg-[#FBF6F2] text-gray-800 px-2 py-1 rounded shadow-md font-medium">
                {isRSVPd ? 'GOING' : 'GOING?'}
              </p>
            </button>

            {/* SHARE Button */}
            <button
              onClick={handleShare}
              className="flex flex-col items-center gap-2 drop-shadow-lg"
            >
              <div className="w-14 h-14 rounded-full bg-[#F99257] flex items-center justify-center shadow-lg hover:bg-[#E67A3E] transition-colors">
                <Share2 size={24} className="text-white" />
              </div>
              <p className="font-['Hind_Mysuru',sans-serif] text-[11px] bg-[#FBF6F2] text-gray-800 px-2 py-1 rounded shadow-md font-medium">
                SHARE
              </p>
            </button>

            {/* INFO Button */}
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="flex flex-col items-center gap-2 drop-shadow-lg"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                showInfo ? 'bg-[#F99257]' : 'bg-orange-100'
              }`}>
                <Info size={24} className={showInfo ? 'text-white' : 'text-[#F99257]'} />
              </div>
              <p className="font-['Hind_Mysuru',sans-serif] text-[11px] bg-[#FBF6F2] text-gray-800 px-2 py-1 rounded shadow-md font-medium">
                INFO
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
