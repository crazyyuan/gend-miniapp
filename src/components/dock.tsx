import React from "react";

const Dock: React.FC<{ setStep: (step: number) => void; step: number }> = ({
  setStep,
  step,
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex justify-between w-[90%] max-w-sm rounded-3xl shadow py-2 fixed bottom-8 px-8">
        <button className="p-2" onClick={() => setStep(3)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            opacity={step === 3 ? "1" : "0.4"}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.8065 6.20641C4.70663 5.30655 5.92731 4.80104 7.2001 4.80104C8.47288 4.80104 9.69356 5.30655 10.5937 6.20641L12.0001 7.61161L13.4065 6.20641C13.8493 5.74796 14.3789 5.38229 14.9646 5.13072C15.5502 4.87916 16.18 4.74675 16.8174 4.74121C17.4547 4.73567 18.0868 4.85712 18.6767 5.09847C19.2666 5.33982 19.8025 5.69623 20.2532 6.14691C20.7039 6.5976 21.0603 7.13353 21.3016 7.72343C21.543 8.31333 21.6644 8.9454 21.6589 9.58274C21.6534 10.2201 21.5209 10.8499 21.2694 11.4356C21.0178 12.0212 20.6521 12.5508 20.1937 12.9936L12.0001 21.1884L3.8065 12.9936C2.90664 12.0935 2.40112 10.8728 2.40112 9.60001C2.40112 8.32722 2.90664 7.10654 3.8065 6.20641V6.20641Z"
              stroke="black"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className="p-2" onClick={() => setStep(2)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            opacity={step === 2 ? "1" : "0.4"}
          >
            <g>
              <path
                d="M12 21L14.4457 16.3043H19C20.1046 16.3043 21 15.4089 21 14.3043V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V14.3043C3 15.4089 3.89543 16.3043 5 16.3043H9.75L12 21Z"
                stroke="#06070D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </button>
        <button className="p-2" onClick={() => setStep(1)}>
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="#06070D"
            xmlns="http://www.w3.org/2000/svg"
            opacity={step === 1 ? "1" : "0.4"}
          >
            <path d="M18 18C18 18.2652 17.8946 18.5196 17.7071 18.7071C17.5196 18.8946 17.2652 19 17 19H1C0.734784 19 0.48043 18.8946 0.292893 18.7071C0.105357 18.5196 2.4071e-07 18.2652 2.4071e-07 18V7.49C-0.000105484 7.33761 0.0346172 7.18721 0.101516 7.0503C0.168415 6.91338 0.26572 6.79356 0.386 6.7L8.386 0.477997C8.56154 0.341443 8.7776 0.267303 9 0.267303C9.2224 0.267303 9.43846 0.341443 9.614 0.477997L17.614 6.7C17.7343 6.79356 17.8316 6.91338 17.8985 7.0503C17.9654 7.18721 18.0001 7.33761 18 7.49V18ZM16 17V7.978L9 2.534L2 7.978V17H16Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Dock;
