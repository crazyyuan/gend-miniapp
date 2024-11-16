import React, { useState } from "react";

interface userDateProps {
  username: string;
  birthday: string;
  gender: string;
  lookFor: string;
  acceptedTerms: boolean;
  avatar: number;
}

const Form: React.FC<{
  setUserData: (data: userDateProps) => void;
  goNext: () => void;
}> = ({ setUserData, goNext }) => {
  const [formData, setFormData] = useState({
    username: "",
    birthday: "",
    gender: "Man",
    lookFor: "Man | 20 - 30",
    acceptedTerms: false,
    avatar: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goNext();
    setUserData(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold mb-6">Hi, Welcome!</h1>
      <div className="mb-4">
        <label className="block text-sm mb-2">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Your username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-2">Your Birthday</label>
        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-2">Your Gender</label>
        <input
          type="text"
          name="gender"
          value={formData.gender}
          readOnly
          className="w-full p-2 border border-gray-300 rounded bg-gray-100"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-2">Look For</label>
        <input
          type="text"
          name="lookFor"
          value={formData.lookFor}
          readOnly
          className="w-full p-2 border border-gray-300 rounded bg-gray-100"
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="acceptedTerms"
            checked={formData.acceptedTerms}
            onChange={handleChange}
            className="mr-2"
          />
          I accept the terms and privacy policy
        </label>
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Next Step
      </button>
    </form>
  );
};

export default Form;
