import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import DialogSubscription from "./DialogSubscription";
import Loading from "@/features/others/Loading";
import FormSubscription from "./FormSubscription";
import { useState } from "react";

const recurringIcons = {
  adobe: "/images/icons/adobe-cloud.svg",
  canva: "/images/icons/canva.svg",
  coursera: "/images/icons/coursera.svg",
  disney: "/images/icons/disney+.svg",
  other: "/images/icons/elipsis.svg",
  "google-one": "/images/icons/google-one.svg",
  "hbo-max": "/images/icons/hbomax.svg",
  microsoft: "/images/icons/microsoft.svg",
  netflix: "/images/icons/netflix.svg",
  spotify: "/images/icons/spotify.svg",
  udemy: "/images/icons/udemy.svg",
  youtube: "/images/icons/youtube.svg",
};

const handleIcons = (title) => {
  return recurringIcons[title] || recurringIcons["other"];
};

const isSubscriptionExpiringSoon = (nextPaymentDate) => {
  const currentDate = new Date();
  const nextPayment = new Date(nextPaymentDate);
  const timeDifference = nextPayment - currentDate;
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference <= 7;
};

const CardComponent = ({ item, className, isLoadingDelete, mutateDeleteSubscription, handleSubmitSubscription, mutatePaySubscription }) => {
  const [openEdit, setOpenEdit] = useState(false);

  const cardTemplate = () => {
    return (
      <div
        className={cn(
          "px-5 flex flex-col rounded-xl border py-4 shadow-sm justify-between cursor-pointer",
          item.status === "pause"
            ? "bg-amber-500 text-black"
            : item.status === "canceled"
              ? "bg-gray-400 text-gray-800 cursor-not-allowed"
              : isSubscriptionExpiringSoon(item?.nextPayment)
                ? "bg-destructive text-destructive-foreground"
                : "bg-card text-card-foreground hover:shadow-md transition-shadow duration-300",
          className,
        )}
      >
        <header className="flex justify-between mb-3">
          <Badge className={(cn(""), isSubscriptionExpiringSoon(item?.nextPayment) === true && "border-white")} variant={isSubscriptionExpiringSoon(item?.nextPayment) === true && "destructive"}>
            {new Date(item?.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Badge>
          <Badge
            className={cn("text-[11px]", isSubscriptionExpiringSoon(item?.nextPayment) && "border-white")}
            variant={isSubscriptionExpiringSoon(item?.nextPayment) && "destructive"}
            onClick={(e) => {
              e.stopPropagation();
              mutatePaySubscription({
                idSubscription: item?._id,
                dataTransactions: { user_id: item?.user_id },
              });
            }}
          >
            Mark is paid
            <Check />
          </Badge>
        </header>
        <main className="flex items-center gap-2 capitalize mb-3">
          <span className="flex justify-center items-center gap-3">
            <img src={handleIcons(item?.title)} alt={item.svg} className="w-5" />
            <h1 className="capitalize font-medium text-xl line-clamp-1">{item?.title}</h1>
          </span>
          <p className="opacity-60">{item?.interval}</p>
        </main>
        <p className="font-JetBrains text-[14px] lg:text-md">Rp {Number(item?.amount).toLocaleString("id-ID")}</p>
        <hr className="my-2 border-t" />
        <p className="text-[13px]">
          Next payment:{" "}
          {new Date(item?.nextPayment).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    );
  };

  return (
    <>
      {openEdit && <FormSubscription openSubcription={openEdit} setOpenSubcription={setOpenEdit} handleSubmitSubscription={handleSubmitSubscription} dataEditSubcription={item} onClose={() => setOpenEdit(false)} />}

      <AlertDialog>
        {item.status === "active" || item.status === "pause" ? <AlertDialogTrigger asChild>{cardTemplate()}</AlertDialogTrigger> : <div className="opacity-50 pointer-events-none">{cardTemplate()}</div>}
        <AlertDialogTrigger asChild></AlertDialogTrigger>
        <AlertDialogContent>
          {isLoadingDelete ? (
            <Loading />
          ) : (
            <>
              <AlertDialogHeader className={`mb-2`}>
                <AlertDialogTitle className={`border-b`}>Subcription</AlertDialogTitle>
                <AlertDialogDescription></AlertDialogDescription>
                <div className="text-muted-foreground text-sm space-y-1">
                  <DialogSubscription item={item} />
                </div>
              </AlertDialogHeader>
              <div className="flex justify-between">
                <div className="space-x-2">
                  <Button className={`cursor-pointer`} onClick={() => setOpenEdit(true)}>
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    className={`cursor-pointer`}
                    onClick={(e) => {
                      handleSubmitSubscription(e, { ...item, status: item.status === "active" ? "pause" : "active" }, "edit", item && item?._id);
                    }}
                  >
                    {item.status === "pause" ? "Play" : "Pause"}
                  </Button>
                  <AlertDialogAction asChild>
                    <Button variant="destructive" className={`cursor-pointer`} onClick={() => mutateDeleteSubscription({ idSubscription: item._id, dataTransactions: { user_id: item.user_id } })}>
                      Delete
                    </Button>
                  </AlertDialogAction>
                </div>
                <AlertDialogCancel className={`cursor-pointer`}>Cancel</AlertDialogCancel>
              </div>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CardComponent;
