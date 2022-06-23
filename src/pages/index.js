import React from "react";
import { useEffect } from "react";
import { GlobalStateContext } from "../globals/globalContextProvider";

import * as globalConstants from "../globals/globalConstants";
import styled from "styled-components";

import ShowModel from "../components/ShowModel";
import ShowVerticalDoors from "../components/ShowVerticalDoors";
import ShowCenteredInfo from "../components/CenteredInfo";

const ModelContainer = styled.div`
   width: 100vw;
   height: 95vh;
`;

const IndexPage = () => {
   const { globalDispatch } = React.useContext(GlobalStateContext);

   useEffect(() => {
      globalDispatch({
         type: globalConstants.setCurrentComponent,
         currentComponent: globalConstants.threeDModelPath,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <ModelContainer>
         <ShowVerticalDoors />
         <ShowModel />
         <ShowCenteredInfo />
      </ModelContainer>
   );
};

export default IndexPage;
