import React, { useContext } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"

// import threeDMax from "../3D_max.png"
// import blender from "../blender.png"
// import maya from "../Maya.png"
// import unity from "../Unity.png"
// import unreal from "../Unreal-engine.png"
import { GlobalStateContext } from "../globals/globalContextProvider"

const BottomStripe = styled.div`
  display: ${({ firstTimeInApp }) => (firstTimeInApp ? "none" : "flex")};
  position: fixed;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.blackColor};
  height: 4em;
  width: 100%;
  z-index: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ShowIcon = styled.div`
  font-size: 8px;
`

const ShowImage = styled.img`
  margin-left: 0.2em;
  margin-right: 0.2em;
  width: 4em;

  @media ${({ theme }) => theme.currentDevice.mobileL} {
    width: 5em;
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
  @media ${({ theme }) => theme.currentDevice.tablet} {
    margin-left: 1em;
    margin-right: 1em;
  }
`

const ShowBottomStripe = () => {
  const { globalState, globalDispatch } = React.useContext(GlobalStateContext)

  return (
    <BottomStripe firstTimeInApp={globalState.firstTimeInApp}>
      <ShowIcon>
        <FontAwesomeIcon icon={faCircle} />
      </ShowIcon>
      <ShowImage src={"/3D_max.png"} />
      <ShowImage src={"/blender.png"} />
      <ShowImage src={"/Maya.png"} />
      <ShowImage src={"/Unity.png"} />
      <ShowImage src={"/Unreal-engine.png"} />
      <ShowIcon>
        <FontAwesomeIcon icon={faCircle} />
      </ShowIcon>
    </BottomStripe>
  )
}

export default ShowBottomStripe
