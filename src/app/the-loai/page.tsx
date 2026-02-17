import { fetchCategories } from "@/lib/api";
import { CategoryItem } from "@/lib/types";
import Link from "next/link";

export const metadata = {
    title: "Thể Loại Truyện - Z4Truyện",
    description: "Danh sách tất cả thể loại truyện tranh tại Z4Truyện.",
};

export default async function CategoriesPage() {
    const data = await fetchCategories();
    const categories: CategoryItem[] = data.items;

    return (
        <main className="main-container">
            <div className="breadcrumb">
                <Link href="/">Trang Chủ</Link>
                <span className="breadcrumb-separator">›</span>
                <span>Thể Loại</span>
            </div>

            <section>
                <div className="section-header">
                    <h1 className="section-title">Tất Cả Thể Loại</h1>
                </div>
                <div className="categories-grid">
                    {categories.map((cat) => (
                        <Link
                            key={cat._id}
                            href={`/the-loai/${cat.slug}`}
                            className="category-chip"
                            id={`category-${cat.slug}`}
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
