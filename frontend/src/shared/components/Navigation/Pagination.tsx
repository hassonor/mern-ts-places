import { TLimitOptions, TPaginationProps } from "../../../types/types.ts";
import { FC } from "react";

const Pagination: FC<TPaginationProps> = ({currentPage, totalPages, limit, onPageChange, onLimitChange}) => {
    const limits: TLimitOptions[] = [1, 2, 10, 15, 25, 50, 100];

    return (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-4">
            <select
                className="border border-gray-300 rounded px-2 py-1 text-sm"
                value={limit}
                onChange={(e) => onLimitChange(parseInt(e.target.value, 10))}
            >
                {limits.map((limitOption) => (
                    <option key={limitOption} value={limitOption}>
                        {limitOption} per page
                    </option>
                ))}
            </select>
            <div className="flex flex-wrap gap-1">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`border border-gray-300 rounded px-3 py-1 text-sm 
                                    ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
                        disabled={index + 1 === currentPage}
                        onClick={() => onPageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Pagination;