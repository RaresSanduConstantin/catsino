"use client"
import { useSession } from 'next-auth/react';
import React, { useState, useEffect, useRef } from 'react';

const GamePage = () => {
  const [active, setActive] = useState(false);
  const [results, setResults] = useState(["🍒", "🍒", "🍒"]);
  const slotsRef = useRef([null, null, null]);
  const { data: session, status  } = useSession();

  const [score, setScore] = useState(0);

  const fetchUserScore = async () => {
    const res = await fetch(`/api/users/${session?.user?.email}`);
    if (res.ok) {
        const data = await res.json();
        setScore(data.score);  // Assuming the API returns an object with a 'score' property
    } else {
        console.error('Failed to fetch user score');
    }
};


useEffect(() => {
  if (status === 'authenticated') {
      fetchUserScore();
  }
}, [status]);


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
        updateScore();
      }, 2000);
    }
  }, [active]);


  const updateScore = async () => {
    setScore(prevScore => {
        const multipliers = [1, 2, 3];
        const randomMultiplier = multipliers[Math.floor(Math.random() * multipliers.length)];
        const newScore = prevScore + (prevScore * randomMultiplier);

        updateScoreAPI(newScore);

        return newScore;
    });
};

const updateScoreAPI = async (newScore: number) => {
  if (!session?.user?.email) {
      console.error('User email is not available');
      return;
  }

  const response = await fetch('/api/update-score', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: session.user.email, score: newScore })
  });

  if (!response.ok) {
      console.error('Failed to update score');
  } else {
      console.log('Score updated successfully');
  }
};

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
        <div className='text-center bg-slate-600 p-5 rounded-xl'>
          Score: <span className='bg-yellow-500 p-2 rounded-lg'>${score}</span> 
        </div>
        </div>
    </div>
  );
};

export default GamePage;
