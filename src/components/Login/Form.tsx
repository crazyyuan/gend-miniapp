import React, { useState } from "react";
import { MiniKit } from "@worldcoin/minikit-js";

interface userDateProps {
  username: string;
  birthday: string;
  gender: string;
  lookFor: number;
  acceptedTerms: boolean;
  avatar: number;
  orientation: string;
}

const Form: React.FC<{
  setUserData: (data: userDateProps) => void;
  goNext: () => void;
}> = ({ setUserData, goNext }) => {
  const [formData, setFormData] = useState({
    username: "",
    birthday: "",
    gender: "Man",
    lookFor: 20,
    orientation: "Heterosexual",
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

  const genderList = ["Man", "Female", "Bisexual", "Gay", "Lesbian"];
  const orientationList = [
    "Heterosexual",
    "Pansexual",
    "Homosexual",
    "Bisexual",
  ];

  const signInWithWallet = async () => {
    if (!MiniKit.isInstalled()) {
      return;
    }
    const nonce = crypto.randomUUID().replace(/-/g, "");
    const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
      nonce: nonce,
      requestId: "0", // Optional
      expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      statement:
        "This is my statement and here is a link https://worldcoin.com/apps",
    });
    if (finalPayload.status === "error") {
      return;
    } else {
      const walletAddress = MiniKit.walletAddress;
      if (walletAddress) {
        const responseData = await sendLogin(walletAddress);
        if (responseData) {
          const { userId, token } = responseData;
          localStorage.setItem("userId", userId);
          localStorage.setItem("token", token);
          console.log("Saved to local storage:", { userId, token });
        }
      }
    }
  };

  const sendLogin = async (wallet: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_NEXTAUTH_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet: wallet,
        }),
      });
      const data = await res.json();
      console.log("Response data:", data);

      return data;
    } catch (error: unknown) {
      console.log("Error sending login", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await signInWithWallet();

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
        {genderList.map((item, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              name="gender"
              value={item}
              checked={formData.gender === item}
              onChange={handleChange}
              className="mr-2"
            />
            <label>{item}</label>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-2">Sexual Orientation</label>
        {orientationList.map((item, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              name="orientation"
              value={item}
              checked={formData.orientation === item}
              onChange={handleChange}
              className="mr-2"
            />
            <label>{item}</label>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-2">Age Range</label>
        <div className="flex space-x-2">
          <input
            type="number"
            name="minAge"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            min={0}
            max={120}
            placeholder="Min Age"
          />
          <input
            type="number"
            name="maxAge"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            min={0}
            max={120}
            placeholder="Max Age"
          />
        </div>
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
