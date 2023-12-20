'use client';

import React, { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';

const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",

    hour12: false
};

export default function Topbar() {
    const [currentDate, setCurrentDate] = useState<string>('');
    const [currentTime, setCurrentTime] = useState<string>('');
    const [isMorning, setIsMorning] = useState<boolean>(true);

    useEffect(() => {
        const updateDateTime = () => {
          const now = new Date();
          const formattedTime = now.toLocaleTimeString();
          const formattedDate = now.toLocaleDateString('en-GB',{ dateStyle: 'full'}); // You can customize the formatting as needed
          setCurrentDate(formattedDate);
          setCurrentTime(formattedTime);

          const currentHour = now.getHours();
            setIsMorning((currentHour < 18 && currentHour >= 5) === true); 
        };
        // Update the date and time every second
        const intervalId = setInterval(updateDateTime, 1000);

        // Cleanup the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array means this effect will only run once when the component mounts

    return (
        <>
            {  isMorning ? (
                <div className="min-w-full min-h-[60px] bg-sky-500 px-5 rounded-lg py-1 border align-bottom">
                    <HiSun className=' text-yellow-300 h-8 w-8'/>
                    
                    <p className=' text-white'>{currentDate} : {currentTime}</p>
                </div>
                ) : (
                    <div className="min-w-full min-h-[60px] bg-gray-700 px-5 rounded-lg py-1 border align-bottom">
                    <HiMoon className=' text-yellow-300 h-8 w-8'/>
                    
                    <p className=' text-yellow-200'>{currentDate} : {currentTime}</p>
                </div>
                )}
        </>
    )
}