"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Crown } from 'lucide-react';

interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  score: number;

}

const LeaderboardComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [catImages, setCatImages] = useState<CatImage[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        // Generate scores starting from 1,000,000 and decrease by 10,000 for each subsequent user
        const scoredUsers = data.map((user: any, index: any) => ({
          ...user,
          score: 1000000 - (index * 10000)
        }));
        setUsers(scoredUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    const fetchCatImages = async () => {
      try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
        const cats = await response.json();
        setCatImages(cats);
      } catch (error) {
        console.error("Failed to fetch cat images:", error);
      }
    };

    fetchUsers();
    fetchCatImages();
  }, []);

  return (
    <div className="bg-slate-100 shadow-md rounded-md w-full max-w-3xl mx-auto mt-10">
      <ul className="divide-y divide-gray-200 w-full ">
        {users.map((user, index) => {
          const catImage = catImages.length > index ? catImages[index].url : 'https://via.placeholder.com/150';
          const backgroundClass = index === 0 ? 'bg-yellow-300 '
                                : index === 1 ? 'bg-gray-300'
                                : index === 2 ? 'bg-orange-300' : '';
          return (
            <li key={user.id} className={`flex items-center justify-between py-4 px-6 ${backgroundClass}`}>
              {index === 0 && <Crown className="hidden md:flex text-yellow-500 w-6 h-6 mr-2 animate-ping" />}
              
         
              <div className="text-lg font-medium text-gray-800 flex justify-center items-center">
                <Image 
                width={48} 
                height={48} 
                className="w-12 h-12 rounded-full object-cover mr-4" 
                src={catImage}
                alt="Cat"
                unoptimized={true}
              /><span className="text-gray-700 text-lg font-medium mr-4">{index + 1}.</span> {user.name}</div>

              <p className="font-bold text-gray-800 ">Score: {user.score.toLocaleString()}</p>
              {index === 0 && <Crown className="hidden md:flex text-yellow-500 w-6 h-6 ml-2 animate-ping" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeaderboardComponent;
