import React from "react"
import styled from "styled-components"
import * as globalConstants from "../globals/globalConstants"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons"

const LeftDrawer = styled.div`
  position: fixed;
  height: 100%;
  background: black;
  top: 0;
  right: 100%;
  width: ${({ drawersWidth }) => drawersWidth};
  z-index: 200;
  box-shadow: ${({ show }) => (show ? "3px" : "0px")} 0px
    ${({ show }) => (show ? "7px" : null)}
    ${({ theme }) => theme.colors.blackColor};
  transform: translateX(0%);
  transition: transform 0.3s ease-out;
  transform: ${({ show }) => (show ? "translateX(100%)" : null)};
`

const NavigationLeftDrawerItemsContainer = styled.div`
  margin-top: 2em;
`

const LogoImage = styled.img`
  position: absolute;
  color: ${({ theme }) => theme.colors.whiteColor};
  margin-top: 2em;
  margin-left: 2.5em;
  margin-right: 0.5em;
  width: 70%;
`

const VerticalText = styled.div`
  margin-top: 15em;
  color: ${({ theme }) => theme.colors.whiteColor};
  transform: rotate(-90deg);
  letter-spacing: 8px;
`

const VerticalLine = styled.div`
  margin-top: 6em;
  color: ${({ theme }) => theme.colors.whiteColor};
  transform: rotate(-90deg) translate(-10%, -30%);
  font-size: 1em;
`

const SocialMediaIconsContainer = styled.div`
  margin-top: 11em;
  height: 15em;
  @media ${({ theme }) => theme.currentDevice.tablet} {
    height: 12em;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
const ShowIcon = styled(FontAwesomeIcon)``

const SocialButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.whiteColor};
  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverButtonColor};
    color: ${({ theme }) => theme.colors.textHoverButtonColor};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.activeButtonColor};
    color: ${({ theme }) => theme.colors.textHoverButtonColor};
  }
`

const ShowLeftDrawer = ({ show, setShow }) => {
  return (
    <LeftDrawer show={show} drawersWidth={globalConstants.drawersWidth}>
      <LogoImage
        src={"/serenity-3d-white.png"}
        onClick={() => setShow(false)}
        alt="logo"
      />
      <NavigationLeftDrawerItemsContainer>
        <VerticalText>SOCIAL&nbsp;MEDIA</VerticalText>
        <VerticalLine>________________</VerticalLine>
        <SocialMediaIconsContainer>
          <SocialButton>
            <ShowIcon icon={faFacebook} />
          </SocialButton>
          <SocialButton>
            <ShowIcon icon={faInstagram} />
          </SocialButton>
          <SocialButton>
            <ShowIcon icon={faTwitter} />
          </SocialButton>
          <SocialButton>
            <ShowIcon icon={faYoutube} />
          </SocialButton>
        </SocialMediaIconsContainer>
      </NavigationLeftDrawerItemsContainer>
    </LeftDrawer>
  )
}

export default ShowLeftDrawer
