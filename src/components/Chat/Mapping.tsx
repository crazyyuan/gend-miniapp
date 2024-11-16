import React, { useState } from "react";

interface userDateProps {
  username: string;
  birthday: string;
  gender: string;
  lookFor: string;
  acceptedTerms: boolean;
}

const Mapping: React.FC<{ avatar: number }> = ({ avatar }) => {
  const [avatarIndex, setAvatarIndex] = useState(1);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="bg-white p-8 max-w-sm w-full mb-16">mapping</div>
    </div>
  );
};

export default Mapping;
