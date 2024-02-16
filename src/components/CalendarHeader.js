import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

export const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };
  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };
  const handleReset = () => {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  };
  return (
    <header className="p-4 ml-2 flex item-center">
      <button onClick={handlePrevMonth}>
        <span className="material-icons-outlined cursor-pointer bg-slate-100 rounded-tl-lg  rounded-bl-lg text-gray-800 h-10 border-r-white flex justify-center items-center">
          chevron_left
        </span>
      </button>

      <button
        className="border-r border-l border-white py-2 px-4 bg-slate-100"
        onClick={handleReset}
      >
        Today
      </button>

      <button onClick={handleNextMonth}>
        <span className="material-icons-outlined cursor-pointer bg-slate-100 rounded-tr-lg  rounded-br-lg text-gray-800 h-10 border-r-white flex justify-center items-center">
          chevron_right
        </span>
      </button>

      <h2 className="ml-5 mt-1 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format(
          "MMMM YYYY"
        )}
      </h2>
    </header>
  );
};
