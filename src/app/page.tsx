import { fetchHome } from "@/lib/api";
import { HomeData } from "@/lib/types";
import ComicCard from "@/components/ComicCard";
import Link from "next/link";

export default async function HomePage() {
  const data: HomeData = await fetchHome();

  const totalComics = data.params.pagination.totalItems;

  return (
    <main className="main-container">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-particles" />
        <div className="hero-content">
          <div className="hero-badge">🔥 Cập nhật mới nhất</div>
          <h1 className="hero-title">
            Khám Phá Thế Giới <span>Truyện Tranh</span> Không Giới Hạn
          </h1>
          <p className="hero-subtitle">
            Hàng ngàn bộ truyện tranh Manga, Manhwa, Manhua được cập nhật liên tục với chất lượng hình ảnh cao nhất.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">
                {totalComics.toLocaleString()}+
              </span>
              <span className="hero-stat-label">Bộ truyện</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">24/7</span>
              <span className="hero-stat-label">Cập nhật</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">HD</span>
              <span className="hero-stat-label">Chất lượng</span>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Comics */}
      <section>
        <div className="section-header">
          <h2 className="section-title">Truyện Mới Cập Nhật</h2>
          <Link href="/danh-sach/truyen-moi" className="section-link">
            Xem tất cả →
          </Link>
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
      </section>
    </main>
  );
}
