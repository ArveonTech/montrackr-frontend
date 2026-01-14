import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const FinancialSummary = ({ balanceUser = 0, incomeUser = 0, expenseUser = 0 }) => {
  const cardBalance = [
    {
      title: "Balance",
      amount: balanceUser,
      styleAmount: "text-foreground",
    },
    {
      title: "Income",
      amount: incomeUser,
      styleAmount: "text-primary",
    },
    {
      title: "Expense",
      amount: expenseUser,
      styleAmount: "text-destructive",
    },
  ];

  return (
    <div className="w-full flex justify-between flex-col items-center gap-10 lg:flex-row">
      {cardBalance.map((card, index) => (
        <Card className={`min-w-80 max-w-md py-2`} key={index}>
          <CardHeader>
            <CardTitle className={`text-2xl`}>{card.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={cn(`font-JetBrains text-2xl `, card.styleAmount)}>Rp {Number(card.amount).toLocaleString("id-ID")}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FinancialSummary;
