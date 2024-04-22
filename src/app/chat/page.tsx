"use client";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import Message, { Key } from "./component/Message";
import { BsSend } from "react-icons/bs";
import { IoAttach } from "react-icons/io5";
import { useRouter } from "next/navigation";
import File from "./component/File";

interface MessageData {
  message: string;
  sender: string;
  timestamp: string;
}

interface FileData {
  name: string;
  sender: string;
  timestamp: string;
  file?: File;
}

export default function ChatPage(): JSX.Element {
  const [messagesData, setMessagesData] = useState<MessageData[]>([
    { message: "How are you?", sender: "Alice", timestamp: "12:02" },
    { message: "I'm fine", sender: "Bob", timestamp: "12:03" },
  ]);

  const [fileData, setFileData] = useState<FileData[]>([]);

  const [bobMessage, setBobMessage] = useState<string>("");
  const [aliceMessage, setAliceMessage] = useState<string>("");
  const [aliceKey, setAliceKey] = useState<Key>({
    n: "",
    e: "",
    d: "",
  });
  const [bobKey, setBobKey] = useState<Key>({
    n: "",
    e: "",
    d: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const savedAliceKey = localStorage.getItem("aliceKey");
    if (savedAliceKey !== null) {
      const parsedAliceKey = JSON.parse(savedAliceKey);
      setAliceKey(parsedAliceKey);
    }

    const savedBobKey = localStorage.getItem("bobKey");
    if (savedBobKey !== null) {
      const parsedBobKey = JSON.parse(savedBobKey);
      setBobKey(parsedBobKey);
    }

    if (savedAliceKey === null || savedBobKey === null) {
      return router.push("/");
    }
    setIsLoading(false);
  }, [router]);

  const aliceChatContainerRef = useRef<HTMLDivElement>(null);
  const bobChatContainerRef = useRef<HTMLDivElement>(null);

  const addMessage = (message: string, sender: string): void => {
    if (!message) return;
    const timestamp = new Date()
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      })
      .split(" ")[0];
    const newMessage: MessageData = { message, sender, timestamp };
    setMessagesData((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleAliceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addMessage(aliceMessage, "Alice");
      setAliceMessage("");
    }
  };

  const handleBobKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addMessage(bobMessage, "Bob");
      setBobMessage("");
    }
  };

  const handleAttachClick = () => {
    // Trigger file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // Handle file upload
      console.log("File uploaded:", file);
      console.log(file.name);
      const timestamp = new Date()
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
        })
        .split(" ")[0];
      const newFile: FileData = {
        name: file.name,
        sender: "Alice",
        timestamp,
        file,
      };
      setFileData((prevFiles) => [...prevFiles, newFile]);
    }
  };

  useEffect(() => {
    if (aliceChatContainerRef.current) {
      aliceChatContainerRef.current.scrollTo({
        top: aliceChatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    if (bobChatContainerRef.current) {
      bobChatContainerRef.current.scrollTo({
        top: bobChatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messagesData, fileData]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-orange-200 flex items-center justify-center gap-8 min-h-screen max-h-screen p-20">
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="bg-white p-12 flex rounded-lg min-h-[35rem]">
          <div className="w-1/2 p-2 border-r-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-9 aspect-square bg-slate-300 rounded-full relative overflow-hidden">
                  <Image
                    src="/agit.jpeg"
                    fill={true}
                    alt="profile"
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="font-semibold text-xl">Alice</p>
              </div>
              <hr className="my-4"></hr>

              <div
                className="flex flex-col gap-4 h-96 my-2 overflow-auto"
                ref={aliceChatContainerRef}
              >
                {messagesData.map((message, index) => (
                  <Message
                    key={index}
                    message={message.message}
                    incoming={message.sender === "Alice"}
                    timestamp={message.timestamp}
                    sender={message.sender}
                    chatKey={aliceKey}
                  />
                ))}
                {fileData.map((file, index) => (
                  <File
                    key={index}
                    name={file.name}
                    incoming={file.sender === "Alice"}
                    timestamp={file.timestamp}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 border-b-2 border-slate-300 focus:outline-none p-1"
                  placeholder="Type a message"
                  value={bobMessage}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setBobMessage(e.target.value)
                  }
                  onKeyDown={handleBobKeyDown}
                />
                <button
                  className="text-slate-500 rounded-full p-2"
                  onClick={handleAttachClick}
                >
                  <IoAttach size={30} />
                </button>
                <button
                  className="bg-orange-400 text-white rounded-full p-4"
                  onClick={() => {
                    addMessage(bobMessage, "Bob");
                    setBobMessage("");
                  }}
                >
                  <BsSend size={20} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileInputChange}
                />
              </div>
            </div>
          </div>
          <div className="w-1/2 p-2 pl-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-9 aspect-square bg-slate-300 rounded-full relative overflow-hidden">
                  <Image
                    src="/auva.jpeg"
                    fill={true}
                    alt="profile"
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="font-semibold text-xl">Bob</p>
              </div>
              <hr className="my-4"></hr>

              <div
                className="flex flex-col gap-4 h-96 my-2 overflow-auto"
                ref={bobChatContainerRef}
              >
                {messagesData.map((message, index) => (
                  <Message
                    key={index}
                    message={message.message}
                    incoming={message.sender === "Bob"}
                    timestamp={message.timestamp}
                    sender={message.sender}
                    chatKey={bobKey}
                  />
                ))}
                {fileData.map((file, index) => (
                  <File
                    key={index}
                    name={file.name}
                    incoming={file.sender === "Bob"}
                    timestamp={file.timestamp}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 border-b-2 border-slate-300 focus:outline-none p-1"
                  placeholder="Type a message"
                  value={aliceMessage}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setAliceMessage(e.target.value)
                  }
                  onKeyDown={handleAliceKeyDown}
                />
                <button
                  className="text-slate-500 rounded-full p-2"
                  onClick={handleAttachClick}
                >
                  <IoAttach size={30} />
                </button>
                <button
                  className="bg-orange-400 text-white rounded-full p-4"
                  onClick={() => {
                    addMessage(aliceMessage, "Alice");
                    setAliceMessage("");
                  }}
                >
                  <BsSend size={20} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
