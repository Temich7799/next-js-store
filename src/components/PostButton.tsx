import * as React from "react"
import styled from "styled-components"

const StyledPostButton = styled.a`
    font-family: 'Noto Serif';
    float: right;
    margin-right: 25px;
    color: #111111;
`;

type PostButtonProps = {
    children: JSX.Element | string
}

const PostButton = (props: PostButtonProps) => {

    const { children } = props;

    return (
        <StyledPostButton>
            {children}→
        </StyledPostButton>
    )
}

export default PostButton;