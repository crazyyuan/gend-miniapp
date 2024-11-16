import React, { useState } from "react";

interface userDateProps {
  avatar: number;
  username: string;
  birthday: string;
  gender: string;
  lookFor: string;
  acceptedTerms: boolean;
}

const ProfileCard: React.FC<{
  userData: userDateProps;
  setUserData: (data: userDateProps) => void;
  isMapping: boolean; // mine/ready/mapping
  step: number;
  setIsMapping: () => void;
}> = ({ userData, setUserData, isMapping, step, setIsMapping }) => {
  const [mapping, setMapping] = useState(isMapping);

  const handleRandomAvatar = () => {
    const res = {
      ...userData,
      avatar: (userData.avatar % 5) + 1,
    };

    setUserData(res);
  };

  const handleMapping = () => {
    if (mapping) return;

    setIsMapping();
    setMapping(true);
  };

  return (
    <div className="w-full h-[260px] flex flex-col items-center justify-between">
      <img
        src={`../../public/avatar/avatar-${(userData.avatar % 5) + 1}.svg`}
        alt="Profile"
        className="w-[170px] h-[170px] rounded-full mx-auto"
        onClick={step === 1 ? handleRandomAvatar : handleMapping}
      />
      {step === 1 && (
        <>
          <h2 className="text-2xl font-bold text-center mt-4">
            {userData.username}
          </h2>
          <>
            <p className="text-center text-gray-600">{userData.gender}</p>
            <p className="text-center text-gray-600">{userData.lookFor}</p>
          </>
        </>
      )}
      {step !== 1 && !mapping && (
        <>
          <h2 className="text-2xl font-bold text-center mt-4">GENDAR...</h2>
          <p className="text-center text-gray-600">Click the Nouns</p>
        </>
      )}
      {step !== 1 && mapping && (
        <>
          <h2 className="text-2xl font-bold text-center mt-4">GENDAR...</h2>
          <p className="text-center text-gray-600">
            We are looking for the person who are matched with you!
          </p>
        </>
      )}
    </div>
  );
};

export default ProfileCard;
