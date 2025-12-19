"use client";

import {useEffect, useState} from "react";

const quotes = [
    "Small steps everyday lead to big results.",
    "Focus on progress, not perfection.",
    "Consistency is the key to success.",
    "Ceep work creates great results.",
    "Take breaks to recharge and refocus."
];

export default function QuoteRotator (){
    const [index, setINdex ]= useState(0);

    useEffect (()=> {
        const interval = setInterval(()=>{
            setINdex((prev) => (prev + 1) % quotes.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mt-auto pt-6 text-center">
            <p className="text-grey-400 italic transition opacity duration-500">
                "{quotes[index]}"
            </p>
        </div>
    );
        
    
}