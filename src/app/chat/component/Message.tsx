"use client";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import { useMemo, useState } from "react";
import { crypt } from "@/crypto/rsa";

interface MessageProps {
  message: string;
  incoming: boolean;
  timestamp: string;
  sender: string;
  chatKey: Key;
}

export interface Key {
  n: string;
  e: string;
  d: string;
}

export default function Message({
  message,
  incoming,
  timestamp,
  sender,
  chatKey,
}: MessageProps) {
  const divideLongText = (text: string, maxChar: number) => {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
      count++;
      if (text[i] === " " || text[i] === "\n") {
        count = 0;
      }
      if (count === maxChar) {
        text = text.slice(0, i) + "\n" + text.slice(i);
        count = 0;
      }
    }
    return text;
  };

  const text = useMemo(() => {
    console.log(chatKey)
    let encryptedMessage = "";
    let decryptedMessage = "";
    for (let i = 0; i < message.length; i++) {
      const messageChar = message.charCodeAt(i);
      const encryptedChar = crypt(
        messageChar,
        BigInt(chatKey.e),
        BigInt(chatKey.n)
      );
      const decryptChar = crypt(
        encryptedChar,
        BigInt(chatKey.d),
        BigInt(chatKey.n)
      );
      encryptedMessage += encryptedChar.toString();
      decryptedMessage += String.fromCharCode(Number(decryptChar));
    }

    let cipherText = btoa(encryptedMessage);
    cipherText = divideLongText(cipherText, 45);
    decryptedMessage = divideLongText(decryptedMessage, 65);
    return { cipherText, plainText: decryptedMessage };
  }, [message, chatKey]);

  const [decrypted, setDecrypted] = useState<boolean>(false);
  const [displaymessage, setDisplayMessage] = useState<string>(text.cipherText);

  const messageHandler = () => {
    if (decrypted) {
      setDisplayMessage(text.cipherText);
    } else {
      setDisplayMessage(text.plainText);
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
    <div className={`w-full`}>
      <div
        className={`flex flex-col w-fit max-w-[90%] ${!incoming && "ml-auto"}`}
      >
        <div
          className={`${
            incoming ? "bg-slate-200" : "bg-orange-200"
          } rounded-lg p-3
        ${incoming ? "" : "ml-auto"}
        `}
          onClick={messageHandler}
        >
          <h1>{incoming ? displaymessage : text.plainText}</h1>
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
    </div>
  );
}
