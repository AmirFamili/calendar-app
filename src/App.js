import React, { useState, useContext, useEffect } from "react";
import "./index.css";
import { getMonth,getDay } from "./util";
import { CalendarHeader } from "./components/CalendarHeader";
import { CalendarHeaderDay } from "./components/CalendarHeaderDay";
import { Sidebar } from "./components/Sidebar";
import { Month } from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import { Popups } from "./components/Popups";
import { Routes, Route } from "react-router-dom";
import { Day } from "./components/Day";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [currentDay, setCurrentDay] = useState(getDay());
  const { yearIndex,monthIndex,dayIndex, showEventModal, showPopup } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex,yearIndex));
  }, [monthIndex,yearIndex]);

  useEffect(() => {
    setCurrentDay(getDay(dayIndex,monthIndex,yearIndex));
  }, [dayIndex,monthIndex,yearIndex]);
  return (
    <React.Fragment>
      {showPopup && <Popups />}
      {showEventModal && <EventModal />}
      <div className="flex flex-1">
        <Sidebar />

        <Routes>
          <Route
            path="/calendar-app"
            element={
              <div className="h-screen w-full flex flex-col">
                <CalendarHeader />
                <Month month={currentMonth} />
                
              </div>
            }
          ></Route>

          <Route
            path="/calendar-app/day"
            element={
              <div className="h-screen w-full flex flex-col">
                 <CalendarHeaderDay />
                <Day day={currentDay} month={currentMonth}/>
              </div>
            }
          ></Route>
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
