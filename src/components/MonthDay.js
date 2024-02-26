import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

export const MonthDay = ({ day, rowIdx }) => {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    yearIndex,
    setYearIndex,
    dayIndex,
    setDayIndex,
    monthIndex,
    setMonthIndex,
    daySelected,
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
    setHourSelected,
  } = useContext(GlobalContext);


 
  useEffect(() => {
    setDayIndex(daySelected.date());
    setMonthIndex(daySelected.month());
    setYearIndex(daySelected.year());
  }, [daySelected]);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  const getCurrentDayClass = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white text-center rounded-full w-7"
      : "";
  };

  return (
    <div className="border border-gray-100 flex flex-col ">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && <p className="text-sm mt-1">{day.format("ddd")}</p>}
        <p className={`text-sm p-1 my-1 ${getCurrentDayClass()}`}>
          {day.format("D")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer "
        onClick={() => {
          setHourSelected("08:00");
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
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
