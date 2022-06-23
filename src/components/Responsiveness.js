import React from "react"
import styled from "styled-components"

const Element = styled.div`
    position: absolute;
    left: 15em;
    top: 1em;
    @media ${({ theme }) => theme.currentDevice.mobileS} {
        &::after {
            content: "mobileS";
        }
    }
    @media ${({ theme }) => theme.currentDevice.mobileM} {
        &::after {
            content: "mobileM";
        }
    }
    @media ${({ theme }) => theme.currentDevice.mobileL} {
        &::after {
            content: "mobileL";
        }
    }
    @media ${({ theme }) => theme.currentDevice.tablet} {
        left: 20em;
        &::after {
            content: "tablet";
        }
    }
    @media ${({ theme }) => theme.currentDevice.laptop} {
        left: 19em;
        &::after {
            content: "laptop";
        }
    }
    @media ${({ theme }) => theme.currentDevice.laptopL} {
        &::after {
            content: "laptopL";
        }
    }
    @media ${({ theme }) => theme.currentDevice.desktop} {
        &::after {
            content: "desktop";
        }
    }
    @media ${({ theme }) => theme.currentDevice.desktopL} {
        &::after {
            content: "desktopL";
        }
    }
`

const Responsiveness = () => {
    return <Element />
}

export default Responsiveness
