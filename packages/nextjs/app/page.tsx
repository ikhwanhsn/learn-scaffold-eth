"use client";

import { useEffect, useState } from "react";
import { abi } from "../contracts/abi";
import { useReadContract, useWriteContract } from "wagmi";

const contractAddress = "0x1234567890abcdef1234567890abcdef12345678"; // Ganti dengan alamat contract

export default function Home() {
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const { data: currentMessage } = useReadContract({
    address: contractAddress,
    abi,
    functionName: "message",
  });

  useEffect(() => {
    if (currentMessage) {
      setMessage(currentMessage.toString());
    }
  }, [currentMessage]);

  return (
    <div>
      <h1>Scaffold-ETH Message</h1>
      <p>Current Message: {message}</p>
      <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} />
      <button>Update Message</button>
    </div>
  );
}
