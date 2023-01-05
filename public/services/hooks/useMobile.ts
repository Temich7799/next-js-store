import { useState, useEffect } from 'react';

export default function useMobile(mobileWidth: number = parseInt(process.env.NEXT_PUBLIC_MIN_DESKTOP_WIDTH)): boolean | undefined {
    const [isMobile, setIsMobile] = useState<boolean>();

    useEffect(() => {
        window.addEventListener('resize', () => setIsMobile(window.innerWidth < mobileWidth ? true : false));
        setIsMobile(window.innerWidth < mobileWidth ? true : false);

        return () => window.removeEventListener('resize', () => setIsMobile(window.innerWidth < mobileWidth ? true : false));
    }, []);

    return isMobile;
}