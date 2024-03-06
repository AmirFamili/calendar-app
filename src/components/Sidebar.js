import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { SmallCalendar } from "./SmallCalendar";
import Labels from "./Label";

export const Sidebar = () => {
  const { setShowEventModal,  setHourSelected } = useContext(GlobalContext);

  return (
    <aside className="min-w-72 p-3 bg-slate-900 text-white max-md:hidden">
      <div className="text-right pt-2">
        <button
          onClick={() => {
            setHourSelected("08:00");
            setShowEventModal(true);
          }}
          className="px-2 py-1 bg-slate-800 cursor-pointer rounded-md "
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>

      <SmallCalendar />
      <Labels />
    </aside>
  );
};
