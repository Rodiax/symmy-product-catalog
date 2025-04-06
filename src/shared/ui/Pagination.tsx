import {
  Pagination as PaginationComponent,
  PaginationProps,
} from "react-bootstrap";

interface Props extends PaginationProps {
  total: number;
  skip: number;
  pageSize: number;
  onPageChange: (skip: number) => void;
}
export default function Pagination({
  total,
  skip,
  pageSize,
  onPageChange,
  ...paginationProps
}: Props) {
  const currentPage = Math.floor(skip / pageSize) + 1;
  const totalPages = Math.ceil(total / pageSize);

  const handlePageClick = (page: number) => {
    onPageChange((page - 1) * pageSize);
  };

  return (
    <PaginationComponent {...paginationProps}>
      <PaginationComponent.First
        onClick={() => handlePageClick(1)}
        disabled={currentPage === 1}
      />
      <PaginationComponent.Prev
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {Array.from({ length: totalPages }, (_, i) => (
        <PaginationComponent.Item
          className="text-dark bg-light border-secondary"
          key={i}
          active={i + 1 === currentPage}
          onClick={() => handlePageClick(i + 1)}
        >
          {i + 1}
        </PaginationComponent.Item>
      ))}

      <PaginationComponent.Next
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <PaginationComponent.Last
        onClick={() => handlePageClick(totalPages)}
        disabled={currentPage === totalPages}
      />
    </PaginationComponent>
  );
}
