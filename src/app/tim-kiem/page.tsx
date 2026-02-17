import { fetchSearch } from "@/lib/api";
import ComicCard from "@/components/ComicCard";
import Pagination from "@/components/Pagination";
import Link from "next/link";

interface PageProps {
    searchParams: Promise<{ keyword?: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
    const sp = await searchParams;
    const keyword = sp.keyword || "";
    const page = parseInt(sp.page || "1", 10);

    if (!keyword.trim()) {
        return (
            <main className="main-container">
                <div className="empty-state">
                    <div className="empty-state-icon">🔍</div>
                    <h3>Tìm kiếm truyện</h3>
                    <p>Nhập từ khóa vào ô tìm kiếm để tìm truyện bạn yêu thích.</p>
                </div>
            </main>
        );
    }

    const data = await fetchSearch(keyword, page);

    return (
        <main className="main-container">
            <div className="breadcrumb">
                <Link href="/">Trang Chủ</Link>
                <span className="breadcrumb-separator">›</span>
                <span>Tìm kiếm: {keyword}</span>
            </div>

            <div className="search-results-header">
                <h1>Kết quả tìm kiếm: &quot;{keyword}&quot;</h1>
                <p>
                    Tìm thấy {data.params?.pagination?.totalItems || data.items?.length || 0} kết quả
                </p>
            </div>

            {data.items?.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">😕</div>
                    <h3>Không tìm thấy kết quả</h3>
                    <p>Thử tìm kiếm với từ khóa khác.</p>
                </div>
            ) : (
                <>
                    <div className="comic-grid">
                        {data.items?.map((comic: import("@/lib/types").ComicItem) => (
                            <ComicCard
                                key={comic.slug}
                                comic={comic}
                                cdnImage={data.APP_DOMAIN_CDN_IMAGE}
                            />
                        ))}
                    </div>
                    {data.params?.pagination && (
                        <Pagination
                            pagination={data.params.pagination}
                            basePath={`/tim-kiem?keyword=${encodeURIComponent(keyword)}`}
                        />
                    )}
                </>
            )}
        </main>
    );
}
