import React, { useEffect, useRef } from "react"
import styled from "styled-components";

const StyledCopyProtectedWrapper = styled.div<any>`
    user-select: none;
`;
const CopyProtectedWrapper = ({ children }) => {

    const notCopyArea = useRef<any>(null);

    useEffect(() => {
        notCopyArea.current.addEventListener('contextmenu', (e: any) => { e.preventDefault(); return false });
        notCopyArea.current.addEventListener('copy', (e: any) => { e.preventDefault(); return false });
    }, []);

    return (
        <StyledCopyProtectedWrapper ref={notCopyArea}>
            {children}
        </StyledCopyProtectedWrapper >
    )
}

export default CopyProtectedWrapper;