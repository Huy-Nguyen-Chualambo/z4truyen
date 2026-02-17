"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect } from "react";

export default function Header() {
    const [keyword, setKeyword] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (keyword.trim()) {
            router.push(`/tim-kiem?keyword=${encodeURIComponent(keyword.trim())}`);
            setMenuOpen(false);
        }
    };

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    // Close menu on route change (when clicking links)
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    return (
        <>
            <header className="header">
                <div className="header-inner">
                    <Link href="/" className="logo" onClick={closeMenu}>
                        Z4Truyện
                    </Link>

                    <nav>
                        <ul className="nav-links">
                            <li>
                                <Link href="/">Trang Chủ</Link>
                            </li>
                            <li>
                                <Link href="/danh-sach/truyen-moi">Truyện Mới</Link>
                            </li>
                            <li>
                                <Link href="/danh-sach/dang-phat-hanh">Đang Phát Hành</Link>
                            </li>
                            <li>
                                <Link href="/danh-sach/hoan-thanh">Hoàn Thành</Link>
                            </li>
                            <li>
                                <Link href="/the-loai">Thể Loại</Link>
                            </li>
                        </ul>
                    </nav>

                    <form onSubmit={handleSearch} className="search-bar">
                        <span className="search-bar-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Tìm kiếm truyện..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            id="search-input"
                        />
                    </form>

                    {/* Hamburger Toggle Button */}
                    <button
                        className={`mobile-menu-btn ${menuOpen ? "open" : ""}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        id="mobile-menu-toggle"
                    >
                        <span className="hamburger-line" />
                        <span className="hamburger-line" />
                        <span className="hamburger-line" />
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`mobile-menu-overlay ${menuOpen ? "show" : ""}`}
                onClick={closeMenu}
            />

            {/* Mobile Slide-in Menu */}
            <nav className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                <ul className="mobile-menu-links">
                    <li>
                        <Link href="/" onClick={closeMenu}>
                            🏠 Trang Chủ
                        </Link>
                    </li>
                    <li>
                        <Link href="/danh-sach/truyen-moi" onClick={closeMenu}>
                            📚 Truyện Mới
                        </Link>
                    </li>
                    <li>
                        <Link href="/danh-sach/dang-phat-hanh" onClick={closeMenu}>
                            🔄 Đang Phát Hành
                        </Link>
                    </li>
                    <li>
                        <Link href="/danh-sach/hoan-thanh" onClick={closeMenu}>
                            ✅ Hoàn Thành
                        </Link>
                    </li>
                    <li>
                        <Link href="/the-loai" onClick={closeMenu}>
                            🏷️ Thể Loại
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}
