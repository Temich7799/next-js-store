import * as React from "react"
import styled from "styled-components"
import PostButton from "./PostButton";
require('typeface-laila');

const StyledPost = styled.div`
    padding: 10px;
    color: #747474; 
    p {
        font-family: "Laila";
    }
`;

const PostTitle = styled.h4`
    margin: 0;
`;

const StyledDate = styled.div`
    font-family: "Laila";
    font-size: 9px;
    margin: 1% 0;
    p{ 
        word-wrap: break-word;
        color: #747474;  
    }
`;

type PostProps = {
    title: string
    date: string
    content: string
    buttonText: string
}

const Post = (props: PostProps) => {

    return (
        <StyledPost>
            {props.title && <PostTitle>{props.title}</PostTitle>}
            <StyledDate><b>{props.date}</b></StyledDate>
            <div dangerouslySetInnerHTML={{ __html: props.content }} />
            {props.buttonText && <PostButton>{props.buttonText}</PostButton>}
        </StyledPost>
    )
}

export default Post;