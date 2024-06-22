import { createClient } from '@/shared/lib/supabase/brower-client';

export type ProfileType = {
    id: string;
    username: string;
    email: string;
    avatar_url: string;
};

export const searchUserData = async (emailOrUsername: string): Promise<ProfileType> => {
    const supabase = createClient();

    const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .or(`email.eq.${emailOrUsername},username.eq.${emailOrUsername}`)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return profiles;
};
