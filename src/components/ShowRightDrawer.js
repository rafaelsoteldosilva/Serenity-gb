import React, { useContext } from "react"
import { Link } from "gatsby"

import { GlobalStateContext } from "../globals/globalContextProvider"
import * as globalConstants from "../globals/globalConstants"
// import { useLocation } from "react-router-dom"
import styled from "styled-components"

// import serenity3dWhite from "/serenity-3d-white.png"

const NavigationDrawerItem = styled(Link)`
  display: flex;
  flow-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.whiteColor};

  background-color: ${({ theme, active }) =>
    active ? theme.colors.normalButtonColor : "transparent"};

  padding-top: 1.2em;
  padding-left: 0.3em;
  padding-right: 0.3em;
  padding-bottom: 0.9em;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    background-color: ${({ theme, active }) =>
      active ? null : theme.colors.hoverButtonColor};
  }
  &:active {
    background-color: ${({ theme, active }) =>
      active ? null : theme.colors.activeButtonColor};
  }
`

const RightDrawer = styled.div`
  position: fixed;
  height: 100%;
  background: black;
  top: 0;
  right: 0;
  width: ${({ drawersWidth }) => drawersWidth};
  z-index: 200;
  box-shadow: ${({ show }) => (show ? "-3px" : "0px")} 0px
    ${({ show }) => (show ? "7px" : null)}
    ${({ theme }) => theme.colors.blackColor};
  transform: translateX(100%);
  transition: transform 0.3s ease-out;
  transform: ${({ show }) => (show ? "translateX(0)" : null)};
`

const LogoImage = styled.img`
  margin-top: 2em;
  margin-left: 2.5em;
  margin-right: 0.5em;
  margin-bottom: 2em;
  width: 70%;
`

const ShowRightDrawer = ({ show, setShow, location }) => {
  const { globalState, globalDispatch } = React.useContext(GlobalStateContext)

  return (
    <React.Fragment>
      <RightDrawer show={show} drawersWidth={globalConstants.drawersWidth}>
        <LogoImage
          src={"/serenity-3d-white.png"}
          onClick={() => setShow(false)}
          alt="logo"
        />
        {globalState.menuItemsList.map((menuItem, index) => {
          return (
            <NavigationDrawerItem
              active={globalState.currentComponent === menuItem.itemPath}
              to={menuItem.itemPath}
              key={index}
              onClick={() => setShow(false)}
            >
              {menuItem.icon}
              &nbsp;&nbsp;&nbsp;
              {menuItem.title}
            </NavigationDrawerItem>
          )
        })}
      </RightDrawer>
    </React.Fragment>
  )
}

export default ShowRightDrawer
