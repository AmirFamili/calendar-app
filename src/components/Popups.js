import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export const Popups = () => {
  const { setShowPopup, setConfirmation, popupModel } =
    useContext(GlobalContext);
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center z-50">
      <div className="bg-gray-200 shadow-lg py-12 px-20 rounded-lg ">
        <h3 className="p-2">
          {popupModel === "save"
            ? "Are you sure you want to save?"
            :popupModel === "close"?"Unsaved changes, do you want to close?":popupModel === "filled"?'You have event this time!':'Do you want to delete this Event?'}
        </h3>
        <div className="flex justify-center items-center mt-3">
          {popupModel === "filled"?'':<button
            className="py-1 px-5 mx-1 border rounded-md  shadow-sm bg-slate-50 hover:bg-blue-600 hover:text-white"
            onClick={() => {
              setConfirmation(false);
              setShowPopup(false);
            }}
          >
            No
          </button>}
          
          <button
            className="py-1 px-5 mx-1 border rounded-md shadow-sm bg-slate-50
          hover:bg-blue-600 hover:text-white"
            onClick={() => {
              setConfirmation(true);
              setShowPopup(false);
            }}
          >
           {popupModel === "filled"?'Ok':' Yes'}
          </button>
        </div>
      </div>
    </div>
  );
};
