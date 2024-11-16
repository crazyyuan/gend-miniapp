import { useEffect, useState } from "react";
import Form from "./components/Login/Form";
import ProfileCard from "./components/Login/Avatar";
import Dock from "./components/dock";
import ChatPage from "./components/Chat/Chat";

interface userDateProps {
  username: string;
  birthday: string;
  gender: string;
  lookFor: string;
  acceptedTerms: boolean;
  avatar: number;
}

export default function App() {
  const [userData, setUserData] = useState<userDateProps>();

  const [step, setStep] = useState(0);

  const [isMapping, setIsMapping] = useState(false);

  useEffect(() => {
    setIsMapping(false);
  }, [step]);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Form setUserData={setUserData} goNext={() => setStep(1)} />;
      case 1:
        return (
          <>
            <ProfileCard
              userData={userData as userDateProps}
              setUserData={setUserData}
              isMapping={false}
              step={step}
              setIsMapping={() => {}}
            />
            <Dock setStep={setStep} step={step} />
          </>
        );
      case 2:
        return (
          <>
            <ChatPage />
            <Dock setStep={setStep} step={step} />
          </>
        );

      case 3:
        return (
          <>
            <ProfileCard
              userData={userData as userDateProps}
              setUserData={setUserData}
              isMapping={false}
              step={step}
              setIsMapping={() => {
                setIsMapping(true);
              }}
            />
            {isMapping ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="flex justify-between w-[90%] max-w-sm rounded-3xl py-2 fixed bottom-8 px-8">
                  <div className="h-[60px] w-[60px] shadow rounded-full flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.0002 19.3688C18.3915 17.9836 20.0002 15.3947 20.0002 12.4295C20.0002 9.06753 17.9321 6.18926 15.0002 5.00086M15.0002 16.9357V20.9412H19.0002M8.00024 5.57241C5.60904 6.95755 4.00024 9.54647 4.00024 12.5117C4.00024 15.8736 6.06841 18.7519 9.00024 19.9403M9.00024 8.00549L9.00024 4L5.00024 4"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div
                    className="h-[60px] w-[60px] shadow rounded-full flex items-center justify-center"
                    onClick={() => {
                      setIsMapping(false);
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                        fill="#1D1B20"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <Dock setStep={setStep} step={step} />
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-2 gap-y-3">
      {renderStep()}
    </main>
  );
}
