'use client';

import { ParamType } from '@/shared/types';

const MobileMap = ({ params: { id } }: ParamType) => {
    console.log(id);
    return (
        <div>
            <div>map</div>
        </div>
    );
};

export default MobileMap;
