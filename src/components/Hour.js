import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

export const Hour = ({ hour, month}) => {

  const [hourEvents, setHourEvents] = useState([]); 
  const { setDaySelected, setShowEventModal,  filteredEvents,setSelectedEvent,setHourSelected } =
  useContext(GlobalContext);

  useEffect(()=>{
    const events =  filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format("MM-YY")===month[1][1].format("MM-YY") && dayjs(evt.day).format("DD") === hour.format("DD") && evt.time ===hour.format("HH:00")

    
    );
    setHourEvents(events);
  },[filteredEvents,hour,month])

  function formatAMPM(date) {
    var hours = date;
    var ampm = hours >= '12:00' ? 'pm' : 'am';
    hours = hours.slice(0, 2)  ;
    hours=hours %12;
    hours = hours ? hours : 12; 
   
    var strTime = hours + ':00 ' + ampm;
    
    return strTime;
  }

  return (
    <div className="pl-5 h-16 border-t flex items-center justify-center cursor-pointer" onClick={() => {
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
            className={`${evt.label}-box p-3  ml-1 text-gray-200 text-sm rounded-r truncate h-full grid grid-rows-2`}
          >
            <h6 className="text-xs">{formatAMPM(evt.time)}</h6>
           <h5 className=" font-bold ">{evt.title}</h5> 
          </div>
        ))}
      </div>
    </div>
  );
};
