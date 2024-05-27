export type PaginationType = {
    current: number;
    first: number;
    gotoFirst: () => void;
    gotoLast: () => void;
    gotoPage: (e: number) => void;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    last: number;
    nextPage: () => void;
    perPage?: number;
    prevPage: () => void;
    totalCount: number;
};

export type ResponseType = {
    address_name: string;
    category_group_code?: CategoryCode;
    category_group_name: string;
    category_name: string;
    distance: string;
    id: string;
    phone: string;
    place_name: string;
    place_url: string;
    road_address_name: string;
    x: string;
    y: string;
};
