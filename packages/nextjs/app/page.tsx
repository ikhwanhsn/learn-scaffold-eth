"use client";

import { useEffect, useState } from "react";
import { abi } from "../contracts/abi";
import { UseReadContractsReturnType, useReadContracts, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

const contractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"; // Ganti dengan alamat contract

export default function Home() {
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");

  // Read data from smart contract
  const {
    data,
    isPending: isFetching,
    refetch,
  }: UseReadContractsReturnType = useReadContracts({
    contracts: [
      {
        address: contractAddress,
        abi,
        functionName: "message",
      },
    ],
  });

  // Write data to smart contract
  const { data: hash, isPending, writeContract } = useWriteContract();

  // Transaction confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Submit form create auction
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      writeContract({
        address: contractAddress,
        abi,
        functionName: "setMessage",
        args: [newMessage],
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Handle successful message
  useEffect(() => {
    if (isConfirmed) {
      refetch();
      setNewMessage("");
    }
  }, [isConfirmed, refetch]);

  useEffect(() => {
    if (data) {
      setMessage(data[0].result as string);
    }
  }, [data]);

  return (
    <div>
      <h1>Scaffold-ETH Message</h1>
      <p>Current Message: {message}</p>
      <form onSubmit={submit}>
        <input
          className="bg-white input input-bordered"
          placeholder="Enter new message"
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
        <button className="text-white btn btn-primary" type="submit">
          Update Message
        </button>
      </form>
    </div>
  );
}
