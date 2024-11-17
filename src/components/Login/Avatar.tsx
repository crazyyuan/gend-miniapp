import React, { useState } from "react";
import {
  Avatar1,
  Avatar2,
  Avatar3,
  Avatar4,
  Avatar5,
} from "../../public/avatar";

interface userDateProps {
  username: string;
  birthday: string;
  gender: string;
  lookFor: number;
  acceptedTerms: boolean;
  avatar: number;
  orientation: string;
}

const ProfileCard: React.FC<{
  userData: userDateProps;
  setUserData: (data: userDateProps) => void;
  isMapping: boolean; // mine/ready/mapping
  step: number;
  setIsMapping: () => void;
  goToChat?: () => void;
}> = ({ userData, setUserData, isMapping, step, setIsMapping, goToChat }) => {
  const [mapping, setMapping] = useState(isMapping);

  const generateAvatar = () => {
    switch (userData.avatar) {
      case 1:
        return <Avatar1 />;
      case 2:
        return <Avatar2 />;
      case 3:
        return <Avatar3 />;
      case 4:
        return <Avatar4 />;
      case 5:
        return <Avatar5 />;
      default:
        return null;
    }
  };

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
    setTimeout(() => {
      setMapping(false);
      goToChat && goToChat();
    }, 2500);
  };

  return (
    <div className="w-full h-[260px] flex flex-col items-center justify-between ">
      {step !== 1 && mapping && (
        <div
          className="absolute w-[180px] h-[180px] flex items-center justify-center animate-ping"
          style={{
            boxShadow: "0 0 30px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "50%",
          }}
        ></div>
      )}
      <div
        className="w-[170px] h-[170px] rounded-full mx-auto flex items-center overflow-hidden"
        onClick={step === 1 ? handleRandomAvatar : handleMapping}
      >
        {generateAvatar()}
      </div>

      {step === 1 && (
        <>
          <h2 className="text-2xl font-bold text-center mt-4">
            {userData.username}
          </h2>
          <>
            <p className="text-center text-gray-600">{userData.gender}</p>
            <p className="text-center text-gray-600">{userData.birthday}</p>
            <p className="text-center text-gray-600">{userData.orientation}</p>
          </>
        </>
      )}
      {step !== 1 && !mapping && (
        <>
          <h2 className="text-2xl font-bold text-center mt-4">GENDAR...</h2>
          <p className="text-center text-gray-600">
            Click Nouns to start RADAR
          </p>
        </>
      )}
      {step !== 1 && mapping && (
        <>
          <h2 className="text-2xl font-bold text-center mt-4">GENDAR...</h2>
          <p className="text-center text-gray-600">
            Finding your perfect match...
          </p>
        </>
      )}
    </div>
  );
};

export default ProfileCard;
