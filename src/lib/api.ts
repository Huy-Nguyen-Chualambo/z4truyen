const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

export async function fetchHome() {
    const res = await fetch(`${API_BASE}/home`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch home data");
    const json = await res.json();
    return json.data;
}

export async function fetchList(type: string, page: number = 1) {
    const res = await fetch(`${API_BASE}/danh-sach/${type}?page=${page}`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch list data");
    const json = await res.json();
    return json.data;
}

export async function fetchCategories() {
    const res = await fetch(`${API_BASE}/the-loai`, {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch categories");
    const json = await res.json();
    return json.data;
}

export async function fetchCategoryComics(slug: string, page: number = 1) {
    const res = await fetch(`${API_BASE}/the-loai/${slug}?page=${page}`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch category comics");
    const json = await res.json();
    return json.data;
}

export async function fetchComicDetail(slug: string) {
    const res = await fetch(`${API_BASE}/truyen-tranh/${slug}`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch comic detail");
    const json = await res.json();
    return json.data;
}

export async function fetchChapterDetail(chapterApiUrl: string) {
    const res = await fetch(chapterApiUrl, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch chapter detail");
    const json = await res.json();
    return json.data;
}

export async function fetchSearch(keyword: string, page: number = 1) {
    const res = await fetch(
        `${API_BASE}/tim-kiem?keyword=${encodeURIComponent(keyword)}&page=${page}`,
        { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error("Failed to fetch search results");
    const json = await res.json();
    return json.data;
}

export function getImageUrl(cdnDomain: string, thumbUrl: string) {
    if (thumbUrl.startsWith("http")) return thumbUrl;
    return `${cdnDomain}/uploads/comics/${thumbUrl}`;
}
