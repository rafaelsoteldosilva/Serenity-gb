import React from "react";
import styled, { css } from "styled-components";

import { Button } from "../globals/globalStyles";

export const OkButton = 1;
export const YesNoButtons = 2;

const TheDialog = styled.div`
   visibility: hidden;
   position: fixed;
   z-index: 101;
   left: 10%;
   top: 0;
   @media ${({ theme }) => theme.currentDevice.mobileS} {
      left: 5%;
      top: -20%;
   }
   @media ${({ theme }) => theme.currentDevice.mobileL} {
      left: 20%;
      top: -20%;
   }
   @media ${({ theme }) => theme.currentDevice.tablet} {
      left: 25%;
   }
   @media ${({ theme }) => theme.currentDevice.laptop} {
      left: 30%;
   }
   @media ${({ theme }) => theme.currentDevice.laptopL} {
      left: 35%;
   }
   @media ${({ theme }) => theme.currentDevice.desktop} {
      left: 40%;
   }
`;

const DialogContent = styled.div`
   box-shadow: ${({ show }) => (show ? "3px" : "0px")} 2px
      ${({ show }) => (show ? "5px" : null)}
      ${({ theme }) => theme.colors.blackColor};
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   align-items: flex-start;
   width: 30em;
   margin: 15% auto;
   background-color: black;
   border-radius: 5px;
   position: relative;
   transition: 0.3s ease-in-out;
   opacity: ${({ show }) => (show ? "1" : 0)};
   visibility: ${({ show }) => (show ? "visible" : "hidden")};
   transform: ${({ show }) => (show ? "translateY(300px)" : "translateY(0px)")};
`;

const dialogParts = css`
   color: white;
`;

export const DialogHeader = styled.div`
   ${dialogParts}
   padding: 1em;
   font-weight: bold;
`;

export const DialogBody = styled.div`
   ${dialogParts}
   padding: 1em;
`;

const CloseButton = styled(Button)`
   margin-right: 0.5em;
   margin-bottom: 0.5em;
`;

const DialogFooter = styled.div`
   width: 100%;
   display: flex;
   flex-direction: row;
   justify-content: flex-end;
   align-items: flex-end;
`;

const Dialog = ({
   show,
   setShow,
   children,
   dialogButtons,
   responseYes,
   responseNo,
}) => {
   return (
      <TheDialog>
         <DialogContent show={show}>
            {children}
            {dialogButtons === OkButton && (
               <DialogFooter>
                  <CloseButton onClick={() => setShow(false)}>
                     CLOSE
                  </CloseButton>
               </DialogFooter>
            )}
            {dialogButtons === YesNoButtons && (
               <DialogFooter>
                  <CloseButton onClick={responseYes}>YES</CloseButton>
                  <CloseButton onClick={responseNo}>NO</CloseButton>
               </DialogFooter>
            )}
         </DialogContent>
      </TheDialog>
   );
};

export default Dialog;
