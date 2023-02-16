import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

function Page({ activePage, setActivePage, pageCount }) {
  let dummyArray = Array(pageCount).fill(0);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Pagination>
        <PaginationItem style={{ visibility: activePage === 1 ? "hidden" : null }}>
          <PaginationLink first onClick={() => setActivePage(1)} />
        </PaginationItem>
        <PaginationItem style={{ visibility: activePage === 1 ? "hidden" : null }}>
          <PaginationLink previous onClick={() => setActivePage(activePage - 1)} />
        </PaginationItem>
        {dummyArray.map((dummy, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={() => setActivePage(index + 1)}
              style={{ color: activePage === index + 1 ? "black" : null }}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem style={{ visibility: activePage === pageCount ? "hidden" : null }}>
          <PaginationLink next onClick={() => setActivePage(activePage + 1)} />
        </PaginationItem>
        <PaginationItem style={{ visibility: activePage === pageCount ? "hidden" : null }}>
          <PaginationLink last onClick={() => setActivePage(pageCount)} />
        </PaginationItem>
      </Pagination>
    </div>
  );
}

export default Page;
