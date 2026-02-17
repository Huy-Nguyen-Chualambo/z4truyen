import { fetchCategoryComics } from "@/lib/api";
import { ListData } from "@/lib/types";
import ComicCard from "@/components/ComicCard";
import Pagination from "@/components/Pagination";
import Link from "next/link";

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
}

export default async function CategoryDetailPage({ params, searchParams }: PageProps) {
    const { slug } = await params;
    const sp = await searchParams;
    const page = parseInt(sp.page || "1", 10);
    const data: ListData = await fetchCategoryComics(slug, page);

    const title = data.titlePage || slug;

    return (
        <main className="main-container">
            <div className="breadcrumb">
                <Link href="/">Trang Chủ</Link>
                <span className="breadcrumb-separator">›</span>
                <Link href="/the-loai">Thể Loại</Link>
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
                    <h1 className="section-title">Thể loại: {title}</h1>
                </div>

                {data.items.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📭</div>
                        <h3>Chưa có truyện</h3>
                        <p>Thể loại này chưa có truyện nào.</p>
                    </div>
                ) : (
                    <>
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
                            basePath={`/the-loai/${slug}`}
                        />
                    </>
                )}
            </section>
        </main>
    );
}
