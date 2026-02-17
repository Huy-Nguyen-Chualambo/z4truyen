import { fetchChapterDetail, fetchComicDetail } from "@/lib/api";
import { ChapterDetailData } from "@/lib/types";
import Link from "next/link";

interface PageProps {
    params: Promise<{ slug: string; chapter: string }>;
    searchParams: Promise<{ api?: string }>;
}

export default async function ChapterReaderPage({ params, searchParams }: PageProps) {
    const { slug, chapter } = await params;
    const sp = await searchParams;
    const apiUrl = sp.api;

    if (!apiUrl) {
        return (
            <main className="main-container">
                <div className="empty-state">
                    <div className="empty-state-icon">⚠️</div>
                    <h3>Không tìm thấy chương</h3>
                    <p>URL chương không hợp lệ.</p>
                    <Link href={`/truyen-tranh/${slug}`} style={{ color: "var(--accent-secondary)", marginTop: "1rem", display: "inline-block" }}>
                        ← Quay lại truyện
                    </Link>
                </div>
            </main>
        );
    }

    const chapterData: ChapterDetailData = await fetchChapterDetail(apiUrl);
    const images = chapterData.item.chapter_image || [];
    const domainCdn = chapterData.domain_cdn;
    const chapterPath = chapterData.item.chapter_path;

    // Get comic detail to find prev/next chapters
    let prevChapter: { name: string; api: string } | null = null;
    let nextChapter: { name: string; api: string } | null = null;

    try {
        const comicData = await fetchComicDetail(slug);
        const chapters = comicData.item.chapters?.[0]?.server_data || [];
        const currentIdx = chapters.findIndex(
            (c: { chapter_name: string }) => c.chapter_name === chapter
        );
        if (currentIdx > 0) {
            const prev = chapters[currentIdx - 1];
            prevChapter = { name: prev.chapter_name, api: prev.chapter_api_data };
        }
        if (currentIdx < chapters.length - 1 && currentIdx >= 0) {
            const next = chapters[currentIdx + 1];
            nextChapter = { name: next.chapter_name, api: next.chapter_api_data };
        }
    } catch {
        // If we can't get nav data, just show the chapter
    }

    return (
        <main className="main-container">
            <div className="reader-container">
                {/* Reader Header */}
                <div className="reader-header">
                    <div>
                        <div className="reader-title">
                            {chapterData.item.comic_name} - Chương {chapterData.item.chapter_name}
                        </div>
                        {chapterData.item.chapter_title && (
                            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                                {chapterData.item.chapter_title}
                            </div>
                        )}
                    </div>
                    <div className="reader-nav">
                        {prevChapter ? (
                            <Link
                                href={`/truyen-tranh/${slug}/${prevChapter.name}?api=${encodeURIComponent(prevChapter.api)}`}
                            >
                                ← Chương trước
                            </Link>
                        ) : (
                            <button disabled style={{ opacity: 0.4 }}>← Chương trước</button>
                        )}
                        <Link href={`/truyen-tranh/${slug}`}>
                            📋 Mục lục
                        </Link>
                        {nextChapter ? (
                            <Link
                                href={`/truyen-tranh/${slug}/${nextChapter.name}?api=${encodeURIComponent(nextChapter.api)}`}
                            >
                                Chương sau →
                            </Link>
                        ) : (
                            <button disabled style={{ opacity: 0.4 }}>Chương sau →</button>
                        )}
                    </div>
                </div>

                {/* Chapter Images */}
                <div className="reader-images">
                    {images
                        .sort((a, b) => a.image_page - b.image_page)
                        .map((img) => (
                            <img
                                key={img.image_page}
                                src={`${domainCdn}/${chapterPath}/${img.image_file}`}
                                alt={`Trang ${img.image_page}`}
                                loading="lazy"
                                style={{ display: "block", width: "100%" }}
                            />
                        ))}
                </div>

                {/* Bottom Navigation */}
                <div className="reader-header" style={{ marginTop: "1.5rem" }}>
                    <div className="reader-nav" style={{ width: "100%", justifyContent: "center" }}>
                        {prevChapter ? (
                            <Link
                                href={`/truyen-tranh/${slug}/${prevChapter.name}?api=${encodeURIComponent(prevChapter.api)}`}
                            >
                                ← Chương trước
                            </Link>
                        ) : (
                            <button disabled style={{ opacity: 0.4 }}>← Chương trước</button>
                        )}
                        <Link href={`/truyen-tranh/${slug}`}>
                            📋 Mục lục
                        </Link>
                        {nextChapter ? (
                            <Link
                                href={`/truyen-tranh/${slug}/${nextChapter.name}?api=${encodeURIComponent(nextChapter.api)}`}
                            >
                                Chương sau →
                            </Link>
                        ) : (
                            <button disabled style={{ opacity: 0.4 }}>Chương sau →</button>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
