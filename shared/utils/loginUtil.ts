import { supabase } from '../lib/supabase';

export const checkLogin = async () => {
    const authInfo = await supabase.auth.getSession();

    if (authInfo.data.session?.access_token) {
        return true;
    }
    return false;
};

export const getUserInfo = async () => {
    const authInfo = await supabase.auth.getSession();
    const userInfo = authInfo.data.session?.user.user_metadata;

    if (!userInfo) return;
    const { avatar_url, email, name } = userInfo;
    const userObject = { avatar_url, email, name };

    localStorage.setItem('userInfo', JSON.stringify(userObject));
};
