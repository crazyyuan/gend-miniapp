import { MiniKit } from "@worldcoin/minikit-js";
import { useCallback, useState } from "react";

const sendLogin = async (wallet: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wallet: wallet,
      }),
    });
    if (res.status === 200) {
      console.log("login success!");
    }
  } catch (error: unknown) {
    console.log("Error sending login", error);
    return null;
  }
};

const handleLogin = async () => {
  if (!MiniKit.isInstalled()) {
    console.error("MiniKit is not installed");
    return;
  }
  const user = MiniKit.user;
  const wallet = user?.walletAddress;
  if (wallet) {
    await sendLogin(wallet);
  }
};

export const LoginBlock = () => {
  return (
    <button className="bg-blue-500 p-4" onClick={handleLogin}>
      Login
    </button>
  );
};
