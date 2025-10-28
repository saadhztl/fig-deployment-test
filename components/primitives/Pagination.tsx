import { FAIcons } from '@/helpers/FAIcons';
import { Button } from './Button';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  return (
    <div className="flex justify-center items-center gap-4 my-5">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="bg-transparent rounded-none hover:bg-light text-white hover:text-black p-4 w-fit"
      >
        <FAIcons iconCode="fa-solid fa-chevron-left" />
      </Button>
      <div className="text-lg text-white">
        {currentPage} of {totalPages}
      </div>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="bg-transparent rounded-none hover:bg-light text-white hover:text-black p-4 w-fit"
      >
        <FAIcons iconCode="fa-solid fa-chevron-right" />
      </Button>
    </div>
  );
};
