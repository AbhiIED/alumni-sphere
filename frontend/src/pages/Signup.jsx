import React, { useState } from "react";
import img from "../Images/logo.png";

export default function Signup() {
  const [endYear, setEndYear] = useState("");
  const currentYear = new Date().getFullYear();

  // Check if user is Alumni
  const isAlumni = endYear && parseInt(endYear) < currentYear;

  return (
    <div className="flex min-h-full flex-col justify-center items-center px-6 py-2 lg:px-8">
      {/* Header */}
      <div className="w-full max-w-3xl bg-[#BBDCE5] px-6 py-6 rounded-md flex flex-col items-center">
        {/* Logo */}
        <img
          src={img}
          alt="AlumniSphere Logo"
          className="h-24 w-auto mb-4"
        />

        {/* Title */}
        <h2 className="text-center text-4xl font-bold tracking-tight text-gray-700">
          Alumni Sphere
        </h2>
      </div>

      {/* Form */}
      <div className="mt-8 w-full flex justify-center">
        <form
          action="#"
          method="POST"
          className="space-y-6 w-full max-w-3xl bg-white p-6 rounded-lg shadow"
        >
          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                required
                placeholder="First Name"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                required
                placeholder="Last Name"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
              />
            </div>
          </div>

          {/* Gender + Scholar ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Gender
              </label>
              <select
                name="gender"
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Scholar ID
              </label>
              <input
                type="text"
                name="scholarId"
                required
                placeholder="Scholar ID"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
            />
          </div>

          {/* Phones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Primary Phone
              </label>
              <input
                type="tel"
                name="primaryPhone"
                required
                placeholder="Primary Phone"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Secondary Phone
              </label>
              <input
                type="tel"
                name="secondaryPhone"
                placeholder="Secondary Phone"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
              />
            </div>
          </div>

          {/* Department + Branch */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Department
              </label>
              <input
                type="text"
                name="department"
                required
                placeholder="Department"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Branch
              </label>
              <input
                type="text"
                name="branch"
                required
                placeholder="Branch"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
              />
            </div>
          </div>

          {/* Graduation Years */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Starting Year
              </label>
              <input
                type="number"
                name="startYear"
                min="1900"
                max="2100"
                required
                placeholder="e.g. 2018"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Ending Year
              </label>
              <input
                type="number"
                name="endYear"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                min="1900"
                max="2100"
                required
                placeholder="e.g. 2022"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
              />
            </div>
          </div>

          {/* Dynamic Alumni Fields */}
          {isAlumni && (
            <div className="space-y-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-700">
                Alumni Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    placeholder="Software Engineer"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Google"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Current City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="San Francisco"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Current Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    placeholder="USA"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Sector
                  </label>
                  <input
                    type="text"
                    name="sector"
                    placeholder="IT / Finance / Education"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Skills
                  </label>
                  <input
                    type="text"
                    name="skills"
                    placeholder="JavaScript, React, SQL"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Address
            </label>
            <textarea
              name="address"
              rows="3"
              placeholder="Enter your address"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
            ></textarea>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="********"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
