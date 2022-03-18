import axios from 'axios';
import req from './request';


export const getAuthUser = async () => await req.get(`/user`);
export const getUsersByUsername = async (username: string) => await req.get(`/users/${username}`);
export const getHovercardByUsername = async (username: string) => await req.get(`/users/${username}/hovercard`);

export const getOAuth = async () => {
    return axios.get(`https://github.com/login/oauth/authorize?client_id=47dba79648493c77ade2&redirect_uri=https:%2F%2Fmy-github-api-project-s415.herokuapp.com%2F`);
}

