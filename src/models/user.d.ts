/**
 * 用户类别
 */
export type UserType = {
    id: number;
    username: string;
    account: string;
    avatarUrl?: string;
    profile?: string;
    gender: number;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    major: string;
    tags: string[];
    createTime: Date;
};