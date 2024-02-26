import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

export const Hour = ({ hour, month}) => {

  const [hourEvents, setHourEvents] = useState([]); 
  const { setDaySelected, setShowEventModal,  filteredEvents,setSelectedEvent,setHourSelected } =
  useContext(GlobalContext);
// console.log(hourSelected);
  useEffect(()=>{
    const events =  filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format("MM-YY")===month[1][1].format("MM-YY") && dayjs(evt.day).format("DD") === hour.format("DD") && evt.time ===hour.format("HH:00")

    
    );
    setHourEvents(events);
  },[filteredEvents,hour,month])


  return (
    <div className="p-5 border-t flex items-center justify-center cursor-pointer" onClick={() => {
      setHourSelected(hour.format("HH:00"));
      setDaySelected(hour);
      setShowEventModal(true);
    }}>
      <h3 className="mr-2">{hour.format("H")}</h3>
      <div
        className="flex-1 "
        
      >
        {hourEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`${evt.label}-box p-1 mr-3 ml-1 text-gray-200 text-sm rounded-r mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
};
