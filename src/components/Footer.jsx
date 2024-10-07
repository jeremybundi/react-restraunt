import React from 'react';

const FooterComponent = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-lg mb-3 border-b-2 border-gray-400 pb-1">Support</h4>
            <ul>
              <li><a href="#" className="hover:text-gray-900 transition">Coronavirus (COVID-19) FAQs</a></li>
              <li><a href="#" className="hover:text-gray-900 transition">Manage your trips</a></li>
              <li><a href="#" className="hover:text-gray-900 transition">Contact Customer Service</a></li>
              <li><a href="#" className="hover:text-gray-900 transition">Safety resource centre</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3 border-b-2 border-gray-400 pb-1">Discover</h4>
            <ul>
              <li><a href="#" className="hover:text-gray-900 transition">Genius loyalty programme</a></li>
              <li><a href="#" className="hover:text-gray-900 transition">Seasonal and holiday deals</a></li>
              <li><a href="#" className="hover:text-gray-900 transition">Travel articles</a></li>
              <li><a href="#" className="hover:text-gray-900 transition">Booking.com for Business</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3 border-b-2 border-gray-400 pb-1">Partners</h4>
            <ul>
              <li><a href="#" className="hover:text-gray-900 transition">Extranet login</a></li>
              <li><a href="#" className="hover:text-gray-900 transition">Partner help</a></li>
              <li><a href="#" className="hover:text-gray-900 transition">List your property</a></li>
              <li><a href="#" className="hover:text-gray-900 transition">Become an affiliate</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3 border-b-2 border-gray-400 pb-1">About</h4>
            <ul>
              <li><a href="#" className="hover:text-gray-900 transition">About Booking.com</a></li>
              <li><a href="#" className="hover:text-gray-900 transition">How we work</a></li>
              <li><a href="#" className="hover:text-gray-900 transition">Sustainability</a></li>
              <li><a href="#" className="hover:text-gray-900 transition">Press centre</a></li>
              <li><a href="#" className="hover:text-gray-900 transition">Careers</a></li>
              <li><a href="#" className="hover:text-gray-900 transition">Investor relations</a></li>
              <li><a href="#" className="hover:text-gray-900 transition">Corporate contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center">
          <p className="text-sm mb-1">
            KES Booking.com is part of Booking Holdings Inc., the world leader in online travel and related services.
          </p>
          <p className="text-sm">Copyright © 1996–2024 Booking.com™. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
