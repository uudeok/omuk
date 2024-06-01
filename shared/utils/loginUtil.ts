import { supabase } from '../lib/supabase';

export const checkLogin = async () => {
    const authInfo = await supabase.auth.getSession();
    // console.log(authInfo);

    if (authInfo.data.session?.access_token) {
        return true;
    }
    return false;
};
