import React, { useRef } from "react"
import styled from "styled-components";
import ImageSVG from "./ImageSVG";

const StyledCopyArea = styled.div`
    position: relative;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .CopyAreaOnHover {
        position: absolute; 
        width: calc(100% + 25px);
        display: flex;
        left: 1%;
        justify-content: flex-end;
        align-items: center;
        border-radius: 15px;
        opacity:0;
    }
    :hover {
        .CopyAreaOnHover {
            background-color: rgba(0,0,0,0.2);
            opacity: 1;
            transition: 250ms;
            transform: scale(1.1);
        }
    }
    :active {
        .CopyAreaOnHover {
            div {
                transform: scale(1.1);
            }
        }
    }
`;

type CopyAreaProps = {
    children: JSX.Element | string
}

const CopyArea = (props: CopyAreaProps) => {

    const { children } = props;

    const textToCopy = useRef<any>(null);

    return (
        <StyledCopyArea onClick={() => navigator.clipboard.writeText(textToCopy.current.textContent)}>
            <div className="CopyAreaOnHover">
                <ImageSVG path="/svg/copy.svg" height="25px" width="25px" />
            </div>
            <div ref={textToCopy}>{children}</div>
        </StyledCopyArea >
    )
}

export default CopyArea;