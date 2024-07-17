import React from 'react';
import Link from 'next/link'
import { Cat } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border border-r-0 border-b-0 border-l-0 mt-20 pt-10 text-white p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h5 className="text-lg font-bold mb-2">About</h5>
          <ul className="list-none">
            <li><Link href={"#"} className="text-gray-500 hover:text-white">Company</Link></li>
            <li><Link href={"#"} className="text-gray-500 hover:text-white">Team</Link></li>
            <li><Link href={"#"} className="text-gray-500 hover:text-white">Careers</Link></li>
          </ul>
        </div>
        
        {/* FAQs Section */}
        <div>
          <h5 className="text-lg font-bold mb-2">FAQs</h5>
          <ul className="list-none">
            <li><Link href={"#"} className="text-gray-500 hover:text-white">Help Center</Link></li>
            <li><Link href={"#"} className="text-gray-500 hover:text-white">Contact Support</Link></li>
            <li><Link href={"#"} className="text-gray-500 hover:text-white">Terms of Service</Link></li>
          </ul>
        </div>
        
        {/* Games Section */}
        <div>
          <h5 className="text-lg font-bold mb-2">Games</h5>
          <ul className="list-none">
            <li><Link href={"#"} className="text-gray-500 hover:text-white">Action</Link></li>
            <li><Link href={"#"} className="text-gray-500 hover:text-white">Adventure</Link></li>
            <li><Link href={"#"} className="text-gray-500 hover:text-white">Puzzle</Link></li>
          </ul>
        </div>
        
        {/* Socials Section */}
        <div>
          <h5 className="text-lg font-bold mb-2">Follow Us</h5>
          <ul className="flex flex-col items-start md:flex-row md:items-center space-x-4">
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
                <i className="fa fa-facebook-f"></i> Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
                <i className="fa fa-twitter"></i> Twitter
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
                <i className="fa fa-instagram"></i> Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-gray-500 mt-8">
      <div className='w-full md:w-1/4 flex items-center justify-center'>
                    <span className='text-yellow-500 font-semibold font-sans text-3xl tracking-widest'>
                        <Link href='/' className='flex flex-col items-center justify-center'>
                            CATSINO
                            <Cat />
                        </Link>
                    </span>
                </div>
        © {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
