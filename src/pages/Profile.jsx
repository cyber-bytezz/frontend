import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile, changePassword } from "../services/userService";
import "../styles/profile.css"; // Updated CSS for Profile, including toast styles

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [newProfile, setNewProfile] = useState({ name: "", email: "" });
  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  // Auto-dismiss toast after 3 seconds whenever message changes
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile(data);
      setNewProfile(data); // Set initial values
    } catch (error) {
      setMessage("Failed to load profile.");
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const result = await updateUserProfile(newProfile.name, newProfile.email);
      setMessage(result.message || "Profile updated successfully!");
      fetchProfile(); // Refresh profile
    } catch (error) {
      setMessage("Failed to update profile.");
    }
  };

  const handleChangePassword = async () => {
    try {
      const result = await changePassword(passwordData.oldPassword, passwordData.newPassword);
      setMessage(result.message || "Password changed successfully!");
      setPasswordData({ oldPassword: "", newPassword: "" }); // Clear fields after update
    } catch (error) {
      setMessage("Failed to change password.");
    }
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      
      {/* Inline Toast Notification */}
      {message && <div className="toast">{message}</div>}
      
      <div className="profile-card">
        <h3>Update Profile</h3>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={newProfile.name}
            onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={newProfile.email}
            onChange={(e) => setNewProfile({ ...newProfile, email: e.target.value })}
            placeholder="Enter your email"
          />
        </div>
        <button onClick={handleUpdateProfile} className="btn update-btn">
          Update Profile
        </button>
      </div>

      <div className="profile-card password-card">
        <h3>Change Password</h3>
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password:</label>
          <input
            id="oldPassword"
            type="password"
            value={passwordData.oldPassword}
            onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
            placeholder="Enter old password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            id="newPassword"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            placeholder="Enter new password"
          />
        </div>
        <button onClick={handleChangePassword} className="btn change-btn">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Profile;
