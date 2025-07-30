import React from "react";

interface UserIconProps {
  className?: string;
  color?: string;
}

const UserIcon: React.FC<UserIconProps> = ({ color = "#6B7280" }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.6663 5.83341C13.6663 7.85846 12.0247 9.50008 9.99967 9.50008C7.97463 9.50008 6.33301 7.85846 6.33301 5.83341C6.33301 3.80837 7.97463 2.16675 9.99967 2.16675C12.0247 2.16675 13.6663 3.80837 13.6663 5.83341Z"
        stroke={color}
      />
      <path
        d="M17.0741 18.2499H2.92555C2.98039 15.1975 6.04237 12.5833 9.9998 12.5833C13.9572 12.5833 17.0192 15.1975 17.0741 18.2499Z"
        stroke={color}
      />
    </svg>
  );
};

export default UserIcon;
