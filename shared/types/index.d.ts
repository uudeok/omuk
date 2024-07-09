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
    value: string;
    selected: boolean;
};

export type FeedBackType = {
    type: 'positive' | 'negative';
    items: FeedBackItem[];
};

export type UserInfoType = {
    avatar_url: string;
    email: string;
    email_verified: boolean;
    full_name: string;
    iss: string;
    name: string;
    phone_verified: boolean;
    preferred_username: string;
    provider_id: string;
    sub: string;
    user_id: string;
    user_name: string;
};

export type CompanionsType = {
    key: string;
    value: string;
};

export type MONTH_LABEL_TYPE = typeof MONTH_LABEL;
export type MONTH_LABEL_KEYS = keyof MONTH_LABEL_TYPE;
export type MONTH_LABEL_VALUES = MONTH_LABEL_TYPE[MONTH_LABEL_KEYS];

export type ParamType = {
    params: {
        id: string;
    };
};
