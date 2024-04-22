import { useEffect, useMemo, useState } from "react";
import { Key } from "./Message";
import { crypt } from "@/crypto/rsa";

interface FileProps {
  name: string;
  type: string;
  content: string | Uint8Array;
  incoming: boolean;
  timestamp: string;
  chatKey: Key;
}

export default function File({
  name,
  timestamp,
  incoming,
  content,
  type,
  chatKey,
}: FileProps) {
  // console.log(file);
  // const handleDownload = () => {
  //   if (!file) return;
  //   const url = URL.createObjectURL(file);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = name;
  //   a.click();
  // };
  const file = useMemo(() => {
    if (typeof content === "string") {
      let encryptedMessage = "";
      let decryptedMessage = "";
      for (let i = 0; i < content.length; i++) {
        const messageChar = content.charCodeAt(i);
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
      return { cipherText, plainText: decryptedMessage };
    } else {
      //for uint8array
      let encryptedArray = new Uint8Array(content.length);
      let decryptedArray = new Uint8Array(content.length);
      for (let i = 0; i < content.length; i++) {
        const encryptedChar = crypt(
          content[i],
          BigInt(chatKey.e),
          BigInt(chatKey.n)
        );
        const decryptedChar = crypt(
          encryptedChar,
          BigInt(chatKey.d),
          BigInt(chatKey.n)
        );
        encryptedArray[i] = Number(encryptedChar);
        decryptedArray[i] = Number(decryptedChar);
      }
      return { cipherText: encryptedArray, plainText: decryptedArray };
    }
  }, [content, chatKey]);

  const [decrypted, setDecrypted] = useState<boolean>(false);
  const [displayContent, setDisplayContent] = useState<string | Uint8Array>(
    file.cipherText
  );

  const fileHandler = () => {
    if (decrypted) {
      setDisplayContent(file.cipherText);
    } else {
      setDisplayContent(file.plainText);
    }
    setDecrypted(!decrypted);
  };

  const handleDonwload = () => {
    if (!file) return;
    const url = URL.createObjectURL(new Blob([displayContent], { type }));
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
  };
  return (
    <div
      className={`flex items-start gap-2.5 ${
        incoming ? "justify-start" : "justify-end"
      }`}
    >
      <div className="flex flex-col gap-1">
        <div className="flex flex-col w-full max-w-[326px] border-gray-200 rounded-e-xl rounded-es-xl">
          <div
            className={`flex items-center justify-center rounded-xl p-3 gap-4 ${
              incoming ? "bg-slate-200" : "bg-orange-200"
            }`}
          >
            <div className="">
              <span className="flex items-center gap-2 text-sm font-medium text-gray-900 pb-2">
                {name}
              </span>
            </div>
            <div className="inline-flex self-center items-center">
              <button
                className={`inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 ${
                  incoming
                    ? "bg-gray-50 hover:bg-gray-100"
                    : "bg-orange-50 hover:bg-orange-100"
                } rounded-lg focus:ring-4 focus:outline-none focus:ring-gray-50`}
                type="button"
                onClick={handleDonwload}
              >
                <svg
                  className="w-4 h-4 text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                  <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                </svg>
              </button>
            </div>
          </div>
          <p
            className={`text-xs text-gray-400 ${
              incoming ? "text-left" : "text-right"
            }`}
          >
            {timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}
