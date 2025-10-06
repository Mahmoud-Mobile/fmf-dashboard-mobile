import React, { useState } from "react";

export const useTogglePasswordVisibility = () => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [passwordIcon, setPasswordIcon] = useState("eye-outline");

  const [isPassword2Visible, setPassword2Visibility] = useState(false);
  const [password2Icon, setPassword2Icon] = useState("eye-outline");

  const [isPassword3Visible, setPassword3Visibility] = useState(false);
  const [password3Icon, setPassword3Icon] = useState("eye-outline");

  const togglePasswordVisibility = (index) => {
    if (index === 1) {
      if (passwordIcon === "eye-off-outline") {
        setPasswordIcon("eye-outline");
        setPasswordVisibility(!isPasswordVisible);
      } else if (passwordIcon === "eye-outline") {
        setPasswordIcon("eye-off-outline");
        setPasswordVisibility(!isPasswordVisible);
      }
    } else if (index === 2) {
      if (password2Icon === "eye-off-outline") {
        setPassword2Icon("eye-outline");
        setPassword2Visibility(!isPassword2Visible);
      } else if (password2Icon === "eye-outline") {
        setPassword2Icon("eye-off-outline");
        setPassword2Visibility(!isPassword2Visible);
      }
    } else if (index === 3) {
      if (password3Icon === "eye-off-outline") {
        setPassword3Icon("eye-outline");
        setPassword3Visibility(!isPassword3Visible);
      } else if (password3Icon === "eye-outline") {
        setPassword3Icon("eye-off-outline");
        setPassword3Visibility(!isPassword3Visible);
      }
    }
  };

  return {
    isPasswordVisible,
    passwordIcon,
    togglePasswordVisibility: () => togglePasswordVisibility(1),
    isPassword2Visible,
    password2Icon,
    togglePasswordVisibility2: () => togglePasswordVisibility(2),
    isPassword3Visible,
    password3Icon,
    togglePasswordVisibility3: () => togglePasswordVisibility(3),
  };
};

export default useTogglePasswordVisibility;
