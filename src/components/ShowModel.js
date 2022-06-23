import * as THREE from "three";
import React, {
   Suspense,
   useEffect,
   useState,
   useContext,
   useRef,
} from "react";

import { Canvas, useFrame, useThree } from "@react-three/fiber";

import styled, { css } from "styled-components";

import Model from "./Model";

import * as globalConstants from "../globals/globalConstants";
import { GlobalStateContext } from "../globals/globalContextProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";

// import temporaryVideos from "../TemporaryData/temporaryData"

// import { getOEmbedVideoInformation } from "../otherAPIs/vimeoAPI"

// ************** GENERATING STUDIO.JS FROM THE STUDIO.GLB FILE *****************

// - Place the .glb file in the public directory
// - run 'npm i -g gltfjsx', only if the gltfjsx utility has not been installed yet
// - Run 'npx gltfjsx studio.glb' in the public directory
// - It will generate a studio.js file into this public directory
// - Update studio.js:

// --------------- import statements for the studio.js file::
// import { useEffect } from 'react';
// import { useThree } from '@react-three/fiber';
// import { initialXPos, initialYPos, initialFov } from '../globalConstants';

// --------------- In the Model component of the studio.js file, before the return statement
// The model declaration must be as:
// export default function Model({ texture, ...props }) {

// const myMesh = useRef();
// const myMesh2 = useRef();

// useEffect(() => {
// 	actions.Kill_action.play();
// });
// useThree(({ camera }) => {
// 	camera.position.set(initialXPos, initialYPos, 6.7);
// 	camera.rotation.set(0.1, -0.8, 0.08);
// 	camera.fov = initialFov;
// 	camera.updateProjectionMatrix();
// });

// --------------- mesh group definitions where MONITOR_1 and MONITOR_2 are defined

// <group rotation={[ Math.PI / 2, 0, 0 ]} scale={[ 0.01, 0.01, 0.01 ]}>
// <mesh ref={myMesh} geometry={nodes.Mesh007.geometry}>
//    <meshStandardMaterial attach="material" map={texture} transparent={false} />
// </mesh>
// <mesh ref={myMesh2} geometry={nodes.Mesh007_2.geometry}>
//    <meshStandardMaterial attach="material" map={texture} transparent={false} />
// </mesh>
// <mesh geometry={nodes.Mesh007_1.geometry} material={nodes.Mesh007_1.material} />
// </group>

// **********************************************
// - Place the updated studio.js file into the Components folder, replacing the previous if any
// **********************************************

const ModelContainer = styled.div`
   width: 100%;
   height: 100%;
   background-color: ${({ theme }) => theme.colors.darkGrayColor};
`;

const TransparentButton = css`
   background-color: rgba(254, 52, 55, 0.1);
   position: absolute;
   border-radius: 50px;
   width: 3em;
   height: 3em;
   z-index: 2;
   &:hover {
      background-color: ${({ theme }) => theme.colors.hoverButtonColor};
      color: ${({ theme }) => theme.colors.textHoverButtonColor};
   }
   &:active {
      background-color: ${({ theme }) => theme.colors.activeButtonColor};
      color: ${({ theme }) => theme.colors.textHoverButtonColor};
   }
   display: ${({ firstTimeInApp }) => (firstTimeInApp ? "none" : "block")};
   @media ${({ theme }) => theme.currentDevice.laptop} {
      display: "none";
      z-index: -1;
   }
`;

const LeftTransparentButton = styled.button`
   ${TransparentButton}
   top: 45%;
   left: 5%;
`;

const RightTransparentButton = styled.button`
   ${TransparentButton}
   top: 45%;
   left: 87%;
`;

const UpperTransparentButton = styled.button`
   ${TransparentButton}
   top: 15%;
   left: 45%;
   @media ${({ theme }) => theme.currentDevice.mobileS} {
      left: 48%;
   }
`;

const LowerTransparentButton = styled.button`
   ${TransparentButton}
   top: 85%;
   left: 45%;
   @media ${({ theme }) => theme.currentDevice.mobileL} {
      left: 48%;
   }
`;

export default function ShowModel(props) {
   const [canMoveModel, setCanMoveModel] = useState(true);
   let windowWidth = 0;
   let windowHeight = 0;
   const { globalState, globalDispatch } = React.useContext(GlobalStateContext);
   const deltaX = useRef(0);
   const deltaY = useRef(0);

   useEffect(() => {
      // By the use of this event attached to the resizing of the window, I got rid of a "vibration" the model
      // experienced when the window was resized.
      const updateSize = () => {
         windowWidth = window.innerWidth;
         windowHeight = window.innerHeight;
      };
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
   }, []);

   function MoveModel() {
      const { camera, mouse } = useThree();
      let vector = new THREE.Vector3();

      return useFrame(() => {
         vector.set(
            globalConstants.initialXPos +
               globalConstants.horizontalMovementFactor *
                  (deltaX.current !== 0 ? deltaX.current : Math.sin(mouse.x)),

            globalConstants.initialYPos +
               globalConstants.verticalMovementFactor *
                  (deltaY.current !== 0 ? deltaY.current : Math.sin(mouse.y)),

            camera.position.z
         );
         camera.position.lerp(vector, 0.15);
      });
   }

   useEffect(() => {
      globalDispatch({
         type: globalConstants.setCurrentComponent,
         currentComponent: globalConstants.threeDModelPath,
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      setCanMoveModel(false);
      const timer = setTimeout(() => {
         setCanMoveModel(true);
      }, 900);
      return () => clearTimeout(timer);
   }, [windowWidth, windowHeight]);

   function handleLeftButtonClick(e) {
      deltaX.current = 0.5;
   }

   function handleRightButtonClick(e) {
      deltaX.current = -0.5;
   }

   function handleUpperButtonClick(e) {
      deltaY.current = 0.5;
   }

   function handleLowerButtonClick(e) {
      deltaY.current = -0.5;
   }

   // const LazyModel = React.lazy(() => import("./Model"));

   return (
      <ModelContainer>
         <LeftTransparentButton
            firstTimeInApp={globalState.firstTimeInApp}
            onClick={handleLeftButtonClick}
         >
            <FontAwesomeIcon icon={faCircleArrowLeft} />
         </LeftTransparentButton>
         <RightTransparentButton
            firstTimeInApp={globalState.firstTimeInApp}
            onClick={handleRightButtonClick}
         >
            <FontAwesomeIcon icon={faCircleArrowRight} />
         </RightTransparentButton>
         <UpperTransparentButton
            firstTimeInApp={globalState.firstTimeInApp}
            onClick={handleUpperButtonClick}
         >
            <FontAwesomeIcon icon={faCircleArrowUp} />
         </UpperTransparentButton>
         <LowerTransparentButton
            firstTimeInApp={globalState.firstTimeInApp}
            onClick={handleLowerButtonClick}
         >
            <FontAwesomeIcon icon={faCircleArrowDown} />
         </LowerTransparentButton>
         {typeof window !== "undefined" && (
            <Canvas>
               <ambientLight intensity={0.4} />
               <directionalLight
                  intensity={2}
                  color="white"
                  position={[0, 2, 4]}
               />
               <Suspense fallback={null}>
                  <Model />
               </Suspense>
               {canMoveModel && <MoveModel />}
            </Canvas>
         )}
      </ModelContainer>
   );
}
