export default function ServicesSchedule() {
  const tabs = ["All", "Body Building", "Basic Yoga", "Weight Loss", "Cardio", "Boxing"];
  
  // Dummy schedule data mimicking the image
  const timeSlots = ["09:00", "12:00", "15:00", "18:00"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <section className="bg-[#111111] py-24 px-6 lg:px-12 border-b border-zinc-800">
      <div className="max-w-[1440px] mx-auto">
        
        <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-12 text-center">
          SCHEDULE
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              className={`px-6 py-3 font-bold text-xs uppercase tracking-wider transition-colors ${
                idx === 0 ? "bg-neon-green text-[#111111]" : "bg-[#1a1a1a] text-white hover:bg-zinc-800 border border-zinc-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Schedule Table Container */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px] bg-[#1a1a1a] p-8">
            {/* Header Row */}
            <div className="grid grid-cols-8 gap-4 mb-6 pb-6 border-b border-zinc-800 text-center">
              <div></div> {/* Empty corner */}
              {days.map(day => (
                <div key={day} className="text-white font-bold text-sm uppercase tracking-wider">{day}</div>
              ))}
            </div>

            {/* Time Rows */}
            {timeSlots.map((time, rowIdx) => (
              <div key={time} className={`grid grid-cols-8 gap-4 py-6 ${rowIdx !== timeSlots.length - 1 ? 'border-b border-zinc-800/50' : ''}`}>
                <div className="text-white font-bold text-lg flex items-center justify-center">{time}</div>
                
                {/* Dummy classes for each day - Hardcoded to match visually */}
                <div className="text-center flex flex-col justify-center">
                  <span className="text-neon-green font-black italic uppercase text-sm mb-1">Body Build</span>
                  <span className="text-gray-500 text-xs">John Doe</span>
                </div>
                <div className="text-center flex flex-col justify-center"></div>
                <div className="text-center flex flex-col justify-center">
                  <span className="text-blue-400 font-black italic uppercase text-sm mb-1">Basic Yoga</span>
                  <span className="text-gray-500 text-xs">Jane Smith</span>
                </div>
                <div className="text-center flex flex-col justify-center">
                  <span className="text-yellow-400 font-black italic uppercase text-sm mb-1">Cardio</span>
                  <span className="text-gray-500 text-xs">Mike Joy</span>
                </div>
                <div className="text-center flex flex-col justify-center">
                  <span className="text-neon-green font-black italic uppercase text-sm mb-1">Boxing</span>
                  <span className="text-gray-500 text-xs">Ali Ray</span>
                </div>
                <div className="text-center flex flex-col justify-center">
                  <span className="text-purple-400 font-black italic uppercase text-sm mb-1">Weight L.</span>
                  <span className="text-gray-500 text-xs">Sam Hill</span>
                </div>
                <div className="text-center flex flex-col justify-center"></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}