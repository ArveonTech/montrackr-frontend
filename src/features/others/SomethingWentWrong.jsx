import { cn } from "@/lib/utils";

const SomethingWentWrong = ({ message, onRetry, classname }) => {
  return (
    <div className={cn(` flex h-full w-full flex-col items-center justify-center gap-4 text-center`, classname)}>
      <h2 className="text-xl font-semibold">😵 Something went wrong</h2>

      <p className="text-sm text-muted-foreground">{message || "Please try again later."}</p>

      {onRetry && (
        <button onClick={onRetry} className="rounded-lg bg-black px-4 py-2 text-white hover:opacity-90">
          Retry
        </button>
      )}
    </div>
  );
};

export default SomethingWentWrong;
