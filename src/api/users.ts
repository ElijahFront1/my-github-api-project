import axios from 'axios';
import req from './request';

export const getAuthUser = async () => await req.get(`/user`);
export const getUsersByUsername = async (username: string) => await req.get(`/users/${username}`);
export const getHovercardByUsername = async (username: string) => await req.get(`/users/${username}/hovercard`);

export const getOAuth = async () => axios.get(`https://github.com/login/oauth/authorize?client_id=47dba79648493c77ade2&redirect_uri=https:%2F%2Fmy-github-api-project-s415.herokuapp.com%2F`, {
    // headers: {
    //     'Accept': 'application/vnd.github.v3+json',
    //     'Authorization': 'token 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 ',
    // },
    // params: {
    //     client_id: "47dba79648493c77ade2",
    //     redirect_uri: "https://my-github-api-project-s415.herokuapp.com/",
    // }
});

export const postToken = async (code: string) => axios.post(`https://github.com/login/oauth/access_token`, {
    client_id: "47dba79648493c77ade2",
    client_secret: "e1114488035bc2831e18aea1f65db5dba1c6cf78",
    code: code
    // redirect_uri
})