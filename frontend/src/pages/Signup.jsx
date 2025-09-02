import React from "react";
//import img from "/src/components/Images/logo.png";
export default function Signup() {
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            src={
              "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            }
            alt="Your Company"
            className="mx-auto h-25 w-auto"
          />
          <h2 className="mt-5 mb-5 text-center text-4xl font-bold tracking-tight text-gray-500">
            Registration
          </h2>
        </div>

        <div className="mt-8 w-full flex item-center justify-center sm:mx-auto sm:w-full  ">
          <form action="#" method="POST" className="space-y-6">
            <div className="flex items-center w-full space-x-10">
              {/* First Name */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-900 mb-1"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  required
                  autoComplete="given-name"
                  placeholder="First Name"
                  className="rounded-md w-70 bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-900 mb-1"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  required
                  autoComplete="family-name"
                  placeholder="Last Name"
                  className="rounded-md bg-white w-70 px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                for="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autocomplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Department  */}

            <div>
              <label
                for="Department"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Enter Department
              </label>
              <div className="mt-2">
                <input
                  id="Department"
                  type="text"
                  name="Department"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Branch  */}

            <div>
              <label
                for="Branch"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Enter Branch
              </label>
              <div className="mt-2">
                <input
                  id="branch"
                  type="text"
                  name="Branch"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            {/* Batch */}
            <div>
              <label
                htmlFor="batch"
                className="block text-sm/6 mb-2 font-medium text-gray-900"
              >
                Enter Graduation Year
              </label>
              <div className="flex items-center w-full space-x-10">
                {/* Starting year */}
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="start"
                    className="text-sm font-medium text-gray-900 mb-1"
                  >
                    Starting Year
                  </label>
                  <input
                    id="start"
                    type="number"
                    name="start"
                    required
                    min="1900"
                    max="2100"
                    autoComplete="off"
                    placeholder="Start year"
                    className="rounded-md w-70 bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
                {/* Ending year */}
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="end"
                    className="text-sm font-medium text-gray-900 mb-1"
                  >
                    Ending Year
                  </label>
                  <input
                    id="end"
                    type="number"
                    name="end"
                    required
                    min="1900"
                    max="2100"
                    autoComplete="off"
                    placeholder="End year"
                    className="rounded-md bg-white w-70 px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Password  */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  for="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  autocomplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
