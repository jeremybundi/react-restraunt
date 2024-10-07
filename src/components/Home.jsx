import React from 'react';
import FooterComponent from './Footer';

function Home() {
  return (
    <div>

      {/* Main Section with Image and Map */}
      <div className="flex flex-col md:flex-row items-start justify-between bg-gray-100 py-8 px-4">
        
        {/* Map Column */}
        <div className="w-full md:w-1/4 h-full p-4 bg-white shadow-lg rounded-lg mb-4 md:mb-0">
          <h4 className="text-xl font-bold mb-4 text-center">Our Location</h4>
          
          {/* Google Map Embed */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.5444140213162!2d34.77555917521454!3d-0.6713740993220749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182b3c092521a291%3A0x452a145a63cec162!2sUfanisi%20Resorts!5e0!3m2!1sen!2ske!4v1728035636601!5m2!1sen!2ske"
            width="100%" 
            height="380" 
            style={{ border: 0 }} 
            allowFullScreen
            loading="lazy">
          </iframe>

          {/* Location Information */}
          <div className="mt-4">
            <p className="text-gray-700 text-sm">
              <strong>Address:</strong> 123 Resort Lane, Paradise City, 45678
            </p>
            <p className="text-gray-700 text-sm">
              <strong>Phone:</strong> +123 456 7890
            </p>
            <p className="text-gray-700 text-sm">
              <strong>Email:</strong> info@resort.com
            </p>
          </div>
        </div>

        {/* Image Column */}
        <div className="relative w-full md:w-3/4 h-auto overflow-hidden rounded-lg shadow-lg">
          {/* Sliding Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full">
              <p className="text-4xl md:text-5xl font-bold font-serif text-white text-center animate-slide">
                Welcome To Ufanisi Beach Resort
              </p>
            </div>
          </div>

          {/* Main Image */}
          <img
            src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/454703093.jpg?k=1dcf50ae6c58dc4e093a6ddf7bd712086fbeb7ac9f2506dca6a860b0679d68f2&o=&hp=1"
            alt="Hotel Image"
            className="w-full h-96 object-cover"
          />

          {/* Small Images Below Main Image */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/454703139.jpg?k=7f6d4e40616aeb758df200b01f74286c0e800a87df8f270b5ff4eb27a7fdf4f7&o=&hp=1" className="w-full h-32 object-cover rounded-lg" />
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/454702929.jpg?k=62a4ae1b060c20f75c645cca8b610c028580a13bb8480b86a4c957933db4b8d3&o=&hp=1" className="w-full h-32 object-cover rounded-lg" />
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/454703169.jpg?k=02bd56a218bd9f0481477a3255cab0dc62906708e1de592a3032bc34bc8943ca&o=&hp=1" className="w-full h-32 object-cover rounded-lg" />
            
            {/* View More with Text Overlay */}
            <div className="relative w-full h-32">
              <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/454711896.jpg?k=601e18a29f201a7cfb9904dc09fc3ab38aad4c4ad2a5ad1c7caf506ed87d4369&o=&hp=1" className="w-full h-full object-cover rounded-lg" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <span className="text-white text-xl font-bold">View More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent/>
    </div>
  );
}

export default Home;
