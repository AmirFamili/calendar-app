import React, { useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export const CalendarHeaderDay = () => {
  const {
    dayIndex,
    setDayIndex,
    monthIndex,
    setMonthIndex,
    yearIndex,
    setYearIndex,
    daySelected,
    setDaySelected,
  } = useContext(GlobalContext);

  useEffect(() => {
    setDaySelected(dayjs(new Date( yearIndex, monthIndex, dayIndex)));
  }, [dayIndex]);

  useEffect(() => {
    setDayIndex(daySelected.date());
    setMonthIndex(daySelected.month());
    setYearIndex(daySelected.year())
  }, [daySelected]);

  const handlePrevDay = () => {
    setDayIndex(dayIndex - 1);
  };

  const handleNextDay = () => {
    setDayIndex(dayIndex + 1);
  };

  const handleReset = () => {
    setDayIndex(
      dayIndex === dayjs().date() ? dayIndex + Math.random() : dayjs().date()
    );
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
    setYearIndex(
      yearIndex === dayjs().year()
       ?  yearIndex + Math.random()
       : dayjs().year()
     )
  
  };
  return (
    <header className="p-4 pl-6 flex item-center ">
   
        <span onClick={handlePrevDay} className="material-icons-outlined cursor-pointer bg-slate-100 rounded-tl-lg  rounded-bl-lg text-gray-800 h-14 border-r-white flex justify-center items-center">
          chevron_left
        </span>
     

      <button
        className="border-r border-l  border-white h-14 py-2 px-4 bg-slate-100"
        onClick={handleReset}
      >
        Today
      </button>

    
        <span onClick={handleNextDay} className="material-icons-outlined cursor-pointer bg-slate-100 rounded-tr-lg  rounded-br-lg text-gray-800 h-14 border-r-white flex justify-center items-center">
          chevron_right
        </span>
     

      <h2 className="ml-5 mt-3 w-72 px-10 text-xl text-gray-500 font-bold">
        {dayjs(new Date(yearIndex, monthIndex, dayIndex)).format(
          "MMMM D, YYYY"
        )}
      </h2>
      <div className="p-1 ml-10 mt-2">
        <Link
          to={"/calendar-app"}
          className="px-3 py-1 border mr-0.5 rounded-l-lg"
        >
          Month
        </Link>
        <Link
          to={"/calendar-app/day"}
          className="px-5 py-1 border rounded-r-lg"
        >
          Day
        </Link>
      </div>
    </header>
  );
};
