export const jwtConstants = {
    saltRound: Number(process.env.SALT_ROUND),
    accessTokenSecret: process.env.ACCESS_TOKEN_EXRIRY, // access token
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXRIRY, // access token
};

export enum Role {
    User = 'Admin',
    Admin = 'Super Admin',
}
