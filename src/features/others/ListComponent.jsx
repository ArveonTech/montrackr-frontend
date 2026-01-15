import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

import { ShoppingCart, Sparkles, HeartPulse, Users, Wallet, Briefcase, Award, Laptop, Store, Gift, Ellipsis, Banknote, Landmark, CreditCard, QrCode } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import DialogTransactions from "./DialogTransactions";
import { Button } from "@/components/ui/button";

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

const paymentMethodIcons = {
  cash: <Banknote />,
  bank: <Landmark />,
  "debit card": <CreditCard />,
  "credit card": <CreditCard />,
  "e-wallet": <Wallet />,
  qris: <QrCode />,
};

const ListComponent = ({ item, classname }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div
          className={cn(
            "grid grid-cols-5 items-center border-b bg-card px-5 py-3 shadow-sm cursor-pointer",
            classname,
            item?.type === "income" ? "bg-primary/10 text-primary-foreground" : item?.type === "expense" ? "bg-destructive/95 text-destructive-foreground" : "bg-accent/95 text-accent-foreground"
          )}
        >
          {/* Date */}
          <div className="col-span-1 hidden sm:block">
            <Badge className={`${item?.type === "income" ? "bg-primary/50" : "bg-white"}`}>
              {new Date(item?.date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Badge>
          </div>

          {/* Title + Icon */}
          <div className="col-span-3  sm:col-span-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg">{categoryIcons[item?.category]}</div>

            <span className="text-sm font-medium">{item.title}</span>
          </div>

          {/* Payment Method */}
          <div className="col-span-1 text-sm hidden sm:block">
            <div className="flex items-center gap-2">
              <span>{paymentMethodIcons[item?.paymentMethod]}</span>
              <p>{item?.paymentMethod}</p>
            </div>
          </div>

          {/* Amount */}
          <div className={cn("col-span-2 sm:col-span-1 text-right")}>
            <p className={cn(`font-JetBrains text-[17px] lg:text-md`)}>
              {item.type === "income" ? "+" : "-"}Rp {Number(item?.amount).toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader className={`mb-2`}>
          <AlertDialogTitle className={`border-b`}>Transactions</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <div className="text-muted-foreground text-sm space-y-1">
            <DialogTransactions item={item} />
          </div>
        </AlertDialogHeader>
        <div className="flex justify-between">
          <div className="space-x-2">
            <Button className={`cursor-pointer`}>Edit</Button>
            <Button variant="destructive" className={`cursor-pointer`}>
              Delete
            </Button>
          </div>
          <AlertDialogCancel className={`cursor-pointer`}>Cancel</AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ListComponent;
