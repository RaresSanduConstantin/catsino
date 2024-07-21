"use client"
import React, { useState, useEffect, useRef } from 'react';

const GamePage = () => {
  const [active, setActive] = useState(false);
  const [results, setResults] = useState(["🍒", "🍒", "🍒"]);
  const slotsRef = useRef([null, null, null]);

  useEffect(() => {
    if (active) {
      const timers: number[] = [];
      slotsRef.current.forEach((_, idx) => {
        timers.push(window.setInterval(() => {
          const nextResult = getRandomSlotValue();
          setResults(prev => [...prev.slice(0, idx), nextResult, ...prev.slice(idx + 1)]);
        }, 100));
      });

      setTimeout(() => {
        timers.forEach(timer => clearInterval(timer));
        setResults(["🐱", "🐱", "🐱"]);
        setActive(false);
      }, 2000);
    }
  }, [active]);

  const getRandomSlotValue = () => {
    const values = ["🍒", "🍋", "🍊", "🍉", "🍇", "⭐", "🐱"];
    return values[Math.floor(Math.random() * values.length)];
  };

  const handleStart = () => {
    if (!active) {
      setActive(true);
    }
  };

  return (
    <div className='mt-20 md:mt-0 flex flex-col items-center justify-center w-full'>
        <h1 className="text-4xl font-bold mt-10 mb-4">Slot Machine Game</h1>
        <div className='flex flex-col border rounded-2xl p-20 gap-10'>

        <div className="flex justify-center items-center mb-5 bg-yellow-100 py-10">
          {results.map((result, index) => (
            <div key={index} className="text-5xl mx-2">
              {result}
            </div>
          ))}
        </div>
        <button
          className="bg-yellow-500  text-white font-bold py-2 px-4 rounded"
          onClick={handleStart}
          disabled={active}
        >
          {active ? "Spinning..." : "Win"}
        </button>
        </div>
    </div>
  );
};

export default GamePage;
