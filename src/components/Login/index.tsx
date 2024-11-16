import { MiniKit } from "@worldcoin/minikit-js";
// import { useCallback, useState } from "react";

const signInWithWallet = async () => {
  if (!MiniKit.isInstalled()) {
    return;
  }

  // const res = await fetch(`/api/nonce`)
  // const { nonce } = await res.json()

  const nonce = crypto.randomUUID().replace(/-/g, "");

  const { commandPayload, finalPayload } =
    await MiniKit.commandsAsync.walletAuth({
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
    console.log("commandPayload", commandPayload);

    const walletAddress = MiniKit.walletAddress;
    console.log("walletAddress", walletAddress);
    await handleLogin();

    // const response = await fetch('/api/complete-siwe', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     payload: finalPayload,
    //     nonce,
    //   }),
    // })
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
  console.log("handleLogin", user, MiniKit.appId);
  const wallet = user?.walletAddress;
  if (wallet) {
    await sendLogin(wallet);
  }
};

export const LoginBlock = () => {
  return (
    <button className="bg-blue-500 p-4" onClick={signInWithWallet}>
      Login
    </button>
  );
};
