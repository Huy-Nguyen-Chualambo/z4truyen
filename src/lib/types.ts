export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface CategoryItem {
    _id: string;
    slug: string;
    name: string;
}

export interface ChapterLatest {
    filename: string;
    chapter_name: string;
    chapter_title: string;
    chapter_api_data: string;
}

export interface ComicItem {
    _id: string;
    name: string;
    slug: string;
    origin_name: string[];
    status: string;
    thumb_url: string;
    sub_docquyen: boolean;
    category: Category[];
    updatedAt: string;
    chaptersLatest: ChapterLatest[];
}

export interface Pagination {
    totalItems: number;
    totalItemsPerPage: number;
    currentPage: number;
    pageRanges: number;
}

export interface HomeData {
    seoOnPage: {
        titleHead: string;
        descriptionHead: string;
        og_type: string;
        og_image: string[];
    };
    items: ComicItem[];
    params: {
        type_slug: string;
        filterCategory: string[];
        sortField: string;
        pagination: Pagination;
        itemsUpdateInDay: number;
    };
    type_list: string;
    APP_DOMAIN_FRONTEND: string;
    APP_DOMAIN_CDN_IMAGE: string;
}

export interface ListData {
    seoOnPage: {
        og_type: string;
        titleHead: string;
        descriptionHead: string;
        og_image: string[];
        og_url: string;
    };
    breadCrumb: { name: string; slug?: string; isCurrent: boolean; position: number }[];
    titlePage: string;
    items: ComicItem[];
    params: {
        type_slug: string;
        filterCategory: string[];
        sortField: string;
        sortType: string;
        pagination: Pagination;
    };
    type_list: string;
    APP_DOMAIN_FRONTEND: string;
    APP_DOMAIN_CDN_IMAGE: string;
}

export interface ChapterServerData {
    filename: string;
    chapter_name: string;
    chapter_title: string;
    chapter_api_data: string;
}

export interface ChapterServer {
    server_name: string;
    server_data: ChapterServerData[];
}

export interface ComicDetail {
    _id: string;
    name: string;
    slug: string;
    origin_name: string[];
    content: string;
    status: string;
    thumb_url: string;
    sub_docquyen: boolean;
    author: string[];
    category: Category[];
    chapters: ChapterServer[];
    updatedAt: string;
}

export interface ComicDetailData {
    seoOnPage: {
        og_type: string;
        titleHead: string;
        descriptionHead: string;
        og_image: string[];
        og_url: string;
    };
    breadCrumb: { name: string; slug?: string; isCurrent: boolean; position: number }[];
    item: ComicDetail;
    APP_DOMAIN_FRONTEND: string;
    APP_DOMAIN_CDN_IMAGE: string;
}

export interface ChapterImage {
    image_page: number;
    image_file: string;
}

export interface ChapterDetailData {
    _id: string;
    domain_cdn: string;
    item: {
        _id: string;
        comic_name: string;
        chapter_name: string;
        chapter_title: string;
        chapter_path: string;
        chapter_image: ChapterImage[];
    };
}

export interface SearchData {
    seoOnPage: {
        og_type: string;
        titleHead: string;
        descriptionHead: string;
        og_image: string[];
        og_url: string;
    };
    breadCrumb: { name: string; slug?: string; isCurrent: boolean; position: number }[];
    titlePage: string;
    items: ComicItem[];
    params: {
        type_slug: string;
        filterCategory: string[];
        sortField: string;
        sortType: string;
        pagination: Pagination;
        keyword: string;
    };
    type_list: string;
    APP_DOMAIN_FRONTEND: string;
    APP_DOMAIN_CDN_IMAGE: string;
}
