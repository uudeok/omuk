export type valueOf<T> = T[keyof T];
export type Nullable<T> = T | undefined | null;

export type BasicInfoType = {
    basicInfo: {
        cid: number;
        placenamefull: string;
        mainphotourl: string;
        phonenum: string;
        reltelList: [[Object]];
        address: {
            newaddr: {
                newaddrfull: string;
                bsizonno: string;
            };
            region: { name3: string; fullname: string; newaddrfullname: string };
            addrbunho: string;
            addrdetail: string;
        };
        homepage: string;
        homepagenoprotocol: string;
        wpointx: number;
        wpointy: number;
        roadview: {
            panoid: number;
            tilt: number;
            pan: number;
            wphotox: number;
            wphotoy: number;
            rvlevel: number;
        };
        category: {
            cateid: string;
            catename: string;
            cate1name: string;
            fullCateIds: string;
        };
        englishname: string;
        feedback: {
            allphotocnt: number;
            blogrvwcnt: number;
            comntcnt: number;
            scoresum: number;
            scorecnt: number;
            reviewphotocnt: number;
        };
        openHour: {
            periodList: string[];
            offdayList: string[];
            realtime: [Object];
            openhourDisplayText: string;
        };
        payments: [[Object], [Object]];
        operationInfo: { appointment: 'Y' | 'N' };
        facilityInfo: { wifi: 'Y' | 'N'; parking: 'Y' | 'N'; nursery: 'Y' | 'N' };
        tags: string[];
        source: { date: string };
        regions: [[Object], [Object], [Object]];
        isStation: false;
    };
};

export type MenuInfoType = {
    moreyn: 'N' | 'Y';
    menuList: {
        price?: string;
        recommend: boolean;
        menu: string;
        desc?: string;
        img?: string;
    };
    productyn: 'N' | 'Y';
    menuboardphotourl: string;
    menuboardphotocount: number;
    timeexp: string;
};
