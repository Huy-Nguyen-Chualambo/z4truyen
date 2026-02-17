import Link from "next/link";
import Image from "next/image";
import { ComicItem } from "@/lib/types";
import { getImageUrl } from "@/lib/api";

interface ComicCardProps {
    comic: ComicItem;
    cdnImage: string;
}

const statusLabels: Record<string, string> = {
    ongoing: "Đang tiến hành",
    completed: "Hoàn thành",
    coming_soon: "Sắp ra mắt",
};

export default function ComicCard({ comic, cdnImage }: ComicCardProps) {
    const imageUrl = getImageUrl(cdnImage, comic.thumb_url);
    const latestChapter = comic.chaptersLatest?.[0];

    return (
        <Link
            href={`/truyen-tranh/${comic.slug}`}
            className="comic-card"
            id={`comic-${comic.slug}`}
        >
            <div className="comic-card-image">
                <Image
                    src={imageUrl}
                    alt={comic.name}
                    fill
                    sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    style={{ objectFit: "cover" }}
                />
                <div className="comic-card-overlay" />

                {/* Status badge - top left, solid background for visibility */}
                <span className={`comic-card-status status-${comic.status}`}>
                    {statusLabels[comic.status] || comic.status}
                </span>

                {/* Chapter badge - bottom right */}
                {latestChapter && (
                    <span className="comic-card-chapter">
                        Chap {latestChapter.chapter_name}
                    </span>
                )}
            </div>

            <div className="comic-card-info">
                <h3 className="comic-card-title">{comic.name}</h3>
                <div className="comic-card-categories">
                    {comic.category?.slice(0, 3).map((cat) => (
                        <span key={cat.id} className="comic-card-cat">
                            {cat.name}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}
