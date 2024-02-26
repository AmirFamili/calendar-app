import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";
const labelsClasses = ["blue", "green", "red", "gray"];

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    setDaySelected,
    dispatchCalEvent,
    selectedEvent,
    setShowPopup,
    confirmation,
    setConfirmation,
    popupModel,
    setPopupModel,
    hourSelected,
    setHourSelected,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [time, setTime] = useState(
    selectedEvent ? selectedEvent.time : hourSelected
  );
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  useEffect(() => {
    if (popupModel === "save") {
      if (confirmation) {
        const calendarEvent = {
          title,
          time,
          description,
          label: selectedLabel,
          day: daySelected.valueOf(),
          id: selectedEvent ? selectedEvent.id : Date.now(),
        };
        if (selectedEvent) {
          dispatchCalEvent({ type: "update", payload: calendarEvent });
        } else {
          dispatchCalEvent({ type: "push", payload: calendarEvent });
        }
        setShowEventModal(false);
        setConfirmation(false);
        setPopupModel(null);
       
      }
    } else if (popupModel === "close") {
      if (confirmation) {
        setShowEventModal(false);
        setConfirmation(false);
        setPopupModel(null);
       
      }
    } else if (popupModel === "delete") {
      if (confirmation) {
        dispatchCalEvent({ type: "delete", payload: selectedEvent });
        setShowEventModal(false);
        setConfirmation(false);
        setPopupModel(null);
       
      }
    }
  }, [confirmation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPopupModel("save");
    setShowPopup(true);
  };

  return (
    <div className="  h-screen w-full fixed left-0 top-0 flex justify-center items-center ">
      <form action="" className="rounded-lg bg-white shadow-2xl w-1/4 ">
        <header className="bg-gray-100 px-4 py-2 flex justify-between  items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  setPopupModel("delete");
                  setShowPopup(true);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button>
              <span
                onClick={() => {
                  setPopupModel("close");
                  setShowPopup(true);
                }}
                className="material-icons-outlined text-gray-400"
              >
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>
              {daySelected.format("dddd, MMMM DD")}

              <input
                className="border-none rounded-md mt-2 mx-1 p-1 cursor-pointer"
                type="time"
                name="time"
                step="3600"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </p>

            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`${lblClass}-circle w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <div className="group relative">
            <button
              type="submit"
              className={
                title
                  ? "bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white "
                  : "bg-slate-400 px-6 py-2 rounded text-white"
              }
              disabled={title ? false : true}
              onClick={handleSubmit}
            >
              Save
            </button>
            <div
              className={
                title
                  ? "hidden"
                  : "text-center absolute right-0 w-44 bg-slate-200 rounded py-2 px-2 text-slate-800  text-sm mt-2 hidden group-hover:block shadow-md"
              }
            >
              Title cannot be empty!
            </div>
          </div>
        </footer>
      </form>
    </div>
  );
}
