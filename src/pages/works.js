import React, { useEffect } from "react";
import { GlobalStateContext } from "../globals/globalContextProvider";
import * as globalConstants from "../globals/globalConstants";
import styled from "styled-components";
import { graphql } from "gatsby";
import VideoCard from "../components/VideoCard";

const ContentContainer = styled.div`
    display: flex;
    position: fixed;
    width: 95%;
    height: 75%;
    z-index: 1;
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: 5em;
    padding-left: 2em;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    margin-top: 8em;
    @media ${({ theme }) => theme.currentDevice.laptop} {
        margin-top: 10em;
    }
`;

const LoadingVideos = styled.div`
    color: white;
`;

const Works = ({ data }) => {
    const { globalDispatch } = React.useContext(GlobalStateContext);

    useEffect(() => {
        globalDispatch({
            type: globalConstants.setCurrentComponent,
            currentComponent: globalConstants.worksPath,
        });
        globalDispatch({ type: globalConstants.notFirstTimeInApp });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        //
        <React.Fragment>
            {/* <BackgroundText>WORKS</BackgroundText> */}

            <ContentContainer>
                {data.allWorks.nodes.map((videoInfo, ndx) => {
                    return <VideoCard videoObject={videoInfo} index={ndx} />;
                })}
            </ContentContainer>
        </React.Fragment>
    );
};

export default Works;

export const query = graphql`
    query {
        allWorks {
            nodes {
                author_name
                description
                duration
                thumbnail_url_with_play_button
                title
                upload_date(locale: "")
                video_id
            }
        }
    }
`;
