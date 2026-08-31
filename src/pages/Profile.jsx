import { useState, useRef } from "react";
import { Pencil, Camera } from "lucide-react";
import Button from "../components/Button";
import { useApp } from "../context/AppContext";

function Profile() {
  const { profile, setProfile, showToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select an image file", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const photo = reader.result; // base64 data URL
      setProfile({ ...profile, photo });
      setFormData((prev) => ({ ...prev, photo }));
      showToast("Profile picture updated");
    };
    reader.readAsDataURL(file);
  }

  function validate() {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.university.trim()) newErrors.university = "University is required";
    return newErrors;
  }

  function handleSave(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setProfile(formData);
    setErrors({});
    setIsEditing(false);
    showToast("Profile updated successfully");
  }

  function handleCancel() {
    setFormData(profile);
    setErrors({});
    setIsEditing(false);
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Account card with cover + avatar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* Cover banner */}
        <div className="h-32 bg-gradient-to-r from-[#0056D2] to-[#00308F]" />

        <div className="px-8 pb-8">
          <div className="flex items-end justify-between -mt-12 mb-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 p-1">
                {profile.photo ? (
                  <img
                    src={profile.photo}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-[#0056D2] text-white flex items-center justify-center text-3xl font-bold">
                    {profile.fullName.charAt(0)}
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full p-1.5 hover:bg-gray-50 dark:hover:bg-gray-600 transition"
                aria-label="Change profile picture"
              >
                <Camera size={14} className="text-gray-700 dark:text-gray-200" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 text-sm font-semibold text-[#0056D2] dark:text-blue-400 border-2 border-[#0056D2] dark:border-blue-400 rounded-full px-4 py-1.5 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
              >
                <Pencil size={14} /> Edit Profile
              </button>
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.fullName}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</p>
        </div>
      </div>

      {!isEditing ? (
        <div className="flex flex-col gap-6">
          {/* Education section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-5">
              Education
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-gray-400 mb-1">University</p>
                <p className="text-gray-900 dark:text-white font-medium">{profile.university}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Department</p>
                <p className="text-gray-900 dark:text-white font-medium">{profile.department}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Semester</p>
                <p className="text-gray-900 dark:text-white font-medium">{profile.semester}</p>
              </div>
            </div>
          </div>

          {/* Bio section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
              About
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{profile.bio}</p>
          </div>
        </div>
      ) : (
          <form
            onSubmit={handleSave}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col gap-5"
          >
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
              Edit Profile
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0056D2]"
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0056D2]"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  University
                </label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0056D2]"
                />
                {errors.university && <p className="text-red-500 text-xs mt-1">{errors.university}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0056D2]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Semester
                </label>
                <input
                  type="text"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0056D2]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0056D2]"
              />
            </div>

            <div className="flex gap-3 mt-2">
              <Button type="submit">Save Changes</Button>
              <Button type="button" variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        )}
    </div>
  );
}

export default Profile;
