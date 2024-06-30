import {UserType} from "./user";

/**
 * 队伍
 */
export type TeamType = {
    id: number;
    name: string,
    description: string,
    expireTime?: Date,
    maxNum: number,
    password?: string,
    status: number
    createTime: Date,
    updateTime: Date,
    userId: number,
    createUser?: UserType;
};