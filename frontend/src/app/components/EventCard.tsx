import { MapPin, Clock } from 'lucide-react';
import imgProfilePic from "figma:asset/ddd0b4eca52d033edaca02267dc23dd631c3e64d.png";

export interface CivicEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  distance: string;
  duration: string;
  effortRating: number;
  attendees: string[];
  attendeeCount: number;
  category: string;
  tags: string[];
}

interface EventCardProps {
  event: CivicEvent;
  onClick?: () => void;
}

const myFriends = ['foodiefred', 'civic_jen', 'sarah_m', 'green_thumb', 'neighbor_ned'];

export function EventCard({ event, onClick }: EventCardProps) {
  const friendsAttending = event.attendees.filter(a => myFriends.includes(a));
  const maxFriendsToShow = 3;

  return (
    <div
      className="bg-[#FBF6F2] border-2 border-[#F99257] border-opacity-20 rounded-xl p-5 mb-4 cursor-pointer hover:shadow-lg hover:border-opacity-40 transition-all"
      onClick={onClick}
    >
      <h3 className="font-['Inria_Serif',serif] text-[18px] mb-3 leading-tight text-gray-900 font-semibold">
        {event.title}
      </h3>

      <div className="flex items-center gap-4 mb-3 text-[13px] text-gray-700">
        <div className="flex items-center gap-1.5">
          <MapPin size={16} className="text-[#F99257]" />
          <span className="font-['Hind_Mysuru',sans-serif]">{event.distance}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={16} className="text-[#F99257]" />
          <span className="font-['Hind_Mysuru',sans-serif]">{event.duration}</span>
        </div>
      </div>

      <p className="font-['Hind_Mysuru',sans-serif] text-[13px] text-gray-700 mb-1">
        {event.date} • {event.time}
      </p>

      {/* Effort Rating Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-['Hind_Mysuru',sans-serif] text-[12px] text-gray-600">
            Effort Level
          </span>
          <span className="font-['Inria_Serif',serif] font-bold text-[12px] text-[#F99257]">
            {event.effortRating}/5
          </span>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`h-2 flex-1 rounded-full transition-all ${
                level <= event.effortRating
                  ? 'bg-[#F99257]'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Friends Attending */}
      {friendsAttending.length > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {friendsAttending.slice(0, maxFriendsToShow).map((friend, index) => (
              <img
                key={friend}
                src={imgProfilePic}
                alt={friend}
                className="w-8 h-8 rounded-full border-2 border-[#FBF6F2] object-cover"
                style={{ zIndex: maxFriendsToShow - index }}
              />
            ))}
            {friendsAttending.length > maxFriendsToShow && (
              <div
                className="w-8 h-8 rounded-full border-2 border-[#FBF6F2] bg-[#F99257] flex items-center justify-center"
                style={{ zIndex: 0 }}
              >
                <span className="text-white text-[10px] font-bold">
                  +{friendsAttending.length - maxFriendsToShow}
                </span>
              </div>
            )}
          </div>
          <p className="font-['Hind_Mysuru',sans-serif] text-[12px] text-[#F99257] font-medium">
            {friendsAttending.length === 1
              ? `${friendsAttending[0]} is attending`
              : `${friendsAttending[0]} and ${friendsAttending.length - 1} other${friendsAttending.length > 2 ? 's' : ''} attending`
            }
          </p>
        </div>
      )}

      {/* When no friends attending */}
      {friendsAttending.length === 0 && (
        <div className="flex items-center gap-2 opacity-60">
          <div className="flex -space-x-2">
            {event.attendees.slice(0, 2).map((attendee, index) => (
              <div
                key={attendee}
                className="w-8 h-8 rounded-full border-2 border-[#FBF6F2] bg-gray-300 flex items-center justify-center"
                style={{ zIndex: 2 - index }}
              >
                <span className="text-gray-600 text-[10px] font-bold uppercase">
                  {attendee.slice(0, 2)}
                </span>
              </div>
            ))}
          </div>
          <p className="font-['Hind_Mysuru',sans-serif] text-[12px] text-gray-600">
            {event.attendeeCount} {event.attendeeCount === 1 ? 'person' : 'people'} attending
          </p>
        </div>
      )}
    </div>
  );
}
