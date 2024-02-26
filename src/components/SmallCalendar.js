import React, { useState, useEffect, useContext } from "react";
import { getMonth } from "../util";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

export const SmallCalendar = () => {
  const [currentYearIdx, setCurrentYearIdx] = useState(dayjs().year());
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx,currentYearIdx));
  }, [currentMonthIdx,currentYearIdx]);

  const {
    yearIndex,
    setYearIndex,
    monthIndex,
    setMonthIndex,
    dayIndex,
    setDayIndex,
    setSmallCalendarMonth,

    setSmallCalendarYear,
    daySelected,
    setDaySelected,
  } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  useEffect(() => {
    setCurrentYearIdx(yearIndex);
  }, [yearIndex]);

  useEffect(() => {
    setDaySelected(dayjs(new Date(yearIndex, monthIndex, dayIndex)));
    // setDaySelected(daySelected.set('hour',5))
 
  }, [dayIndex]);

  useEffect(() => {
    setDayIndex(daySelected.date());
    setMonthIndex(daySelected.month());
    setYearIndex(daySelected.year());
  }, [daySelected]);

  const handlePrevMonth = () => {
    setCurrentMonthIdx(currentMonthIdx - 1);
  };
  const handleNextMonth = () => {
    setCurrentMonthIdx(currentMonthIdx + 1);
  };

  const getDayClass = (day) => {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currentDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currentDay) {
      return "bg-blue-500 rounded-full";
    } else if (currentDay === slcDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    } else {
      return "";
    }
  };

  return (
    <div className="mt-9">
      <header className="flex  justify-between ">
        <p className="mt-3 pt-1 text-lg text-gray-100 font-bold">
          {dayjs(new Date( currentYearIdx, currentMonthIdx)).format("MMMM YYYY")}
        </p>

        <div>
          <button
            className="pt-3 material-icons-outlined cursor-pointer text-white "
            onClick={handlePrevMonth}
          >
            chevron_left
          </button>
          <button
            className="pt-3  material-icons-outlined cursor-pointer  text-white"
            onClick={handleNextMonth}
          >
            chevron_right
          </button>
        </div>
      </header>

      <div className="grid grid-cols-7 grid-rows-6 mt-2">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="text-sm py-1 text-center text-gray-500">
            {day.format("dd ").charAt(0)}
          </span>
        ))}

        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setSmallCalendarYear(currentYearIdx);
                  setDaySelected(day);
                 
                }}
                key={idx}
                className={` my-2 w-7 h-7  ${getDayClass(day)}`}
              >
                <span className="text-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
