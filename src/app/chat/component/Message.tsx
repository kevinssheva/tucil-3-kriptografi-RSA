"use client";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import { useState } from "react";
import { crypt } from "@/crypto/rsa";
import test from "node:test";

interface MessageProps {
  message: string;
  incoming: boolean;
  timestamp: string;
  sender: string;
}

interface Key {
  n: string;
  e: string;
  d: string;
}

export default function Message({
  message,
  incoming,
  timestamp,
  sender,
}: MessageProps) {
  const key: Key | null =
    sender === "Alice"
      ? JSON.parse(localStorage.getItem("aliceKey") || "")
      : JSON.parse(localStorage.getItem("bobKey") || "");

  //initial encryption & decryption
  let encryptedMessage = "";
  let decryptedMessage = "";
  if (key) {
    for (let i = 0; i < message.length; i++) {
      const messageChar = message.charCodeAt(i);
      const encryptedChar = crypt(messageChar, BigInt(key.e), BigInt(key.n));
      const decryptChar = crypt(encryptedChar, BigInt(key.d), BigInt(key.n));

      const tempEncryptChar = String.fromCharCode(Number(encryptedChar));
      encryptedMessage += tempEncryptChar;

      const tempDecryptChar = String.fromCharCode(Number(decryptChar));
      decryptedMessage += tempDecryptChar;
    }

    const testmessage = "resting in bali";
    let encrypttest = "";
    let decrypttest = "";
    for (let i = 0; i < testmessage.length; i++) {
      const encrypt = crypt(
        testmessage.charCodeAt(i),
        BigInt(key.e),
        BigInt(key.n)
      );
      encrypttest += String.fromCharCode(Number(encrypt));

      const decrypt = crypt(encrypt, BigInt(key.d), BigInt(key.n));
      decrypttest += String.fromCharCode(Number(decrypt));
    }
    console.log(encrypttest, decrypttest);
  }

  const [decrypted, setDecrypted] = useState<boolean>(false);
  const [displaymessage, setDisplayMessage] =
    useState<string>(encryptedMessage);

  const messageHandler = () => {
    if (decrypted) {
      setDisplayMessage(encryptedMessage);
    } else {
      setDisplayMessage(decryptedMessage);
    }
    setDecrypted(!decrypted);
  };

  const handleDonwload = () => {
    const element = document.createElement("a");
    const file = new Blob([displaymessage], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "message.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className={`${incoming ? "w-fit" : ""}`}>
      <div
        className={`${
          incoming ? "bg-slate-200" : "bg-orange-200"
        } rounded-lg p-3
        ${incoming ? "" : "ml-auto w-fit"}
        `}
        onClick={messageHandler}
      >
        <h1>{incoming ? displaymessage : message}</h1>
      </div>
      <div
        className={`flex gap-6 ${
          !incoming ? "justify-end" : "justify-between items-center"
        }`}
      >
        <p
          className={`text-xs text-gray-400 ${
            incoming ? "text-left" : "text-right"
          }`}
        >
          {timestamp}
        </p>

        {incoming ? (
          <div className="flex gap-2">
            <MdOutlineFileDownload
              size={20}
              className="cursor-pointer"
              onClick={handleDonwload}
            />
            {decrypted ? (
              <FaRegEye
                size={20}
                className="cursor-pointer"
                onClick={messageHandler}
              />
            ) : (
              <FaRegEyeSlash
                size={20}
                className="cursor-pointer"
                onClick={messageHandler}
              />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
