import Link from "next/link";
import { Pagination as PaginationType } from "@/lib/types";

interface PaginationProps {
    pagination: PaginationType;
    basePath: string;
}

export default function Pagination({ pagination, basePath }: PaginationProps) {
    const { totalItems, totalItemsPerPage, currentPage } = pagination;
    const totalPages = Math.ceil(totalItems / totalItemsPerPage);

    if (totalPages <= 1) return null;

    const pages: (number | string)[] = [];
    const range = 2;

    if (currentPage > 1) {
        pages.push("prev");
    }

    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - range && i <= currentPage + range)
        ) {
            pages.push(i);
        } else if (
            (i === currentPage - range - 1 && i > 1) ||
            (i === currentPage + range + 1 && i < totalPages)
        ) {
            pages.push("...");
        }
    }

    if (currentPage < totalPages) {
        pages.push("next");
    }

    const separator = basePath.includes("?") ? "&" : "?";

    return (
        <div className="pagination">
            {pages.map((page, idx) => {
                if (page === "prev") {
                    return (
                        <Link key="prev" href={`${basePath}${separator}page=${currentPage - 1}`}>
                            ← Trước
                        </Link>
                    );
                }
                if (page === "next") {
                    return (
                        <Link key="next" href={`${basePath}${separator}page=${currentPage + 1}`}>
                            Sau →
                        </Link>
                    );
                }
                if (page === "...") {
                    return (
                        <span key={`dots-${idx}`} className="disabled">
                            ...
                        </span>
                    );
                }
                const pageNum = page as number;
                if (pageNum === currentPage) {
                    return (
                        <span key={pageNum} className="active">
                            {pageNum}
                        </span>
                    );
                }
                return (
                    <Link key={pageNum} href={`${basePath}${separator}page=${pageNum}`}>
                        {pageNum}
                    </Link>
                );
            })}
        </div>
    );
}
