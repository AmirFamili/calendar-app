import React, { useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export const CalendarHeader = () => {
  const {
    yearIndex,
    setYearIndex,
    monthIndex,
    setMonthIndex,
    dayIndex,
    setDayIndex,
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

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };
  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
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
    <header className="p-4 pl-6 flex item-center max-md:pl-2  max-md:block max-md:text-center max-md:pb-6">
       <div className="flex item-center  max-md:justify-center">
        <span onClick={handlePrevMonth} className="material-icons-outlined cursor-pointer bg-slate-100 rounded-tl-lg  rounded-bl-lg text-gray-800 h-12 border-r-white flex justify-center items-center max-md:h-10">
          chevron_left
        </span>
   

      <button
         className="border-r border-l  border-white h-12 py-2 px-4 bg-slate-100 max-md:h-10 max-md:px-2 "
        onClick={handleReset}
      >
        Today
      </button>

    
        <span onClick={handleNextMonth} className="material-icons-outlined cursor-pointer bg-slate-100 rounded-tr-lg  rounded-br-lg text-gray-800 h-12 border-r-white flex justify-center items-center max-md:h-10">
          chevron_right
        </span>
 

      <h2 className="ml-5 mt-3 w-72 px-10 text-xl text-gray-500 font-bold max-lg:px-5 max-lg:w-52 max-lg:ml-3 max-md:pl-2 max-md:pr-0 max-md:text-lg ">
        {dayjs(new Date(yearIndex, monthIndex)).format("MMMM YYYY")}
      </h2>
      </div>
      <div className="p-1  mt-2 max-md:mt-5 ">
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
