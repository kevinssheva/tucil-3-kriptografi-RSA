"use client";

import { generateKeys } from "@/crypto/rsa";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [bits, setBits] = useState(16); // [1
  const [aliceKey, setAliceKey] = useState({
    n: BigInt(0),
    e: BigInt(0),
    d: BigInt(0),
  });
  const [bobKey, setBobKey] = useState({
    n: BigInt(0),
    e: BigInt(0),
    d: BigInt(0),
  });
  const [isGenerated, setIsGenerated] = useState(false);

  useEffect(() => {
    const savedAliceKey = localStorage.getItem("aliceKey");
    if (savedAliceKey !== null) {
      const parsedAliceKey = JSON.parse(savedAliceKey);
      setAliceKey({
        n: BigInt(parsedAliceKey.n),
        e: BigInt(parsedAliceKey.e),
        d: BigInt(parsedAliceKey.d),
      });
    }

    const savedBobKey = localStorage.getItem("bobKey");
    if (savedBobKey !== null) {
      const parsedBobKey = JSON.parse(savedBobKey);
      setBobKey({
        n: BigInt(parsedBobKey.n),
        e: BigInt(parsedBobKey.e),
        d: BigInt(parsedBobKey.d),
      });
    }

    if (savedAliceKey !== null && savedBobKey !== null) {
      setIsGenerated(true);
    }
  }, []);

  const handleGenerateKey = () => {
    setIsGenerated(true);
    const { publicKey: alicePublicKey, privateKey: alicePrivateKey } =
      generateKeys(bits);
    setAliceKey({
      n: alicePublicKey[1],
      e: alicePublicKey[0],
      d: alicePrivateKey,
    });
    const { publicKey: bobPublicKey, privateKey: bobPrivateKey } =
      generateKeys(bits);
    setBobKey({
      n: bobPublicKey[1],
      e: bobPublicKey[0],
      d: bobPrivateKey,
    });
  };

  const handleJumpToChat = () => {
    localStorage.setItem(
      "aliceKey",
      JSON.stringify({
        n: aliceKey.n.toString(),
        e: aliceKey.e.toString(),
        d: aliceKey.d.toString(),
      })
    );
    localStorage.setItem(
      "bobKey",
      JSON.stringify({
        n: bobKey.n.toString(),
        e: bobKey.e.toString(),
        d: bobKey.d.toString(),
      })
    );
  };

  return (
    <div className="w-full h-screen bg-orange-300 flex items-center justify-center">
      <div className="bg-[#EEEEEE] rounded-lg px-10 py-7 w-[60%]">
        <h1 className="text-4xl font-bold">RSA Chat</h1>
        <div className="flex gap-3 my-4">
          <button
            className="bg-orange-200 text-black font-bold py-2 px-4 rounded shadow-md"
            onClick={handleGenerateKey}
          >
            {isGenerated ? "Regenerate Key" : "Generate Key"}
          </button>
          <select
            value={bits}
            onChange={(e) => setBits(parseInt(e.target.value))}
          >
            <option value={16}>16 bits</option>
            <option value={32}>32 bits</option>
            <option value={64}>64 bits</option>
            <option value={128}>128 bits</option>
          </select>
        </div>
        {isGenerated && (
          <div className="flex flex-col my-4">
            <div className="w-full flex gap-3">
              <div className="w-1/2">
                <h1 className="font-bold text-lg mb-3">Alice</h1>
                <div className="w-full flex flex-col gap-3">
                  <div className="w-full flex">
                    <p className="w-[15%] font-semibold flex items-center">N</p>
                    <p className="w-[85%] overflow-x-auto">
                      {aliceKey.n.toString()}
                    </p>
                  </div>
                  <div className="w-full flex">
                    <p className="w-[15%] font-semibold flex items-center">E</p>
                    <p className="w-[85%] overflow-x-auto">
                      {aliceKey.e.toString()}
                    </p>
                  </div>
                  <div className="w-full flex">
                    <p className="w-[15%] font-semibold flex items-center">D</p>
                    <p className="w-[85%] overflow-x-auto">
                      {aliceKey.d.toString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[2px] bg-[#c8c8c8]"></div>
              <div className="w-1/2">
                <h1 className="font-bold text-lg mb-3">Bob</h1>
                <div className="w-full flex flex-col gap-3">
                  <div className="w-full flex">
                    <p className="w-[15%] font-semibold flex items-center">N</p>
                    <p className="w-[85%] overflow-x-auto">
                      {bobKey.n.toString()}
                    </p>
                  </div>
                  <div className="w-full flex">
                    <p className="w-[15%] font-semibold flex items-center">E</p>
                    <p className="w-[85%] overflow-x-auto">
                      {bobKey.e.toString()}
                    </p>
                  </div>
                  <div className="w-full flex">
                    <p className="w-[15%] font-semibold flex items-center">D</p>
                    <p className="w-[85%] overflow-x-auto">
                      {bobKey.d.toString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Link
              href="/chat"
              className="bg-orange-200 text-black font-bold py-2 px-4 rounded shadow-md mt-7 w-full text-center"
              onClick={handleJumpToChat}
            >
              Jump to Chat
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
