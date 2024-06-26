"use client";

import { generateKeys } from "@/crypto/rsa";
import Link from "next/link";
import { useEffect, useState } from "react";

interface KeyData {
  n: BigInt;
  e: BigInt;
  d: number;
}

export default function Home() {
  const [bits, setBits] = useState(64); // [1
  const [aliceKey, setAliceKey] = useState({
    n: BigInt(0),
    e: BigInt(0),
    d: 0,
  });
  const [bobKey, setBobKey] = useState({
    n: BigInt(0),
    e: BigInt(0),
    d: 0,
  });
  const [isGenerated, setIsGenerated] = useState(false);

  useEffect(() => {
    const savedAliceKey = localStorage.getItem("aliceKey");
    if (savedAliceKey !== null) {
      const parsedAliceKey = JSON.parse(savedAliceKey);
      setAliceKey({
        n: BigInt(parsedAliceKey.n),
        e: BigInt(parsedAliceKey.e),
        d: parsedAliceKey.d,
      });
    }

    const savedBobKey = localStorage.getItem("bobKey");
    if (savedBobKey !== null) {
      const parsedBobKey = JSON.parse(savedBobKey);
      setBobKey({
        n: BigInt(parsedBobKey.n),
        e: BigInt(parsedBobKey.e),
        d: parsedBobKey.d,
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

  const handleSaveKey = (keyData: KeyData, fileName: string) => {
    const dataPrivate = JSON.stringify({
      e: keyData.e.toString(),
      n: keyData.n.toString(),
    });

    const base64Priv = btoa(dataPrivate);

    const blob = new Blob([base64Priv], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName + "_private" + ".txt";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);

    const dataPublic = JSON.stringify({
      d: keyData.d.toString(),
      n: keyData.n.toString(),
    });

    const base64Pub = btoa(dataPublic);

    const blob2 = new Blob([base64Pub], { type: "application/json" });
    const url2 = window.URL.createObjectURL(blob2);
    const a2 = document.createElement("a");
    a2.href = url2;
    a2.download = fileName + "_public" + ".txt";
    document.body.appendChild(a2);
    a2.click();
    window.URL.revokeObjectURL(url2);

    return;
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
            <option value={64}>64 bits</option>
            <option value={128}>128 bits</option>
            <option value={256}>256 bits</option>
            <option value={512}>512 bits</option>
            <option value={1024}>1024 bits</option>
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
                <button
                  className="p-2 bg-orange-200 rounded-lg font-semibold mt-4"
                  onClick={() => handleSaveKey(aliceKey, "alice")}
                >
                  Save Alice's Key
                </button>
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
                <button
                  className="p-2 bg-orange-200 rounded-lg font-semibold mt-4"
                  onClick={() => handleSaveKey(bobKey, "bob")}
                >
                  Save Bob's Key
                </button>
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
