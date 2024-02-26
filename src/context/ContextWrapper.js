import React, { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

const savedEventsReduser = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
};

const initEvents = () => {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};
export default function ConextWrapper(props) {
  const [yearIndex, setYearIndex] = useState(dayjs().year());
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [dayIndex, setDayIndex] = useState(dayjs().date());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [smallCalendarYear, setSmallCalendarYear] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [hourSelected,setHourSelected]=useState('8:00');
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReduser,
    [],
    initEvents
  );
  const [showPopup, setShowPopup] = useState(false);
  const [confirmation, setConfirmation ] = useState(null);
  const [popupModel,setPopupModel]=useState(null);
  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
        const currentLabel = prevLabels.find((lbl) => lbl.label === label);
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [savedEvents]);

  function updateLabel(label) {
    setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  }

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (smallCalendarYear !== null) {
      setYearIndex(smallCalendarYear);
    }
  }, [smallCalendarYear]);
  
  return (
    <GlobalContext.Provider
      value={{
        yearIndex,
        setYearIndex,
        monthIndex,
        setMonthIndex,
        dayIndex,
        setDayIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        smallCalendarYear,
        setSmallCalendarYear,
        daySelected,
        setDaySelected,
        hourSelected,
        setHourSelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        labels,
        setLabels,
        updateLabel,
        filteredEvents,
        showPopup,
        setShowPopup,
        confirmation,
        setConfirmation,
        popupModel,
        setPopupModel
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
