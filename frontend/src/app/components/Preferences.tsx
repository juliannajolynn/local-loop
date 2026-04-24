import { X, Check } from 'lucide-react';
import { useState } from 'react';
import svgPaths from "../../imports/svg-0zxyqrbfdw";

interface PreferencesProps {
  onClose: () => void;
}

const topics = [
  'Healthcare',
  'Civil Rights & Liberties',
  'Environment & Climate',
  'Education',
  'Immigration',
  'Housing & Homelessness',
  'Foreign Policy',
  'Technology & Privacy',
  'Public Safety & Criminal Justice',
  'Local Government & Civic Engagement',
  'Economy & Jobs',
];

const taskTypes = [
  'Going to a city council meeting',
  'Signing a petition',
  'Attending a protest',
  'Volunteer work',
  'Writing to representatives',
];

export function Preferences({ onClose }: PreferencesProps) {
  const [step, setStep] = useState(1);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['Healthcare', 'Environment & Climate', 'Housing & Homelessness']);
  const [selectedTasks, setSelectedTasks] = useState<string[]>(['Signing a petition']);
  const [effortLevel, setEffortLevel] = useState(3);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleTaskToggle = (task: string) => {
    setSelectedTasks(prev =>
      prev.includes(task)
        ? prev.filter(t => t !== task)
        : [...prev, task]
    );
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="bg-[#FBF6F2] rounded-[14px] border border-gray-300 max-w-md w-full shadow-2xl">
          {/* Close Button */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              className="p-2 bg-[#FBF6F2] rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Header */}
          <div className="bg-[#F99257] h-[200px] rounded-t-[14px] flex flex-col items-center justify-center text-white px-6">
            <h1 className="font-['Inria_Serif',serif] text-[30px] text-center mb-2 font-bold">
              {step === 1 && 'Select your interests'}
              {step === 2 && 'Choose your activities'}
              {step === 3 && 'Set your effort level'}
            </h1>
            <p className="font-['Hind_Mysuru',sans-serif] text-[16px] text-center opacity-95">
              {step === 1 && 'Choose the topics you care about'}
              {step === 2 && 'What types of civic actions interest you?'}
              {step === 3 && 'How much time can you commit weekly?'}
            </p>
          </div>

          {/* Content */}
          <div className="p-6 min-h-[400px]">
            {step === 1 && (
              <div>
                <p className="font-['Hind_Mysuru',sans-serif] text-[12px] text-gray-600 mb-4">
                  Select all that apply
                </p>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => handleTopicToggle(topic)}
                      className={`px-4 py-2.5 rounded-full text-[14px] font-medium transition-colors font-['Pavanam',sans-serif] ${
                        selectedTopics.includes(topic)
                          ? 'bg-[#F99257] text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <p className="font-['Hind_Mysuru',sans-serif] text-[12px] text-gray-600 mb-4">
                  Choose your preferred activities
                </p>
                <div className="space-y-3">
                  {taskTypes.map((task) => (
                    <button
                      key={task}
                      onClick={() => handleTaskToggle(task)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        {selectedTasks.includes(task) ? (
                          <div className="w-5 h-5 bg-[#F99257] rounded-sm flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 12 9.4">
                              <path d={svgPaths.p35d39780} fill="white" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-400 rounded-sm" />
                        )}
                      </div>
                      <span className="font-['Hind_Mysuru',sans-serif] text-[14px] text-left font-medium">
                        {task}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <p className="font-['Hind_Mysuru',sans-serif] text-[12px] text-gray-600 mb-4">
                  On a weekly basis
                </p>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-['Hind_Mysuru',sans-serif] text-[14px] font-medium">
                        Effort Level
                      </span>
                      <span className="font-['Inria_Serif',serif] text-[16px] text-[#F99257] font-bold">
                        {effortLevel}/5
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={effortLevel}
                      onChange={(e) => setEffortLevel(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#F99257]"
                      style={{
                        background: `linear-gradient(to right, #F99257 0%, #F99257 ${(effortLevel - 1) * 25}%, #e5e7eb ${(effortLevel - 1) * 25}%, #e5e7eb 100%)`
                      }}
                    />
                  </div>

                  <div className="bg-orange-50 border border-[#F99257] border-opacity-20 rounded-lg p-4">
                    <p className="font-['Inria_Serif',serif] text-[14px] mb-2 font-bold">
                      What this means:
                    </p>
                    <p className="font-['Hind_Mysuru',sans-serif] text-[13px] text-gray-700">
                      {effortLevel === 1 && 'Very Low - Quick tasks, minimal time commitment (15-30 min/week)'}
                      {effortLevel === 2 && 'Low - Short activities, mostly observing (30-60 min/week)'}
                      {effortLevel === 3 && 'Moderate - Active participation required (1-2 hours/week)'}
                      {effortLevel === 4 && 'High - Significant time and engagement (2-4 hours/week)'}
                      {effortLevel === 5 && 'Very High - Deep commitment and preparation (4+ hours/week)'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200">
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F99257] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className={`px-6 py-2 rounded-full font-['Inria_Serif',serif] font-bold text-[14px] transition-colors ${
                  step === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-[#F99257] hover:bg-orange-50'
                }`}
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-8 py-2 bg-[#F99257] text-white rounded-full font-['Inria_Serif',serif] font-bold text-[14px] hover:bg-[#E67A3E] transition-colors"
              >
                {step === totalSteps ? 'Done' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
