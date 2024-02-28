import React from "react";
import { Hour } from "./Hour";

export const Day = ({ day, month }) => {
  return (
    <div className="flex-1 grid grid-rows-24  w-full ">
      {day.map((hour, i) => (
        <React.Fragment key={i}>
          <Hour hour={hour} month={month} key={i} />
        </React.Fragment>
      ))}
    </div>
  );
};
