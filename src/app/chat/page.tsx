"use client"
import { useState, useRef, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import Message from "./component/Message";
import { BsSend } from "react-icons/bs";
import { IoAttach } from "react-icons/io5";

interface MessageData {
  message: string;
  sender: string;
}

export default function ChatPage(): JSX.Element {
  const [messagesData, setMessagesData] = useState<MessageData[]>([
    { message: "Hello", sender: "Alice" },
    { message: "Hi", sender: "Bob" },
    { message: "How are you?", sender: "Alice" },
    { message: "I'm fine", sender: "Bob" },
    { message: "Good to hear that", sender: "Alice" },
    { message: "How about you?", sender: "Bob" },
    { message: "I'm good too", sender: "Alice" },
    { message: "That's great!", sender: "Bob" },
  ]);

  const [bobMessage, setBobMessage] = useState<string>("");
  const [aliceMessage, setAliceMessage] = useState<string>("");

  const aliceChatContainerRef = useRef<HTMLDivElement>(null);
  const bobChatContainerRef = useRef<HTMLDivElement>(null);

  const addMessage = (message: string, sender: string): void => {
    if (!message) return;
    const newMessage: MessageData = { message, sender };
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

  useEffect(() => {
    // Scroll to the bottom of the chat after messages are updated
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
  }, [messagesData]);

  return (
    <div className="bg-orange-200 flex flex-col gap-8 min-h-screen p-20">
      <div className="bg-white p-12 flex rounded-lg min-h-[35rem]">
        <div className="w-1/2 p-2 border-r-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 aspect-square bg-slate-300 rounded-full relative overflow-hidden">
                <Image
                  src="/yalz.png"
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
              <button className="text-slate-500 rounded-full p-2">
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
              <button className="text-slate-500 rounded-full p-2">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}