export const jwtConstants = {
    saltRound: Number(process.env.SALT_ROUND),
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET, // access token
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY, // access token
};

export enum Role {
    User = 'Admin',
    Admin = 'Super Admin',
}
