import { Loader2 } from "lucide-react";

const BlankLoadingPage = () => {
  return (
    <div className="flex h-svh w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
};

export default BlankLoadingPage;
