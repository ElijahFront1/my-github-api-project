import axios from 'axios';
import req from './request';
import { createOAuthAppAuth, createOAuthUserAuth } from "@octokit/auth-oauth-app";

export const getAuthUser = async () => await req.get(`/user`);
export const getUsersByUsername = async (username: string) => await req.get(`/users/${username}`);
export const getHovercardByUsername = async (username: string) => await req.get(`/users/${username}/hovercard`);

export const getOAuth = async () => {
    return axios.get(`https://github.com/login/oauth/authorize?client_id=47dba79648493c77ade2&redirect_uri=https:%2F%2Fmy-github-api-project-s415.herokuapp.com%2F`);
}

const appAuth = createOAuthAppAuth({
    clientType: "github-app",
    clientId: "47dba79648493c77ade2",
    clientSecret: "e1114488035bc2831e18aea1f65db5dba1c6cf78",
});

export const authentication = async (code: string) => await appAuth({
    type: "oauth-user",
    code,
    factory: createOAuthUserAuth,
});