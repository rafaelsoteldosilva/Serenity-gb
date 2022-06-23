import React, { useContext } from "react"
import styled from "styled-components"

import * as globalStyles from "../globals/globalStyles"
import { GlobalStateContext } from "../globals/globalContextProvider"
// import serenity3dWhite from "/serenity-3d-white.png"

const CenteredInfo = styled.div`
  display: ${({ firstTimeInApp }) => (firstTimeInApp ? "none" : "flex")};
  position: absolute;
  width: 100%;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Logo = styled.img`
  width: 20%;
  min-width: 200px;
  max-width: 300px;
`

const CenteredText = styled.p`
  width: 70%;
  max-width: 600px;
  text-align: center;
  margin-top: 1em;
  color: ${({ theme }) => theme.colors.whiteColor};
  @media ${({ theme }) => theme.currentDevice.laptop} {
  }
`

const MyButton = styled(globalStyles.Button)`
  margin-top: 0.5em;
  @media ${({ theme }) => theme.currentDevice.laptop} {
  }
`

const ShowCenteredInfo = () => {
  const { globalState, globalDispatch } = React.useContext(GlobalStateContext)

  return (
    <CenteredInfo firstTimeInApp={globalState.firstTimeInApp}>
      <Logo src={"/serenity-3d-white.png"} alt="logo" />
      <CenteredText>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        mollitia, molestiae quas vel
      </CenteredText>
      <MyButton disabled={false}>LOREM IPSUM</MyButton>
    </CenteredInfo>
  )
}

export default ShowCenteredInfo
