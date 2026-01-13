import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import SomethingWentWrong from "@/features/others/SomethingWentWrong";
import CardComponent from "@/features/others/CardComponent";
import ListComponent from "@/features/others/ListComponent";
import TransactionsNotFound from "./TransactionsNotFound";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import FormTransactions from "./FormTransactions";
import { useSelector } from "react-redux";

const MainComponent = ({ data }) => {
  const { filter, typeList, typeCategory, pageMeta, loadingGetTransactions, isErrorGetTransactions, layoutParam, skeletonLoop, dataTransactions, setFilterInputParam, setFilter, isLoadingDelete, handleDeleteTransactions } = data;

  const statusEditTransactions = useSelector((state) => state.editTransactions);

  const [editTrue, setEditTrue] = useState(false);
  const [dataEditTransactions, setDataEditTransactions] = useState(null);

  const handleEdit = (itemTransactions) => {
    setEditTrue(true);
    setDataEditTransactions(itemTransactions);
  };

  useEffect(() => {
    if (statusEditTransactions.status === true) setEditTrue(false);
  });

  return (
    <>
      {editTrue && dataEditTransactions && (
        <Dialog open={editTrue} onOpenChange={setEditTrue}>
          <DialogDescription></DialogDescription>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="border-b pb-1">Edit Transaction</DialogTitle>
            </DialogHeader>

            <FormTransactions dataEditTransactions={{ status: "edit", item: dataEditTransactions }} onClose={() => setEditTrue(false)} />
          </DialogContent>
        </Dialog>
      )}
      <main className="mx-10 grid grid-cols-5 gap-10 mt-16">
        <section className=" hidden lg:block lg:col-span-1">
          <Card className={`px-5 max-w-52 space-y-2`}>
            <div>
              <h4 className="mb-3">Type:</h4>
              <Select
                value={filter.type}
                onValueChange={(value) => {
                  setFilterInputParam({ type: value, category: filter.category });
                  setFilter((prev) => ({ ...prev, type: value }));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {typeList.map((type, index) => (
                    <SelectItem value={type.value} key={index}>
                      {type.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {typeCategory.length > 0 && (
              <div>
                <h4 className="mb-3">Category:</h4>
                <Select
                  value={filter.category}
                  onValueChange={(value) => {
                    setFilterInputParam({ type: filter.type, category: value });
                    setFilter((prev) => ({ ...prev, category: value }));
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {typeCategory.map((category, index) => (
                      <SelectItem value={category.value} key={index}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </Card>
        </section>
        <section className=" col-span-5 lg:col-span-4">
          <p className="text-end mb-10">Transactions : {pageMeta.total}</p>
          {loadingGetTransactions ? <div className={cn(layoutParam === "grid" ? `grid place-items-center sm:grid-cols-2 md:grid-cols-3 2xs:grid-cols-4 gap-5` : ``)}>{skeletonLoop.map((skeleton) => skeleton)}</div> : ""}
          {isErrorGetTransactions ? (
            <div>
              <SomethingWentWrong classname={`mt-50`} />
            </div>
          ) : (
            <div className={cn(layoutParam === "grid" ? `grid place-items-center sm:grid-cols-2 xl:grid-cols-4 2xs:grid-cols-4 gap-5` : ``)}>
              {dataTransactions.length > 0 ? (
                dataTransactions.map((item, index) => {
                  return layoutParam === "grid" ? (
                    <CardComponent item={item} key={index} className={`col-span-1 w-full md:max-w-90 2xs:w-70 `} isLoadingDelete={isLoadingDelete} handleDeleteTransactions={handleDeleteTransactions} handleEdit={handleEdit} />
                  ) : (
                    <ListComponent item={item} key={index} />
                  );
                })
              ) : (
                <TransactionsNotFound />
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default MainComponent;
