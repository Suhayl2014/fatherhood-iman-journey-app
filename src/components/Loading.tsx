import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-islamic-green" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
};

export default Loading; 