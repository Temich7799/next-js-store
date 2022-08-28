import React, { useEffect, useRef } from "react"
import styled from "styled-components";

const StyledNotCopyArea = styled.div<any>`
    user-select: none;
`;
const NotCopyArea = (props: any) => {

    const { children } = props;

    const notCopyArea = useRef<any>(null);

    useEffect(() => {
        notCopyArea.current.addEventListener('contextmenu', (e: any) => { e.preventDefault(); return false });
        notCopyArea.current.addEventListener('copy', (e: any) => { e.preventDefault(); return false });
    }, []);

    return (
        <StyledNotCopyArea ref={notCopyArea}>
            {children}
        </StyledNotCopyArea >
    )
}

export default NotCopyArea;