import React, { useEffect, useRef } from "react"
import styled from "styled-components";

const StyledCopyProtectedArea = styled.div<any>`
    user-select: none;
`;
const CopyProtectedArea = (props: any) => {

    const { children } = props;

    const notCopyArea = useRef<any>(null);

    useEffect(() => {
        notCopyArea.current.addEventListener('contextmenu', (e: any) => { e.preventDefault(); return false });
        notCopyArea.current.addEventListener('copy', (e: any) => { e.preventDefault(); return false });
    }, []);

    return (
        <StyledCopyProtectedArea ref={notCopyArea}>
            {children}
        </StyledCopyProtectedArea >
    )
}

export default CopyProtectedArea;