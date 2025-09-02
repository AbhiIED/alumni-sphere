import React from "react";
import { Search } from "lucide-react";
export default function HeroSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Stay Connected with your Batchmates
          </h2>
        </div>

    <div className="w-full max-w-md mx-auto mt-5">
      <div className="relative">
        {/* Search Icon */}
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" />
        </span>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Search by Graduation Year or Course name"
          className="w-full rounded-xl border border-gray-600 pl-10 pr-4 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>
    </div>

        {/* Horizontal Scrollable Team Members */}
        <div className="mt-12 overflow-x-auto">
          <ul
            role="list"
            className="flex space-x-8 snap-x snap-mandatory overflow-x-scroll pb-4"
          >
            {/* Member */}
            <li className="flex flex-col items-center text-center snap-center min-w-[120px]">
              <img
                className="h-20 w-20 rounded-full object-cover shadow-sm"
                src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                alt="Michael Foster"
              />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                Michael Foster
              </h3>
              <p className="text-xs text-gray-600">MCA 2003</p>
              <button className="mt-2 px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Connect
              </button>
            </li>

            <li className="flex flex-col items-center text-center snap-center min-w-[120px]">
              <img
                className="h-20 w-20 rounded-full object-cover shadow-sm"
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                alt="Dries Vincent"
              />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                Dries Vincent
              </h3>
              <p className="text-xs text-gray-600">CSE 1999</p>
              <button className="mt-2 px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Connect
              </button>
            </li>

            <li className="flex flex-col items-center text-center snap-center min-w-[120px]">
              <img
                className="h-20 w-20 rounded-full object-cover shadow-sm"
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                alt="Lindsay Walton"
              />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                Lindsay Walton
              </h3>
              <p className="text-xs text-gray-600">ECE 2005</p>
              <button className="mt-2 px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Connect
              </button>
            </li>

            <li className="flex flex-col items-center text-center snap-center min-w-[120px]">
              <img
                className="h-20 w-20 rounded-full object-cover shadow-sm"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                alt="Courtney Henry"
              />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                Courtney Henry
              </h3>
              <p className="text-xs text-gray-600">Civil 2015</p>
              <button className="mt-2 px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Connect
              </button>
            </li>

            <li className="flex flex-col items-center text-center snap-center min-w-[120px]">
              <img
                className="h-20 w-20 rounded-full object-cover shadow-sm"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                alt="Tom Cook"
              />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                Tom Cook
              </h3>
              <p className="text-xs text-gray-600">Mtech 2001</p>
              <button className="mt-2 px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Connect
              </button>
            </li>

            <li className="flex flex-col items-center text-center snap-center min-w-[120px]">
              <img
                className="h-20 w-20 rounded-full object-cover shadow-sm"
                src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                alt="Whitney Francis"
              />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                Whitney Francis
              </h3>
              <p className="text-xs text-gray-600">MCA 2015</p>
              <button className="mt-2 px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Connect
              </button>
            </li>

            <li className="flex flex-col items-center text-center snap-center min-w-[120px]">
              <img
                className="h-20 w-20 rounded-full object-cover shadow-sm"
                src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                alt="Leonard Krasner"
              />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                Leonard Krasner
              </h3>
              <p className="text-xs text-gray-600">MCA 2022</p>
              <button className="mt-2 px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Connect
              </button>
            </li>

            <li className="flex flex-col items-center text-center snap-center min-w-[120px]">
              <img
                className="h-20 w-20 rounded-full object-cover shadow-sm"
                src="https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                alt="Floyd Miles"
              />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                Floyd Miles
              </h3>
              <p className="text-xs text-gray-600">IT 2020</p>
              <button className="mt-2 px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Connect
              </button>
            </li>
                        <li className="flex flex-col items-center text-center snap-center min-w-[120px]">
              <img
                className="h-20 w-20 rounded-full object-cover shadow-sm"
                src="https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                alt="Floyd Miles"
              />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                Floyd Miles
              </h3>
              <p className="text-xs text-gray-600">EE 2022</p>
              <button className="mt-2 px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Connect
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
