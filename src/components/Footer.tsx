import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-logo">⚡ Z4Truyện</div>
                <p className="footer-desc">
                    Website đọc truyện tranh online miễn phí, cập nhật nhanh nhất với hình ảnh chất lượng cao.
                </p>
                <ul className="footer-links">
                    <li><Link href="/">Trang Chủ</Link></li>
                    <li><Link href="/danh-sach/truyen-moi">Truyện Mới</Link></li>
                    <li><Link href="/the-loai">Thể Loại</Link></li>
                </ul>
                <p className="footer-copy">© 2024 Z4Truyện. Tất cả quyền được bảo lưu.</p>
            </div>
        </footer>
    );
}
