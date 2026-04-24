import { useState, useEffect } from 'react';
import { EventCard, CivicEvent } from './components/EventCard';
import { EventDetail } from './components/EventDetail';
import { ActivityRecap } from './components/ActivityRecap';
import { AddFriends } from './components/AddFriends';
import { Preferences } from './components/Preferences';
import { BottomNav } from './components/BottomNav';
import { SearchBar } from './components/SearchBar';
import imgProfilePic from "../imports/local-loop-logo.png";
import { UserPlus, Settings, ChevronDown } from 'lucide-react';
 
// Map our scraped JSON format to CivicEvent shape
function mapToEvent(title: string, values: any[], index: number): CivicEvent {
  const [source, , url, start_time, location, description] = values;
  return {
    id: index,
    title: title,
    description: description || 'See event link for more details.',
    date: start_time ? start_time.split(' ')[0] : 'TBD',
    time: start_time ? start_time.split(' ')[1] + ' ' + (start_time.split(' ')[2] || '') : 'TBD',
    location: location || 'See event link for location',
    distance: '—',
    duration: '—',
    effortRating: 2,
    attendees: [],
    attendeeCount: 0,
    category: source?.includes('change') ? 'Petition' : 'Local Government',
    tags: [],
  };
}
 
export default function App() {
  const [events, setEvents] = useState<CivicEvent[]>([]);
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<CivicEvent | null>(null);
  const [rsvpdEvents, setRsvpdEvents] = useState<Set<number>>(new Set());
  const [showAddFriends, setShowAddFriends] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Oakland');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
 
  useEffect(() => {
    const file = selectedCity === 'Berkeley' ? '/berkactions.json' : '/oakactions.json';
    fetch(file)
      .then(res => res.json())
      .then(data => {
        const mapped = Object.entries(data).map(([title, values], index) =>
          mapToEvent(title, values as any[], index)
        );
        setEvents(mapped);
      });
  }, [selectedCity]);
 
  const filteredEvents = events.filter(event =>
    searchQuery === '' ||
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
  const petitions = filteredEvents.filter(e => e.category === 'Petition');
  const meetings = filteredEvents.filter(e => e.category === 'Local Government');
 
  const handleEventClick = (event: CivicEvent) => setSelectedEvent(event);
  const handleCloseDetail = () => setSelectedEvent(null);
  const handleRSVP = (eventId: number) => {
    setRsvpdEvents(prev => {
      const newSet = new Set(prev);
      newSet.has(eventId) ? newSet.delete(eventId) : newSet.add(eventId);
      return newSet;
    });
  };
 
  const rsvpdEventsList = events.filter(event => rsvpdEvents.has(event.id));
 
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="flex-1 overflow-y-auto pb-20">
            <div className="bg-[#F99257] pb-4 shadow-lg">
              <div className="px-4 pt-6 pb-3 relative">
                {/* City Selector */}
                <div className="absolute top-4 right-4 z-20">
                  <button
                    onClick={() => setShowCityDropdown(!showCityDropdown)}
                    className="flex items-center gap-2 rounded-full px-4 py-2 bg-white bg-opacity-20 text-white"
                  >
                    <span className="font-['Hind_Mysuru',sans-serif] text-[14px] font-medium">
                      {selectedCity}
                    </span>
                    <ChevronDown size={16} className={`transition-transform ${showCityDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {showCityDropdown && (
                    <div className="absolute top-full right-0 mt-2 bg-[#FBF6F2] rounded-lg shadow-lg overflow-hidden min-w-[140px]">
                      {['Oakland', 'Berkeley'].map(city => (
                        <button
                          key={city}
                          onClick={() => { setSelectedCity(city); setShowCityDropdown(false); }}
                          className={`w-full text-left px-4 py-3 font-['Hind_Mysuru',sans-serif] text-[14px] ${
                            selectedCity === city ? 'bg-[#FFCCB3] font-semibold' : 'hover:bg-orange-50'
                          } text-gray-800`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
 
                {/* Logo */}
                <div className="flex items-center gap-4 mb-3 mt-6">
                  <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-white flex items-center justify-center overflow-hidden">
                    <img src={imgProfilePic} alt="Local Loop Logo" className="w-20 h-20 object-contain" />
                  </div>
                  <div>
                    <h1 className="font-['Inria_Serif',serif] text-[36px] text-white leading-tight font-bold">
                      Local Loop
                    </h1>
                    <p className="font-['Hind_Mysuru',sans-serif] text-[14px] text-white opacity-95 mt-1">
                      Your City. Your Issues. Your Loop.
                    </p>
                  </div>
                </div>
              </div>
            </div>
 
            <div className="space-y-6 mt-4">
              {/* Meetings */}
              {meetings.length > 0 && (
                <div>
                  <div className="px-4 mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1 h-6 bg-[#F99257] rounded-full" />
                      <h2 className="font-['Inria_Serif',serif] text-[20px] text-gray-900 font-bold">
                        Upcoming Meetings
                      </h2>
                    </div>
                  </div>
                  <div className="px-4 space-y-3">
                    {meetings.map(event => (
                      <EventCard key={event.id} event={event} onClick={() => handleEventClick(event)} />
                    ))}
                  </div>
                </div>
              )}
 
              {/* Petitions */}
              {petitions.length > 0 && (
                <div>
                  <div className="px-4 mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1 h-6 bg-[#F99257] rounded-full" />
                      <h2 className="font-['Inria_Serif',serif] text-[20px] text-gray-900 font-bold">
                        Active Petitions
                      </h2>
                    </div>
                  </div>
                  <div className="px-4 space-y-3">
                    {petitions.map(event => (
                      <EventCard key={event.id} event={event} onClick={() => handleEventClick(event)} />
                    ))}
                  </div>
                </div>
              )}
 
              {filteredEvents.length === 0 && (
                <div className="text-center py-12 px-4">
                  <p className="text-gray-500">No events found</p>
                </div>
              )}
            </div>
          </div>
        );
 
      case 'search':
        return (
          <div className="flex-1 overflow-y-auto pb-20">
            <div className="bg-[#FBF6F2] pb-4 shadow-sm">
              <div className="px-4 pt-4">
                <h1 className="font-['Inria_Serif',serif] text-[24px] mb-4 font-bold">Search Events</h1>
                <SearchBar onSearch={setSearchQuery} />
              </div>
            </div>
            <div className="px-4 space-y-3 mt-4">
              <p className="font-['Hind_Mysuru',sans-serif] text-[12px] text-gray-600">
                {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
              </p>
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} onClick={() => handleEventClick(event)} />
              ))}
            </div>
          </div>
        );
 
      case 'calendar':
        return (
          <div className="flex-1 overflow-y-auto pb-20">
            <div className="px-4 pt-4">
              <h1 className="font-['Inria_Serif',serif] text-[24px] mb-4 font-bold">My Calendar</h1>
              {rsvpdEventsList.length > 0 ? (
                <div className="space-y-3">
                  {rsvpdEventsList.map(event => (
                    <EventCard key={event.id} event={event} onClick={() => handleEventClick(event)} />
                  ))}
                </div>
              ) : (
                <div className="bg-[#FFF0E6] rounded-lg p-6 text-center">
                  <p className="font-['Hind_Mysuru',sans-serif] text-gray-600 mb-2">Your saved events will appear here</p>
                  <p className="font-['Hind_Mysuru',sans-serif] text-[12px] text-gray-500">
                    Tap on events to RSVP and add them to your calendar
                  </p>
                </div>
              )}
            </div>
          </div>
        );
 
      case 'activity':
        return <ActivityRecap />;
 
      case 'profile':
        return (
          <div className="flex-1 overflow-y-auto pb-20">
            <div className="bg-[#F99257] px-4 pt-6 pb-8 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-white flex items-center justify-center overflow-hidden">
                  <img src={imgProfilePic} alt="Local Loop Logo" className="w-20 h-20 object-contain" />
                </div>
                <div>
                  <h1 className="font-['Inria_Serif',serif] text-[36px] text-white leading-tight font-bold">Local Loop</h1>
                  <p className="font-['Hind_Mysuru',sans-serif] text-[14px] text-white opacity-95 mt-1">Your City. Your Issues. Your Loop.</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white border-opacity-20">
                <h2 className="font-['Inria_Serif',serif] text-[22px] text-white font-semibold">Allie</h2>
                <p className="font-['Hind_Mysuru',sans-serif] text-[14px] text-white opacity-90">{selectedCity}, CA</p>
              </div>
            </div>
            <div className="px-4 space-y-4">
              <button onClick={() => setShowAddFriends(true)} className="w-full bg-[#F99257] text-white rounded-xl p-4 flex items-center justify-between hover:shadow-lg transition-shadow">
                <div className="text-left">
                  <p className="font-['Inria_Serif',serif] font-bold text-[18px] mb-1">Connect with Friends!</p>
                  <p className="font-['Hind_Mysuru',sans-serif] text-[12px] opacity-95">Find and add civic participants</p>
                </div>
                <UserPlus size={28} />
              </button>
              <button onClick={() => setShowPreferences(true)} className="w-full bg-[#FBF6F2] border-2 border-[#F99257] text-[#F99257] rounded-xl p-4 flex items-center justify-between hover:bg-orange-50 transition-colors">
                <div className="text-left">
                  <p className="font-['Inria_Serif',serif] font-bold text-[18px] mb-1">Edit Preferences</p>
                  <p className="font-['Hind_Mysuru',sans-serif] text-[12px] opacity-75">Update your interests and settings</p>
                </div>
                <Settings size={28} />
              </button>
            </div>
          </div>
        );
 
      default:
        return null;
    }
  };
 
  return (
    <div className="size-full flex flex-col bg-[#FBF6F2] max-w-md mx-auto">
      {selectedEvent ? (
        <EventDetail event={selectedEvent} onClose={handleCloseDetail} onRSVP={handleRSVP} isRSVPd={rsvpdEvents.has(selectedEvent.id)} />
      ) : (
        <>
          {renderContent()}
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </>
      )}
      {showAddFriends && <AddFriends onClose={() => setShowAddFriends(false)} />}
      {showPreferences && <Preferences onClose={() => setShowPreferences(false)} />}
    </div>
  );
}