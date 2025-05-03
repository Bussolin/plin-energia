export type TLoginResponse = {
    accessToken: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
};
