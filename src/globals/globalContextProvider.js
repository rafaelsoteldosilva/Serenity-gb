import React, { useEffect } from "react";
import * as globalConstants from "./globalConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

const initialStateContext = {
   currentComponent: "",
   firstTimeInApp: true,
   allVideosDataLoaded: false,
   allVideosDataObjects: [],
   menuItemsList: [],
   videoObjectToShow: null,
   message: "",
};

export const GlobalStateContext = React.createContext(initialStateContext);

const reducer = (state = initialStateContext, action) => {
   switch (action.type) {
      case globalConstants.notFirstTimeInApp:
         return { ...state, firstTimeInApp: false };

      case globalConstants.setCurrentComponent:
         return { ...state, currentComponent: action.currentComponent };

      case globalConstants.addVideoMenuItem:
         let newMenuItemsList = [...state.menuItemsList, action.newMenuItem];
         return { ...state, menuItemsList: newMenuItemsList };

      case globalConstants.deleteVideoMenuItem:
         return {
            ...state,
            menuItemsList: state.menuItemsList.filter(
               (menuItem) => menuItem.itemPath !== globalConstants.videoPath
            ),
         };
      case globalConstants.keepVideoData:
         return { ...state, videoObjectToShow: action.videoDataObject };

      case globalConstants.clearVideoData:
         return {
            ...state,
            newVideoObjectToShow: false,
            videoObjectToShow: null,
         };

      case globalConstants.setMessage:
         return { ...state, message: action.message };

      default:
         throw new Error("Bad Action Type");
   }
};

const GlobalContextProvider = ({ children }) => {
   const [globalState, globalDispatch] = React.useReducer(
      reducer,
      initialStateContext
   );

   useEffect(() => {
      if (globalState.menuItemsList.length === 0) {
         globalDispatch({
            type: globalConstants.addVideoMenuItem,
            newMenuItem: {
               itemPath: globalConstants.threeDModelPath,
               title: globalConstants.threeDModelMenuItemTitle,
               icon: <FontAwesomeIcon icon={faCube} />,
            },
         });

         globalDispatch({
            type: globalConstants.addVideoMenuItem,
            newMenuItem: {
               itemPath: globalConstants.aboutUsPath,
               title: globalConstants.aboutUsMenuItemTitle,
               icon: <FontAwesomeIcon icon={faAddressCard} />,
            },
         });

         globalDispatch({
            type: globalConstants.addVideoMenuItem,
            newMenuItem: {
               itemPath: globalConstants.worksPath,
               title: globalConstants.worksMenuItemTitle,
               icon: <FontAwesomeIcon icon={faTrophy} />,
            },
         });

         globalDispatch({
            type: globalConstants.addVideoMenuItem,
            newMenuItem: {
               itemPath: globalConstants.contactPath,
               title: globalConstants.contactUsMenuItemTitle,
               icon: <FontAwesomeIcon icon={faEnvelopeCircleCheck} />,
            },
         });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <GlobalStateContext.Provider value={{ globalState, globalDispatch }}>
         {children}
      </GlobalStateContext.Provider>
   );
};

export default GlobalContextProvider;
