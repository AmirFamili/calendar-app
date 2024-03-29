import React from "react";
import { MonthDay } from "./MonthDay";

export const Month = ({ month }) => {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5 ">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <MonthDay day={day} key={idx} rowIdx={i}/>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};
