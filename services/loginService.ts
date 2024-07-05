import { createClient } from '@/shared/lib/supabase/brower-client';

export const signupHandler = async (email: string, password: string, nickName: string, role: string) => {
    const supabase = createClient();
    // 회원가입
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                name: nickName,
                avatar_url: null,
                role: role,
            },
        },
    });

    if (error) {
        console.error('Signup Error:', error);
        throw new Error(error.message);
    }

    return data;
};

export const signinHandler = async (email: string, password: string) => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        console.error('Signin Error:', error);
        throw new Error(error.message);
    }

    return data;
};
