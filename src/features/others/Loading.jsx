const Loading = ({ label = "Loading..." }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-black" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default Loading;
