import React, { useState } from "react";
import { Link } from "gatsby";
import styled, { css } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import Responsiveness from "./Responsiveness";

import * as globalConstants from "../globals/globalConstants";
import { GlobalStateContext } from "../globals/globalContextProvider";
import ShowRightDrawer from "./ShowRightDrawer";
import ShowLeftDrawer from "./ShowLeftDrawer";
import ShowDrawersBackdrop from "./ShowDrawersBackdrop";
// import serenity3dWhite from "/serenity-3d-white.png"

const NavigationStripe = styled.div`
   display: ${({ firstTimeInApp }) => (firstTimeInApp ? "none" : "flex")};
   position: fixed;
   z-index: 1;
   width: 100%;
   height: 2rem;
   justify-content: flex-end;
   align-items: flex-end;
   flex-wrap: nowrap;
   @media ${({ theme }) => theme.currentDevice.mobileL} {
      height: 3rem;
   }
   @media ${({ theme }) => theme.currentDevice.laptop} {
      height: 4rem;
   }
   @media ${({ theme }) => theme.currentDevice.desktop} {
      height: 5rem;
   }
`;

const NavigationItemsContainer = styled.div`
   margin-left: auto;
`;

const generalNavBarItem = css`
   background-color: ${({ theme, active }) =>
      active ? theme.colors.normalButtonColor : "transparent"};
   color: ${({ theme }) => theme.colors.whiteColor};
   padding-top: 100%;
   padding-left: 0.3em;
   padding-right: 0.3em;
   padding-bottom: 0.3em;
   margin-right: 1em;
   border-bottom-left-radius: 0.1em;
   border-bottom-right-radius: 0.1em;
   font-weight: bold;
   border: none;
   text-decoration: none;
   display: block;
   &:hover {
      background-color: ${({ theme, active }) =>
         active ? null : theme.colors.hoverButtonColor};
   }
`;

const LeftOpenDrawerButton = styled.button`
   ${generalNavBarItem}
   margin-left: 2em;
   @media ${({ theme }) => theme.currentDevice.laptop} {
      margin-left: 4em;
      font-size: 18px;
   }
`;

const RightOpenDrawerButton = styled.button`
   ${generalNavBarItem}
   position: absolute;
   padding-bottom: 0;
   margin-right: 1.5em;
   @media ${({ theme }) => theme.currentDevice.laptop} {
      display: none;
   }
`;

const NavBarItem = styled(Link)`
   ${generalNavBarItem};
   display: none;

   @media ${({ theme }) => theme.currentDevice.laptop} {
      display: inline;
      font-size: 1.5em;
      padding-left: 0.1em;
      padding-right: 0.1em;
      margin-right: 1.5em;
   }
`;

const Logo = styled.img`
   display: ${({ currentComponent }) =>
      currentComponent === globalConstants.threeDModelPath ? "none" : "block"};
   position: fixed;
   left: 2.5em;
   width: 7em;
   top: 1.8rem;
   margin-left: 4em;
   @media ${({ theme }) => theme.currentDevice.mobileL} {
   }
   @media ${({ theme }) => theme.currentDevice.tablet} {
      left: 4em;
      width: 10em;
      top: 1.5rem;
   }
   @media ${({ theme }) => theme.currentDevice.laptop} {
      top: 2.1rem;
      left: 6em;
      width: 10em;
   }
`;

const ShowNavigationStripe = () => {
   const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
   const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
   const { globalState } = React.useContext(GlobalStateContext);

   function handleRightOpenDrawerButtonOnClick() {
      setRightDrawerOpen(!rightDrawerOpen);
   }

   function handleLeftOpenDrawerButtonOnClick() {
      setLeftDrawerOpen(!leftDrawerOpen);
   }

   function handleBackdropClickLeft() {
      setLeftDrawerOpen(false);
   }

   function handleBackdropClickRight() {
      setRightDrawerOpen(false);
   }
   return (
      <React.Fragment>
         <ShowLeftDrawer show={leftDrawerOpen} setShow={setLeftDrawerOpen} />
         {leftDrawerOpen && (
            <ShowDrawersBackdrop closeDrawer={handleBackdropClickLeft} />
         )}
         <ShowRightDrawer show={rightDrawerOpen} setShow={setRightDrawerOpen} />

         {rightDrawerOpen && (
            <ShowDrawersBackdrop closeDrawer={handleBackdropClickRight} />
         )}
         <NavigationStripe firstTimeInApp={globalState.firstTimeInApp}>
            <LeftOpenDrawerButton onClick={handleLeftOpenDrawerButtonOnClick}>
               &gt;
            </LeftOpenDrawerButton>
            <Logo
               currentComponent={globalState.currentComponent}
               src={"/serenity-3d-white.png"}
               alt="logo"
            />
            {/* <Responsiveness /> */}
            <NavigationItemsContainer>
               {globalState.menuItemsList.map((menuItem, index) => {
                  return (
                     <NavBarItem
                        active={
                           globalState.currentComponent === menuItem.itemPath
                        }
                        to={menuItem.itemPath}
                        key={index}
                     >
                        {menuItem.title}
                     </NavBarItem>
                  );
               })}
            </NavigationItemsContainer>
            <RightOpenDrawerButton onClick={handleRightOpenDrawerButtonOnClick}>
               <FontAwesomeIcon icon={faBars} />
            </RightOpenDrawerButton>
         </NavigationStripe>
      </React.Fragment>
   );
};

export default ShowNavigationStripe;
