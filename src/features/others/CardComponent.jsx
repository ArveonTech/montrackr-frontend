import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { CardDescription, CardTitle } from "@/components/ui/card";

import { ShoppingCart, Sparkles, HeartPulse, Users, Wallet, Briefcase, Award, Laptop, Store, Gift, Ellipsis } from "lucide-react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import DialogTransactions from "./DialogTransactions";
import Loading from "./Loading";

const categoryIcons = {
  essentials: <ShoppingCart />,
  lifestyle: <Sparkles />,
  health: <HeartPulse />,
  "family & social": <Users />,
  financial: <Wallet />,

  salary: <Briefcase />,
  bonus: <Award />,
  freelance: <Laptop />,
  business: <Store />,
  gift: <Gift />,

  others: <Ellipsis />,
};

const CardComponent = ({ item, className, isLoadingDelete, handleDeleteTransactions, handleEdit }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div
          className={cn(
            "h-28 px-5 bg-card text-card-foreground flex flex-col rounded-xl border py-4 shadow-sm justify-between cursor-pointer",
            item?.type === "income" ? "bg-primary/10 text-primary-foreground" : "bg-destructive/95 text-destructive-foreground",
            className
          )}
        >
          <div className="flex justify-between gap-2">
            <div className="flex gap-2 items-center">
              <CardDescription>{categoryIcons[item?.category]}</CardDescription>
              <CardTitle className={`line-clamp-1`}>{item?.title}</CardTitle>
            </div>

            <Badge className={item?.type === "income" ? "bg-primary/50" : "bg-white"}>
              {new Date(item?.date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Badge>
          </div>

          <p className="font-JetBrains text-[17px] lg:text-md">
            {item.type === "income" ? "+" : "-"}Rp {Number(item?.amount).toLocaleString("id-ID")}
          </p>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent>
        {isLoadingDelete ? (
          <Loading />
        ) : (
          <>
            <AlertDialogHeader className={`mb-2`}>
              <AlertDialogTitle className={`border-b`}>Transactions</AlertDialogTitle>
              <AlertDialogDescription></AlertDialogDescription>
              <div className="text-muted-foreground text-sm space-y-1">
                <DialogTransactions item={item} />
              </div>
            </AlertDialogHeader>
            <div className="flex justify-between">
              <div className="space-x-2">
                <Button className={`cursor-pointer`} onClick={() => handleEdit(item)}>
                  Edit
                </Button>
                <AlertDialogAction asChild>
                  <Button variant="destructive" className={`cursor-pointer`} onClick={() => handleDeleteTransactions(item._id)}>
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
  );
};

export default CardComponent;
