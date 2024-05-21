export type GeocoderType = {
    address_name: string;
    code: 'string';
    region_1depth_name: 'string';
    region_2depth_name: 'string';
    region_3depth_name: 'string';
    region_4depth_name: 'string';
    region_type: 'string';
    x: number;
    y: number;
};

export type CoordType = {
    id?: string;
    name?: string;
    x: number | string;
    y: number | string;
    reviewId?: string;
    review?: string;
    place_name?: string;
};

export type DataResponse = {
    address_name: string;
    category_group_code: string;
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
    reviewId?: string;
    review?: string;
    visited?: boolean;
};

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
    perPage: number;
    prevPage: () => void;
    totalCount: number;
};

export type PositionType = {
    La: number;
    Ma: number;
};

export type MenuType = {
    id: string;
    name: string;
    href?: string;
    active: boolean;
};

export type IReview = {
    id: string;
    cafeId: string;
    authorId: string;
    name: string;
    description: string;
    starRating: number;
    visited: boolean;
    good: string;
    notGood: string;
    tags: string;
    recommend: string;
    x: string;
    y: string;
    likedBy?: IRegister;
    reviewImages: string;
};

export type IDirection = {
    origin: string;
    destination: string;
};

export type IPolyline = {
    La: number;
    Ma: number;
};

export type MarkerType = {
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
};

export type IClusters = _.List<any>;

export type IClusterer = {
    _clusters: _.List<any> | null | undefined;
    clear: () => void;
    addMarkers: (arg: any) => void;
};

export type IFollow = {
    followerId: string;
    followingId: string;
};

export type IProfileUpdate = {
    id: string;
    name: string;
    profile?: string | null;
};
