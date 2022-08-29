import { useState, useEffect } from 'react';

export default function useMobile(mobileWidth: number = 820): boolean {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {

        window.addEventListener('resize', onResizeHandler);

        return () => window.removeEventListener('resize', onResizeHandler);

        function onResizeHandler(): void {
            setIsMobile(window.innerWidth < mobileWidth ? true : false);
        }

    }, []);

    return isMobile;
}