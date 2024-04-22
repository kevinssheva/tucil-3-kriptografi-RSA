import { useEffect, useState } from "react";

interface FileProps {
  name: string;
  timestamp: string;
  incoming: boolean;
  file?: File;
}

export default function File({ name, timestamp, incoming, file }: FileProps) {
  console.log(file)
    const handleDownload = () => {
    if (!file) return;
    const url = URL.createObjectURL(file);
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
              <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white pb-2">
                {name}
              </span>
            </div>
            <div className="inline-flex self-center items-center">
              <button
                className={`inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 ${
                  incoming
                    ? "bg-gray-50 hover:bg-gray-100"
                    : "bg-orange-50 hover:bg-orange-100"
                } rounded-lg focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600`}
                type="button"
                onClick={handleDownload}
              >
                <svg
                  className="w-4 h-4 text-gray-900 dark:text-white"
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
