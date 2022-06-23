import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { GlobalStateContext } from "../globals/globalContextProvider";
import * as globalConstants from "../globals/globalConstants";
import * as globalStyles from "../globals/globalStyles";

import { useProgress } from "@react-three/drei";

import gray from "../assets/gray.jpg";
// import serenityGiff from "../Serenity.gif"

const DoorsContainer = styled.div`
   display: ${({ firstTimeInApp }) => (firstTimeInApp ? null : "none")};
   position: "absolute";
   width: "100%";
   height: "100%";
`;

const BothVerticalDoors = css`
   position: absolute;
   width: 100vw;
   height: 100vh;
   z-index: 1;
`;

const LeftVerticalDoor = styled.img`
   ${BothVerticalDoors}

   ${({ okToSlideDoors }) =>
      okToSlideDoors &&
      `
        clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
        animation-duration: 3s;
        animation-name: left-door;
        animation-fill-mode: forwards;

        @keyframes left-door {
            from {
                width: 100vw;
                height: 100vh;
            }
            to {
                width: 0px;
                height: 100vh;
            }
        }
    `}
`;

const RightVerticalDoor = styled.img`
   ${BothVerticalDoors}

   ${({ okToSlideDoors }) =>
      okToSlideDoors &&
      `
        clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%);
        animation-duration: 3s;
        animation-name: right-door;
        animation-fill-mode: forwards;

        @keyframes right-door {
            from {
                width: 100vw;
                left: 0;
                height: 100vh;
            }
            to {
                width: 0;
                left: 100vw;
                height: 100vh;
            }
        }
    `}
`;

const SerenityGiff = styled.img`
   display: ${({ disappear }) => (disappear ? "none" : null)};
   position: absolute;
   z-index: 2;
   width: 50%;
   max-width: 600px;
   top: 30%;
   left: 50%;
   transform: translate(-50%, -50%);
`;

const RevealButton = styled(globalStyles.Button)`
   display: ${({ disappear }) => (disappear ? "none" : null)};
   position: absolute;
   z-index: 2;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   &:hover {
      transform: translate(-51%, -51%);
   }
`;

const LinearProgressBarContainer = styled.div`
   display: ${({ disappear }) => (disappear ? "none" : null)};
   position: absolute;
   top: 43%;
   left: 50%;
   transform: translate(-50%, -50%);
   z-index: 2;
   width: 40%;
   max-width: 600px;
`;

const BackProgressBar = styled.div`
   height: 5px;
   background-color: ${({ theme }) => theme.colors.blackColor};
   border-radius: 50;
   z-index: 2;
`;

const FrontProgressBar = styled.div`
   height: 100%;
   width: ${({ progress }) => progress};
   background-color: ${({ theme }) => theme.colors.normalButtonColor};
   border-radius: 50;
   z-index: 100;
`;

const ShowLinearProgressBar = ({ progress }) => {
   return (
      <BackProgressBar>
         <FrontProgressBar progress={progress} />
      </BackProgressBar>
   );
};

const ShowVerticalDoors = () => {
   const { globalState, globalDispatch } = React.useContext(GlobalStateContext);
   const [progressValue, setProgressValue] = useState(0);
   const [disappear, setDisappear] = useState(false);
   const [okToSlideDoors, setOkToSlideDoors] = useState(false);

   const { progress } = useProgress();

   useEffect(() => {
      const timer = setInterval(() => {
         setProgressValue((oldProgress) => {
            const diff = Math.random() * 100;
            return Math.min(oldProgress + diff, progress);
         });
      }, 50);

      return () => {
         clearInterval(timer);
      };
   }, [progress]); // progress, from @react-three/drei, tells when the model is loaded

   function handleShowClick() {
      setTimeout(function () {
         globalDispatch({ type: globalConstants.notFirstTimeInApp });
      }, 3000);
      setOkToSlideDoors(true);
      setDisappear(true);
   }
   return (
      //
      <DoorsContainer firstTimeInApp={globalState.firstTimeInApp}>
         <LinearProgressBarContainer disappear={disappear}>
            <ShowLinearProgressBar progress={progressValue} />
         </LinearProgressBarContainer>
         <SerenityGiff src={"/Serenity.gif"} alt="Serenity Giff" />
         {progressValue === 100 && (
            <RevealButton onClick={handleShowClick} disabled={false}>
               REVEAL IT!
            </RevealButton>
         )}
         <LeftVerticalDoor
            okToSlideDoors={okToSlideDoors}
            src={gray}
            alt="left door"
         />
         <RightVerticalDoor
            okToSlideDoors={okToSlideDoors}
            src={gray}
            alt="right door"
         />
      </DoorsContainer>
   );
};

export default ShowVerticalDoors;
