import { useEffect, useState } from "react";

export default function useActualDate(): string {

    const initialDate = new Date();

    const [time, setTime] = useState(initialDate.toISOString());

    useEffect(() => {
        const date = new Date(Date.now() - 604800000);
        setTime(date.toISOString());
    }, []);

    return time;
}