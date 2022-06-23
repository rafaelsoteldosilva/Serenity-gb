import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import noThumbnailAvailable from "../assets/NoThumbnailAvailable.jpg";
import { GlobalStateContext } from "../globals/globalContextProvider";

import * as globalConstants from "../globals/globalConstants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { navigate } from "gatsby";

const Card = styled.div`
    padding: 10px;
    position: relative;
    background-color: ${({ theme }) => theme.colors.darkGrayColor};
    border-bottom: none;
    width: 20em;
    margin-bottom: 0.5em;
    margin: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    filter: brightness(90%);
`;

const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20em;
    background-color: ${({ theme }) => theme.colors.darkGrayColor};
    border: 1px solid ${({ theme }) => theme.colors.darkGrayColor};
    transition: 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);

    &:hover {
        filter: brightness(80%);
        transform: translateY(2px);
    }
    &:active {
        border: 3px solid ${({ theme }) => theme.colors.activeButtonColor};
    }
`;

const CardImage = styled.img`
    width: 16em;
    padding: 0.1em;
    @media ${({ theme }) => theme.currentDevice.laptop} {
        width: 19em;
    }
`;

const CardNoImageContent = styled.div`
    color: ${({ theme }) => theme.colors.whiteColor};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding-left: 0.5em;
    padding-right: 0.5em;
    width: 20em;
    height: 8em;
`;

const CardTitle = styled.p`
    pointer-events: none;
    font-weight: bold;
    text-align: left;
    height: 1.5em;
`;

const CardDescription = styled.div`
    pointer-events: none;
    font-weight: regular;
    text-align: left;
    height: 4em;
`;

const CardActionButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const ButtonIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50px;
    color: ${({ theme }) => theme.colors.whiteColor};
    background-color: ${({ theme }) => theme.colors.darkGrayColor};
    &:hover {
        background-color: ${({ theme }) => theme.colors.hoverButtonColor};
        color: ${({ theme }) => theme.colors.textHoverButtonColor};
    }
    &:active {
        background-color: ${({ theme }) => theme.colors.activeButtonColor};
        color: ${({ theme }) => theme.colors.textHoverButtonColor};
    }
`;

const ShowIcon = styled(FontAwesomeIcon)`
    font-size: 1rem;
`;

const shortenDescription = (description) => {
    let ellipsis =
        `${description}`.length > globalConstants.maxDescriptionCharacters - 3
            ? "..."
            : "";
    return `${description}`
        .substring(0, globalConstants.maxDescriptionCharacters)
        .concat(ellipsis);
};

const shortenTitle = (title) => {
    let ellipsis = `${title}`.length > 40 ? "..." : "";
    return `${title}`.substring(0, 40).concat(ellipsis);
};

const VideoCard = ({ videoObject, index }) => {
    const { globalState, globalDispatch } =
        React.useContext(GlobalStateContext);

    function isVideoMenuItemPresent() {
        return globalState.menuItemsList.find(
            (value, index) => value.title === globalConstants.videoMenuItemTitle
        );
    }

    const handleClickOnSocialButton = (videoObj, e) => {};

    const handleClickOnVideoCard = (videoObj, e) => {
        if (!isVideoMenuItemPresent()) {
            globalDispatch({
                type: globalConstants.addVideoMenuItem,
                newMenuItem: {
                    itemPath: globalConstants.videoPath,
                    title: globalConstants.videoMenuItemTitle,
                    icon: <FontAwesomeIcon icon={faVideo} />,
                },
            });
        }
        globalDispatch({
            type: globalConstants.keepVideoData,
            videoDataObject: videoObj,
        });
        navigate(globalConstants.videoPath);
    };
    return (
        <Card index={index}>
            <CardContent
                onClick={(e) => handleClickOnVideoCard(videoObject, e)}
            >
                <CardImage
                    src={
                        videoObject.thumbnail_url_with_play_button !== null
                            ? videoObject.thumbnail_url_with_play_button
                            : noThumbnailAvailable
                    }
                    alt="Vimeo Thumbnail"
                />
                <CardNoImageContent>
                    <CardTitle>
                        {videoObject.title !== null
                            ? shortenTitle(videoObject.title)
                            : `No title - Video id: ${videoObject.video_id}`}
                    </CardTitle>
                    <CardDescription>
                        {videoObject.description !== null
                            ? shortenDescription(videoObject.description)
                            : globalConstants.noDescriptionAvailable}
                    </CardDescription>
                </CardNoImageContent>
            </CardContent>
            <CardActionButtons>
                <ButtonIcon>
                    <ShowIcon
                        icon={faShareNodes}
                        onClick={(e) =>
                            handleClickOnSocialButton(videoObject, e)
                        }
                    />
                </ButtonIcon>
            </CardActionButtons>
        </Card>
    );
};

export default VideoCard;
