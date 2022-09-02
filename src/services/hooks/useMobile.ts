import { useState, useEffect } from 'react';

export default function useMobile(mobileWidth: number = 820): boolean {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener('resize', () => setIsMobile(window.innerWidth < mobileWidth ? true : false));
        setIsMobile(window.innerWidth < mobileWidth ? true : false);
        
        return () => window.removeEventListener('resize', () => setIsMobile(window.innerWidth < mobileWidth ? true : false));
    }, []);

    return isMobile;
}