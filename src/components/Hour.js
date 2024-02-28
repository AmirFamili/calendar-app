import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

export const Hour = ({ hour, month }) => {
  const [hourEvents, setHourEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
    startHourSelected,
    setStartHourSelected,
    setEndHourSelected,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format("MM-YY") === month[1][1].format("MM-YY") &&
        dayjs(evt.day).format("DD") === hour.format("DD") &&
        evt.timeStart === hour.format("HH:00")
    );
    setHourEvents(events);
  }, [filteredEvents, hour, month]);

  function formatAMPM(date) {
    var hours = date;
    var ampm = hours >= "12:00" ? "pm" : "am";
    hours = hours.slice(0, 2);
    hours = hours % 12;
    hours = hours ? hours : 12;

    var strTime = hours + ":00 " + ampm;

    return strTime;
  }

  const handlerHoursHeight = (e) => {
    const [hStart, mStart] = e.timeStart.split(":").map((val) => parseInt(val));
    const [hEnd, mEnd] = e.timeEnd.split(":").map((val) => parseInt(val));
    const numberOfHour = hEnd - hStart;
    if (numberOfHour === 1) {
      return "h-full";
    } else if (numberOfHour === 2) {
      return "h-32 ";
    } else if (numberOfHour === 3) {
      return "h-48";
    } else if (numberOfHour === 4) {
      return "h-64 ";
    } else if (numberOfHour === 5) {
      return "h-80";
    } else if (numberOfHour === 6) {
      return "h-96";
    } else if (numberOfHour === 7) {
      return "hour-7";
    }else if (numberOfHour === 8) {
      return "hour-8";
    }else if (numberOfHour === 9) {
      return "hour-9";
    }else if (numberOfHour === 10) {
      return "hour-10";
    }else if (numberOfHour === 11) {
      return "hour-11";
    }else if (numberOfHour === 12) {
      return "hour-12";
    }else if (numberOfHour === 13) {
      return "hour-13";
    }else if (numberOfHour === 14) {
      return "hour-14";
    }else if (numberOfHour === 15) {
      return "hour-15";
    }else if (numberOfHour === 16) {
      return "hour-16";
    }else if (numberOfHour === 17) {
      return "hour-17";
    }else if (numberOfHour === 18) {
      return "hour-18";
    }else if (numberOfHour === 19) {
      return "hour-19";
    }else if (numberOfHour === 20) {
      return "hour-20";
    }else if (numberOfHour === 21) {
      return "hour-21";
    }else if (numberOfHour === 22) {
      return "hour-22";
    }else if (numberOfHour === 23) {
      return "hour-23";
    }
  };
  return (
    <div
      className="ml-5  h-16 border-t relative flex items-start justify-center cursor-pointer  "
      onClick={() => {
        setStartHourSelected(hour.format("HH:00"));
        setEndHourSelected(hour.add(1, "hour").format("HH:00"));
        setDaySelected(hour);
        setShowEventModal(true);
      }}
    >
      <h3 className="mr-2 pr-2 -mt-3 bg-white">{hour.format("H:00")}</h3>
      <div className="flex-1 ">
        {hourEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`${
              evt.label
            }-box p-3 absolute z-10 top-0  ml-1 text-gray-200 text-sm rounded-r truncate w-11/12  ${handlerHoursHeight(
              evt
            )} `}
          >
            <h6 className="text-xs">{formatAMPM(evt.timeStart)}</h6>
            <h5 className=" font-bold ">{evt.title}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};
