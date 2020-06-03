import { Service } from "typedi";
import axios from 'axios';
import { Context } from "../context";
import { PaginatedPostResponse } from "../resolvers/post.resolver";

@Service()
export class PostService {
    constructor() {
    }

    async posts(context: Context, user_id?: number, page?: number): Promise<PaginatedPostResponse> {
        let res = null;
        let params = this.getParams();
        if (page) {
            params['page'] = page;
        }

        if (user_id) {
            params['user_id'] = user_id;
        }

        res = (await axios.get(`${context.baseUrl}/public-api/posts`, { params: params }));

        return (res && res.status === 200) ? res.data : null;
    }

    private getParams() {
        return { _format: 'json' };
    }

    /** Retrieve cookie from res.headers['set-cookie'] */
    private getCookie(cookieName: string, setCookie: Array<any>) {
        let cookies = {};
        for (let i = 0; i < setCookie.length; i++) {
            const cookie = setCookie[i];
            cookie.split(';').forEach(function (item) {
                var parts = item.match(/(.*?)=(.*)$/);
                if (parts) {
                    cookies[parts[1].trim()] = (parts[2] || '').trim();
                } else {
                    cookies[item.trim()] = true;
                }
            });
        }

        return cookies[cookieName];
    };
}