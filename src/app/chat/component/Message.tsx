interface MessageProps {
  message: string;
  incoming: boolean;
}

export default function Message({ message, incoming }: MessageProps) {
  return (
    <div
      className={`${
        incoming ? "bg-slate-200" : "bg-orange-200"
      } rounded-full p-2 w-fit
      ${incoming ? "" : "ml-auto"}
      `}
    >
      <h1>{message}</h1>
    </div>
  );
}
