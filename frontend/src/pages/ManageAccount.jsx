import { useState, useRef, useEffect } from "react";

export default function ManageAccount() {
  const [profileSettings, setProfileSettings] = useState({
    profilePic: false,
    showBranch: false,
    showBatch: false,
    showLocation: false,
    showWorkplace: false,
    showExperience: false,
  });

  const [profileType, setProfileType] = useState("public");
  const [notification, setNotification] = useState(true);
  const [connectRequests, setConnectRequests] = useState(true);
  const [protection, setProtection] = useState(true);

  // Profile Pic State
  const [profilePic, setProfilePic] = useState(null);
  const fileInputRef = useRef(null);

  // Load saved profile pic from localStorage on mount
  useEffect(() => {
    const savedPic = localStorage.getItem("profilePic");
    if (savedPic) {
      setProfilePic(savedPic);
    }
  }, []);

  const handleProfileChange = (key) => {
    setProfileSettings({ ...profileSettings, [key]: !profileSettings[key] });
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result); // Save to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
    <div className="h-screen w-screen bg-gray-50 flex justify-center items-center px-4 py-8 overflow-hidden">
      <div className="w-full max-w-6xl bg-white h-full p-6 overflow-y-auto shadow-lg rounded-2xl flex">
        {/* Left Side: Account Settings */}
        <div className="flex-1 pr-6 border-r">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Manage Your Account
          </h2>

          {/* Profile Visibility */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Profile Visibility</h3>
            <div className="flex items-center justify-between">
              <span>{profileType === "public" ? "Public" : "Private"}</span>
              <button
                onClick={() =>
                  setProfileType(profileType === "public" ? "private" : "public")
                }
                className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors ${
                  profileType === "public" ? "bg-[#896c6c]" : "bg-gray-400"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    profileType === "public" ? "translate-x-7" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Profile Settings */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Profile Settings</h3>
            {Object.entries(profileSettings).map(([key, value]) => (
              <label
                key={key}
                className="flex items-center justify-between mb-2 cursor-pointer"
              >
                <span className="capitalize">
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </span>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleProfileChange(key)}
                  className="w-5 h-5 accent-[#896c6c] rounded focus:ring-green-500"
                />
              </label>
            ))}
          </div>

          {/* Notification Settings */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Notification Settings</h3>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Online notification</span>
              <button
                onClick={() => setNotification(!notification)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  notification ? "bg-[#896c6c]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                    notification ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </label>
          </div>

          {/* Request Settings */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Request Settings</h3>
            <label className="flex items-center justify-between mb-2 cursor-pointer">
              <span>Connect Requests</span>
              <button
                onClick={() => setConnectRequests(!connectRequests)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  connectRequests ? "bg-[#896c6c]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                    connectRequests ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span>Protection for information</span>
              <button
                onClick={() => setProtection(!protection)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  protection ? "bg-[#896c6c]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                    protection ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </label>
          </div>

          {/* Save Button */}
          <button
            className="w-full bg-[#896c6c] text-white py-2 rounded-lg font-medium hover:bg-[#7e5353] transition"
            onClick={() => alert("Settings Saved!")}
          >
            Save
          </button>
        </div>

        {/* Right Side: Profile Update */}
        <div className="w-1/3 flex flex-col items-center justify-start pl-6">
          <h3 className="text-lg font-medium mb-4">Profile</h3>
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white shadow-md mb-4">
            <img
              src={profilePic || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={handleButtonClick}
            className="bg-[#896c6c] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#4a3030] transition"
          >
            Update Profile Picture
          </button>
        </div>
      </div>
    </div>
    </>
  );
}