import { fetchComicDetail, getImageUrl } from "@/lib/api";
import { ComicDetailData } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

const statusLabels: Record<string, string> = {
    ongoing: "Đang tiến hành",
    completed: "Hoàn thành",
    coming_soon: "Sắp ra mắt",
};

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ComicDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const data: ComicDetailData = await fetchComicDetail(slug);
    const comic = data.item;
    const cdnImage = data.APP_DOMAIN_CDN_IMAGE;
    const imageUrl = getImageUrl(cdnImage, comic.thumb_url);

    const chapters = comic.chapters?.[0]?.server_data || [];
    // Sort chapters by name (numeric)
    const sortedChapters = [...chapters].sort((a, b) => {
        const numA = parseFloat(a.chapter_name) || 0;
        const numB = parseFloat(b.chapter_name) || 0;
        return numB - numA;
    });

    return (
        <main className="main-container">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <Link href="/">Trang Chủ</Link>
                <span className="breadcrumb-separator">›</span>
                <span>{comic.name}</span>
            </div>

            {/* Comic Detail */}
            <div className="comic-detail">
                <div className="comic-detail-thumb">
                    <Image
                        src={imageUrl}
                        alt={comic.name}
                        fill
                        sizes="280px"
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </div>

                <div className="comic-detail-info">
                    <h1 className="comic-detail-title">{comic.name}</h1>

                    {comic.origin_name?.filter(Boolean).length > 0 && (
                        <p className="comic-detail-origin">
                            {comic.origin_name.filter(Boolean).join(" | ")}
                        </p>
                    )}

                    <div className="comic-detail-meta">
                        <span className={`meta-badge`}>
                            <span className="label">Trạng thái:</span>
                            {statusLabels[comic.status] || comic.status}
                        </span>
                        {comic.author?.filter(Boolean).length > 0 && (
                            <span className="meta-badge">
                                <span className="label">Tác giả:</span>
                                {comic.author.filter(Boolean).join(", ")}
                            </span>
                        )}
                        <span className="meta-badge">
                            <span className="label">Cập nhật:</span>
                            {new Date(comic.updatedAt).toLocaleDateString("vi-VN")}
                        </span>
                    </div>

                    <div className="comic-detail-categories">
                        {comic.category?.map((cat) => (
                            <Link key={cat.id} href={`/the-loai/${cat.slug}`}>
                                {cat.name}
                            </Link>
                        ))}
                    </div>

                    {comic.content && (
                        <div
                            className="comic-detail-description"
                            dangerouslySetInnerHTML={{ __html: comic.content }}
                        />
                    )}
                </div>
            </div>

            {/* Chapter List */}
            <div className="chapter-list-container">
                <div className="chapter-list-header">
                    📖 Danh sách chương ({sortedChapters.length})
                </div>
                <ul className="chapter-list">
                    {sortedChapters.map((chap, index) => (
                        <li key={`${chap.chapter_name}-${index}`}>
                            <Link
                                href={`/truyen-tranh/${slug}/${chap.chapter_name}?api=${encodeURIComponent(chap.chapter_api_data)}`}
                            >
                                <span className="chapter-name">
                                    Chương {chap.chapter_name}
                                </span>
                                {chap.chapter_title && (
                                    <span className="chapter-title">{chap.chapter_title}</span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
