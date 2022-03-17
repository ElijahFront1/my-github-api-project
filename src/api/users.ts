import req from './request';

export const getAuthUser = async () => await req.get(`/user`);
export const getUsersByUsername = async (username: string) => await req.get(`/users/${username}`);
export const getHovercardByUsername = async (username: string) => await req.get(`/users/${username}/hovercard`);