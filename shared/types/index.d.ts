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

export interface IMarker {
    setMap(arg0: any): any;
    $a: number;
    Ba: number;
    Gb: string;
    Ha: number;
    Hb: boolean;
    K: any | undefined;
    Kj: number;
    Na: boolean;
    Rc: ICoord;
    T: {
        Qd: ICoord;
        Wh: string;
        Xj: ICoord;
        de: string;
        lf: { width: number; height: number };
        mk: string;
        n: string;
    };
    a: any;
    ai: number;
    ca: any;
    ej: number;
    f: { [key: string]: any };
    fa: { [key: string]: any };
    fj: number;
    h: { [key: string]: any };
    n: IPolyline;
    o: { [key: string]: string };
    yi: number;
    close: () => void;
    open: (arg: { [key: string]: any } | undefined) => void;
}

export type FeedBackItem = {
    id: number;
    label: string;
    selected: boolean;
};

export type FeedBackType = {
    type: 'positive' | 'negative';
    items: FeedBackItem[];
};

export type StarRateType = {
    value: number;
    isHalf: boolean;
};
