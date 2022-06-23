import React, { useEffect } from "react";
import styled from "styled-components";

import VimeoPlayer from "@u-wave/react-vimeo";

import { GlobalStateContext } from "../globals/globalContextProvider";
import * as globalConstants from "../globals/globalConstants";

import * as globalStyles from "../globals/globalStyles";

import { navigate } from "gatsby";

const ContentContainer = styled.div`
   width: 100vw;
   max-height: 1500px;
   max-width: 1500px;
`;

const Vimeo = styled(VimeoPlayer)`
   position: relative;
   padding-bottom: 38%;
   padding-top: 0;
   height: 0;

   iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      max-height: 30em;
   }
`;

const PlayerWrapper = styled.div`
   position: relative;
   margin-top: 7em;
   margin-left: auto;
   margin-right: auto;
`;

const NonPlayerElements = styled.div`
   margin-top: -3em;
`;

const Title = styled.p`
   padding-top: 0.5em;
   padding-bottom: 0.5em;
   padding-left: 1em;
   font-weight: bold;
`;

const Description = styled.p`
   padding: 1em;
   padding-top: 0.5em;
   padding-bottom: 0.5em;
   width: 100%;
   height: 20%;
`;

const CloseButton = styled(globalStyles.Button)`
   position: absolute;
   margin-left: 1em;
`;

// author: '',
// description: '',
// duration: 0,
// thumbnailUrlWithPlayButton: '',
// title: '',
// uploadDate: 0,
// videoId: 0

const Video = () => {
   const { globalState, globalDispatch } = React.useContext(GlobalStateContext);

   useEffect(() => {
      globalDispatch({
         type: globalConstants.setCurrentComponent,
         currentComponent: globalConstants.videoPath,
      });
      globalDispatch({ type: globalConstants.notFirstTimeInApp });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleClickOnClose = (e) => {
      globalDispatch({ type: globalConstants.deleteVideoMenuItem });
      navigate(globalConstants.worksPath);
   };

   const shortenDescription = (description) => {
      let ellipsis = `${description}`.length > 1400 - 3 ? "..." : "";
      return `${description}`.substring(0, 1400).concat(ellipsis);
   };
   return (
      <>
         {globalState.videoObjectToShow !== null && (
            <ContentContainer>
               <PlayerWrapper>
                  <Vimeo
                     video={globalState.videoObjectToShow.video_id}
                     autoplay
                  />
               </PlayerWrapper>
               <NonPlayerElements>
                  {/* <Title>
                     {globalState.title !== null
                        ? shortenDescription(
                             globalState.videoObjectToShow.title
                          )
                        : globalConstants.noDescriptionAvailable}
                  </Title>
                  <Description>
                     {globalState.videoObjectToShow !== null
                        ? shortenDescription(
                             globalState.videoObjectToShow.description
                          )
                        : globalConstants.noDescriptionAvailable}
                  </Description> */}
                  <CloseButton disabled={false} onClick={handleClickOnClose}>
                     CLOSE
                  </CloseButton>
               </NonPlayerElements>
            </ContentContainer>
         )}
      </>
   );
};

export default Video;
