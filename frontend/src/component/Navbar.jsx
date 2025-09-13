import React,{useState} from "react";
import image from "../Images/logo.png";

import { User, Bell } from "lucide-react"; 
import { Link } from "react-router-dom";

export default function Navbar() {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
  return (
    <header className="bg-[#BBDCE5] fixed top-0 left-0 w-full z-50 shadow-md">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-8xl items-center justify-around p-2 lg:px-8"
      >
        {/* Logo Section */}
        <div className="flex lg:flex-1 relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="flex items-center gap-2 text-white hover:text-gray-200 bg-white p-2 rounded-full"
          >
            <Bell className="h-8 w-8 text-white" color="black" />
            
          </button>
          <img src={image} alt="Logo" className="h-12 w-auto ml-8" />

          {/* 🔔 Notification Dropdown */}
          {showNotifications && (
            <div className="absolute top-14 left-0 w-100 bg-white shadow-lg rounded-lg p-4 z-50">
              <h3 className="text-lg font-bold text-gray-700 mb-2">Notifications</h3>
              <ul className="space-y-2 text-n text-gray-600">
                <li className="border-b pb-4">🎉 New event this weekend!</li>
                <li className="border-b pb-4">👤 John Doe sent you a connection request.</li>
                <li className="border-b pb-4">📰 New article in your feed.</li>
                <li className="border-b pb-4">💼 New job posting available.</li>
                <li className="border-b pb-4">📅 Reminder: Alumni meetup tomorrow.</li>
                <li className="border-b pb-4">🔔 Your profile was viewed 5 times this week.</li>
                <li className="border-b pb-4">✉️ You have 3 new messages.</li>
                <li className="border-b pb-4">⭐ You received a new endorsement.</li>
                <li className="border-b pb-4">📢 Announcement: New features added!</li>
                <li className="text-indigo-600 cursor-pointer">View more →</li>
              </ul>
            </div>
          )}
        </div>
        {/*MANIT LOGO LINK*/}
        
        {/* Navigation Links */}
        <div className="hidden lg:flex lg:gap-x-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="28"
            height="28"
            viewBox="0 0 64 64"
            
          >
            <path d="M 12 4 C 9.792969 4 8 5.792969 8 8 L 8 56 C 8 58.207031 9.792969 60 12 60 L 47 60 C 48.652344 60 50 58.652344 50 57 L 50 53.816406 C 51.160156 53.402344 52 52.300781 52 51 L 52 44.617188 L 54.894531 43.171875 C 55.574219 42.832031 56 42.144531 56 41.382813 L 56 12 C 56 10.898438 55.101563 10 54 10 L 52 10 L 52 7 C 52 5.347656 50.652344 4 49 4 Z M 12 6 L 49 6 C 49.550781 6 50 6.449219 50 7 L 50 51 C 50 51.550781 49.550781 52 49 52 L 20 52 L 20 17 C 20 16.449219 19.554688 16 19 16 C 18.445313 16 18 16.449219 18 17 L 18 52 L 12 52 C 11.382813 52 10.660156 52.222656 10 52.632813 L 10 8 C 10 6.898438 10.898438 6 12 6 Z M 13 8 C 12.445313 8 12 8.449219 12 9 C 12 9.550781 12.445313 10 13 10 L 15 10 C 15.554688 10 16 9.550781 16 9 C 16 8.449219 15.554688 8 15 8 Z M 19 8 C 18.445313 8 18 8.449219 18 9 L 18 13 C 18 13.550781 18.445313 14 19 14 C 19.554688 14 20 13.550781 20 13 L 20 9 C 20 8.449219 19.554688 8 19 8 Z M 52 12 L 54 12 L 54 21.382813 L 52 22.382813 Z M 13 13 C 12.445313 13 12 13.449219 12 14 C 12 14.550781 12.445313 15 13 15 L 15 15 C 15.554688 15 16 14.550781 16 14 C 16 13.449219 15.554688 13 15 13 Z M 13 18 C 12.445313 18 12 18.449219 12 19 C 12 19.550781 12.445313 20 13 20 L 15 20 C 15.554688 20 16 19.550781 16 19 C 16 18.449219 15.554688 18 15 18 Z M 35 18 C 32.242188 18 30 20.242188 30 23 L 30 25 C 30 25.960938 30.285156 26.851563 30.761719 27.613281 C 28.128906 28.632813 26.050781 30.851563 25.296875 33.695313 C 25.15625 34.230469 25.476563 34.777344 26.011719 34.917969 C 26.542969 35.058594 27.089844 34.738281 27.234375 34.203125 C 27.898438 31.691406 29.898438 29.820313 32.347656 29.222656 C 33.117188 29.707031 34.023438 30 35 30 C 35.976563 30 36.882813 29.707031 37.652344 29.21875 C 40.101563 29.820313 42.105469 31.691406 42.769531 34.207031 C 42.886719 34.65625 43.292969 34.953125 43.734375 34.953125 C 43.820313 34.953125 43.90625 34.941406 43.988281 34.917969 C 44.523438 34.777344 44.84375 34.230469 44.703125 33.695313 C 43.949219 30.847656 41.875 28.632813 39.242188 27.613281 C 39.714844 26.851563 40 25.960938 40 25 L 40 23 C 40 20.242188 37.757813 18 35 18 Z M 35 19.832031 C 36.722656 19.832031 38.125 21.234375 38.125 22.957031 L 38.125 25.042969 C 38.125 26.765625 36.722656 28.167969 35 28.167969 C 33.277344 28.167969 31.875 26.765625 31.875 25.042969 L 31.875 22.957031 C 31.875 21.234375 33.277344 19.832031 35 19.832031 Z M 13 23 C 12.445313 23 12 23.449219 12 24 C 12 24.550781 12.445313 25 13 25 L 15 25 C 15.554688 25 16 24.550781 16 24 C 16 23.449219 15.554688 23 15 23 Z M 54 23.617188 L 54 31.382813 L 52 32.382813 L 52 24.617188 Z M 13 28 C 12.445313 28 12 28.449219 12 29 C 12 29.550781 12.445313 30 13 30 L 15 30 C 15.554688 30 16 29.550781 16 29 C 16 28.449219 15.554688 28 15 28 Z M 13 33 C 12.445313 33 12 33.449219 12 34 C 12 34.550781 12.445313 35 13 35 L 15 35 C 15.554688 35 16 34.550781 16 34 C 16 33.449219 15.554688 33 15 33 Z M 54 33.617188 L 54 41.382813 L 52 42.382813 L 52 34.617188 Z M 13 38 C 12.445313 38 12 38.449219 12 39 C 12 39.550781 12.445313 40 13 40 L 15 40 C 15.554688 40 16 39.550781 16 39 C 16 38.449219 15.554688 38 15 38 Z M 31 38 C 30.445313 38 30 38.449219 30 39 C 30 39.550781 30.445313 40 31 40 L 39 40 C 39.554688 40 40 39.550781 40 39 C 40 38.449219 39.554688 38 39 38 Z M 29 42 C 28.445313 42 28 42.449219 28 43 C 28 43.550781 28.445313 44 29 44 L 33 44 C 33.554688 44 34 43.550781 34 43 C 34 42.449219 33.554688 42 33 42 Z M 37 42 C 36.445313 42 36 42.449219 36 43 C 36 43.550781 36.445313 44 37 44 L 41 44 C 41.554688 44 42 43.550781 42 43 C 42 42.449219 41.554688 42 41 42 Z M 13 43 C 12.445313 43 12 43.449219 12 44 C 12 44.550781 12.445313 45 13 45 L 15 45 C 15.554688 45 16 44.550781 16 44 C 16 43.449219 15.554688 43 15 43 Z M 13 48 C 12.445313 48 12 48.449219 12 49 C 12 49.550781 12.445313 50 13 50 L 15 50 C 15.554688 50 16 49.550781 16 49 C 16 48.449219 15.554688 48 15 48 Z M 12 54 L 48 54 L 48 57 C 48 57.550781 47.550781 58 47 58 L 12 58 C 10.898438 58 10 57.101563 10 56 C 10 54.753906 11.390625 54 12 54 Z"></path>
          </svg>
          <Link to="/directory">
          <a href="#" className="text-base leading-6 font-semibold text-white mr-6">
            Alumni Directory
          </a>
          </Link>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
            />
          </svg>

          <a href="#" className="text-base leading-6 font-semibold text-white mr-6">
            My Connections
          </a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
            />
          </svg>

          <a href="#" className="text-base leading-6 font-semibold text-white mr-6">
            Feed
          </a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
            />
          </svg>

          <a href="#" className="text-base leading-6 font-semibold text-white mr-6">
            Job
          </a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
            
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <a href="#" className="text-base leading-6 font-semibold text-white mr-3 ">
            Donate
          </a>
        </div>

         {/* Profile Section */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 text-white hover:text-gray-200 bg-white p-2 rounded-full"
          >
            <User className="h-8 w-8 " color="black" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute top-16 right-0 w-48 bg-white shadow-lg rounded-lg p-4 z-50">
              <ul className="space-y-2 text-gray-600">
<li>
  <Link
    to="/manage-account"
    onClick={() => setShowProfileMenu(false)} // ✅ closes menu
    className="block cursor-pointer hover:text-black"
  >
    👤 Profile Setting
  </Link>
</li>

                <li className="cursor-pointer hover:text-black">🚪 Logout</li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
