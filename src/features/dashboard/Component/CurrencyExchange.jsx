import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useExchangeToIDR from "@/hooks/dashboard/FetchExchange";

const currencies = ["USD", "EUR", "GBP", "JPY", "AUD"];

export default function ExchangeConverterCard() {
  const [amount, setAmount] = useState("");
  const [results, setResults] = useState({});

  const exchangeMutation = useExchangeToIDR();

  const handleConvert = async () => {
    if (!amount || amount <= 0) return;

    const tempResult = {};

    for (const cur of currencies) {
      const res = await exchangeMutation.mutateAsync({
        amount,
        from: cur,
      });

      tempResult[cur] = res.rates.IDR;
    }

    setResults(tempResult);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Foreign Currency → IDR</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Input */}
        <div className="flex gap-2">
          <div className="relative w-full">
            <Input type="number" placeholder="Amount" className="pr-14" value={amount} onChange={(e) => setAmount(e.target.value)} />

            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">000</div>
          </div>
          <Button onClick={handleConvert} disabled={exchangeMutation.isPending}>
            Convert
          </Button>
        </div>

        {/* Result */}
        <div className="space-y-2">
          {exchangeMutation.isPending && <p className="text-sm text-muted-foreground">Converting currencies...</p>}

          {currencies.map((cur) => (
            <div key={cur} className="flex justify-between items-center text-sm border rounded-md px-3 py-2">
              <span className="font-medium">{cur}</span>
              <span className="font-semibold">{results[cur] ? `Rp ${results[cur].toLocaleString("id-ID")}` : "-"}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
