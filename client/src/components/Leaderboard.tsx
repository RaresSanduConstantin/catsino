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
  catImage: CatImage;
  username: string;
}


const LeaderboardComponent = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch data from the local Next.js API
        const localResponse = await fetch('/api/users', {
          cache: 'no-cache'
        });
        const localData = await localResponse.json();
  
        // Fetch data from the external API
        const externalResponse = await fetch('https://catsino-backend-kciqjixkwa-ey.a.run.app/users');
        const externalData = await externalResponse.json();
  
        // Combine the data from both APIs
        const combinedData = [...localData, ...externalData];
  
        // Sort combined data by score in descending order and take the top 10
        const sortedUsers = combinedData
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);
  
        setUsers(sortedUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
  
    fetchUsers();
  }, []);
  

  return (
    <div className="bg-slate-100 shadow-md rounded-md w-full max-w-3xl mx-auto mt-10">
      <ul className="divide-y divide-gray-200 w-full">
        {users.map((user, index) => {
          const backgroundClass = index === 0 ? 'bg-yellow-300'
                                : index === 1 ? 'bg-gray-500'
                                : index === 2 ? 'bg-orange-300' : '';
          const catImage = user?.catImage ? user.catImage.url : 'https://cdn2.thecatapi.com/images/a44.jpg';
          const userName = user.name ? user.name : user?.username;
          console.log(user)
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
                />
                <span className="text-gray-700 text-lg font-medium mr-4">{index + 1}.</span>{userName}
              </div>

              <p className="font-bold text-gray-800">Score: {user.score.toLocaleString()}</p>
              {index === 0 && <Crown className="hidden md:flex text-yellow-500 w-6 h-6 ml-2 animate-ping" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeaderboardComponent;
