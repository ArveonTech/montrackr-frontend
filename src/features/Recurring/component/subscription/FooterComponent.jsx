import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import useParamsControllers from "@/hooks/others/useParamsControllers";

const FooterComponent = ({ data, error }) => {
  const { getAllParam, setManyParam } = useParamsControllers();

  const pageMeta = {
    total: data?.data?.total,
    page: data?.data?.page,
    limit: data?.data?.limit,
  };

  const dataSubscription = data?.data?.item;

  const totalPage = Math.ceil(parseInt(pageMeta?.total) / 10);

  const handlePrevPage = () => {
    if (!pageMeta?.page || pageMeta?.page <= 1) return;

    const current = getAllParam();
    setManyParam({
      ...current,
      page: pageMeta?.page - 1,
      limit: 10,
    });
  };

  const handleNextPage = (pageNext) => {
    if (!pageMeta?.page || pageMeta?.page >= totalPage) return;

    const current = getAllParam();
    setManyParam({
      ...current,
      page: pageMeta?.page + pageNext,
      limit: 10,
    });
  };

  return (
    <footer className="mb-10 mx-auto">
      {error
        ? ""
        : dataSubscription?.length !== 0 && (
            <Pagination className={`mt-10 flex justify-center`}>
              <PaginationContent>
                {pageMeta.page <= 1 ? (
                  ""
                ) : (
                  <PaginationItem>
                    <PaginationPrevious className={`cursor-pointer`} onClick={handlePrevPage} />
                  </PaginationItem>
                )}
                {pageMeta.page - 1 !== 0 && pageMeta.page - 1 <= totalPage ? (
                  <PaginationItem>
                    <PaginationLink onClick={handlePrevPage} className={`cursor-pointer`}>
                      {pageMeta.page - 1}
                    </PaginationLink>
                  </PaginationItem>
                ) : (
                  ""
                )}
                <PaginationItem>
                  <PaginationLink isActive={true}>{pageMeta.page}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                {pageMeta.page + 2 <= totalPage ? (
                  <PaginationItem>
                    <PaginationLink onClick={() => handleNextPage(2)} className={`cursor-pointer`}>
                      {pageMeta.page + 2}
                    </PaginationLink>
                  </PaginationItem>
                ) : (
                  ""
                )}
                <PaginationItem>{pageMeta.page >= totalPage ? "" : <PaginationNext className={`cursor-pointer`} onClick={() => handleNextPage(1)} />}</PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
    </footer>
  );
};

export default FooterComponent;
