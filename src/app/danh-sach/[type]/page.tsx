import { fetchList } from "@/lib/api";
import { ListData } from "@/lib/types";
import ComicCard from "@/components/ComicCard";
import Pagination from "@/components/Pagination";
import Link from "next/link";

const typeLabels: Record<string, string> = {
    "truyen-moi": "Truyện Mới",
    "dang-phat-hanh": "Đang Phát Hành",
    "hoan-thanh": "Hoàn Thành",
    "sap-ra-mat": "Sắp Ra Mắt",
};

interface PageProps {
    params: Promise<{ type: string }>;
    searchParams: Promise<{ page?: string }>;
}

export default async function ListPage({ params, searchParams }: PageProps) {
    const { type } = await params;
    const sp = await searchParams;
    const page = parseInt(sp.page || "1", 10);
    const data: ListData = await fetchList(type, page);

    const title = typeLabels[type] || data.titlePage || type;

    return (
        <main className="main-container">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <Link href="/">Trang Chủ</Link>
                <span className="breadcrumb-separator">›</span>
                <span>{title}</span>
                {page > 1 && (
                    <>
                        <span className="breadcrumb-separator">›</span>
                        <span>Trang {page}</span>
                    </>
                )}
            </div>

            <section>
                <div className="section-header">
                    <h1 className="section-title">{title}</h1>
                </div>
                <div className="comic-grid">
                    {data.items.map((comic) => (
                        <ComicCard
                            key={comic._id}
                            comic={comic}
                            cdnImage={data.APP_DOMAIN_CDN_IMAGE}
                        />
                    ))}
                </div>
                <Pagination
                    pagination={data.params.pagination}
                    basePath={`/danh-sach/${type}`}
                />
            </section>
        </main>
    );
}
