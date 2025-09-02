import React from "react";
import { Facebook, Instagram, Twitter, Github, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#BBDCE5] text-dark py-12">
      <div className="max-w-7xl mx-auto px-3 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Solutions */}
        <div>
          <h3 className="text-white font-semibold mb-4">Menu</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Alumni Directory</a></li>
            <li><a href="#" className="hover:text-white">My Connections</a></li>
            <li><a href="#" className="hover:text-white">Feed</a></li>
            <li><a href="#" className="hover:text-white">Job</a></li>
            <li><a href="#" className="hover:text-white">Donate</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">MANIT</a></li>
            <li><a href="#" className="hover:text-white">Vision</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
          </ul>
        </div>

        {/* Company */}
        

        {/* Legal */}
        
      </div>

      {/* Newsletter */}
      <div className="max-w-2xl mx-auto mt-3 px-2 text-center">
        <p className="text-black-400 mt-2">
          Want to contact with us? 
        </p>
        <form className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full sm:w-auto px-4 py-2 rounded-md text-gray-900 border-2 border-black-300"
            required
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-md bg-gray-600 text-white hover:bg-indigo-500 "
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Bottom */}
      <div className="mt-3 border-t border-gray-700 pt-3 flex flex-col md:flex-row items-center justify-between px-6">
        <div className="flex space-x-6">
      <a href="#" className="hover:text-white">
        <Facebook className="w-6 h-6" />
      </a>
      <a href="#" className="hover:text-white">
        <Instagram className="w-6 h-6" />
      </a>
      <a href="#" className="hover:text-white">
        <Twitter className="w-6 h-6" /> {/* Using Twitter for "X" */}
      </a>
      <a href="#" className="hover:text-white">
        <Github className="w-6 h-6" />
      </a>
      <a href="#" className="hover:text-white">
        <Youtube className="w-6 h-6" />
      </a>
    </div>
        <p className="mt-4 md:mt-0 text-gray-400 text-sm">
          © 2024 Your Company, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
