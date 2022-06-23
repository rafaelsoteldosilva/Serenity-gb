import styled, { createGlobalStyle } from "styled-components";

export const globalTheme = {
   colors: {
      activeButtonColor: "hsl(359, 99%, 90%)",
      hoverButtonColor: "hsl(359, 99%, 80%)",
      normalButtonColor: "hsl(359, 99%, 60%)",
      textHoverButtonColor: "hsl(359, 99%, 30%)",
      darkGrayColor: "hsl(0, 0%, 15%)",
      lighterDarkGrayColor: "hsl(0, 0%, 20%)",
      mediumGrayColor: "hsl(0, 0%, 30%)",
      lightGrayColor: "hsl(0, 0%, 50%)",
      whiteColor: "white",
      blackColor: "black",
      fieldHoverColor: "hsl(195, 53%, 79%)",
      errorFieldBorderColor: "hsl(359, 99%, 30%)",
      errorFieldHoverBorderColor: "hsl(359, 99%, 70%)",
      errorFieldColor: "hsl(1, 61%, 50%)",
   },
   currentDevice: {
      mobileS: "(min-width: 320px)",
      mobileM: "(min-width: 375px)",
      mobileL: "(min-width: 425px)",
      tablet: "(min-width: 768px)",
      laptop: "(min-width: 1024px)",
      laptopL: "(min-width: 1440px)",
      desktop: "(min-width: 2560px)",
      desktopL: "(min-width: 3000px)",
   },
};

export const GlobalStyles = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
    }
    *, *::after, *::before {
        box-sizing: border-box;
    }
    body {
        display: flex;
        background: ${({ theme }) => theme.colors.darkGrayColor};
        color: ${({ theme }) => theme.colors.whiteColor};
        font-family: "Roboto";
        font-size: 0.7em;
        @media ${({ theme }) => theme.currentDevice.tablet} {
            font-size: 0.7em;
        }
        @media ${({ theme }) => theme.currentDevice.desktop} {
            font-size: 1em;
        }
    }

`;

export const Button = styled.button`
   height: 2em;
   ${({ disabled }) =>
      disabled &&
      `
            disabled
        `}
   background-color: ${({ theme, disabled }) =>
      disabled ? theme.colors.mediumGrayColor : theme.colors.normalButtonColor};
   color: ${({ theme }) => theme.colors.whiteColor};
   border-radius: 8px;
   &:hover {
      background-color: ${({ theme, disabled }) =>
         disabled ? null : theme.colors.hoverButtonColor};
      color: ${({ theme, disabled }) =>
         disabled ? null : theme.colors.textHoverButtonColor};
   }
   &:active {
      background-color: ${({ theme }) => theme.colors.activeButtonColor};
      color: ${({ theme }) => theme.colors.textHoverButtonColor};
   }
   font-size: 0.7em;
   &:hover {
      transform: translateY(2px);
   }
   @media ${({ theme }) => theme.currentDevice.tablet} {
      font-size: 0.9em;
   }
   @media ${({ theme }) => theme.currentDevice.laptop} {
      font-size: 1em;
   }
`;

export const BackgroundText = styled.p`
   position: fixed;
   font-size: 6rem;
   top: 6%;
   letter-spacing: 10px;
   font-weight: 900;
   color: ${({ theme }) => theme.colors.lighterDarkGrayColor};
   left: 9%;
   font-style: italic;
   pointer-events: none;
   z-index: -1;
   @media ${({ theme }) => theme.currentDevice.laptop} {
      top: 0;
      font-size: 15rem;
      letter-spacing: 15px;
   }
`;
