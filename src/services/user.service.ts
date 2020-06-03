import { Service } from "typedi";
import axios from 'axios';
import { Context } from "../context";
import { PaginatedUserResponse, UserResponse } from "../resolvers/user.resolver";
import { Post } from "../types/post.type";
import { PostService } from "./post.service";

@Service()
export class UserService {
    constructor(private readonly postService: PostService) {
    }

    async user(context: Context, id: number): Promise<UserResponse> {
        let res = null;
        let params = this.getParams();
        res = (await axios.get(`${context.baseUrl}/public-api/users/${id}`, { params: params }));

        return (res && res.status === 200) ? res.data : null;
    }

    async users(context: Context, page?: number): Promise<PaginatedUserResponse> {
        let res = null;
        let params = this.getParams();
        if (page) {
            params['page'] = page;
        }

        res = (await axios.get(`${context.baseUrl}/public-api/users`, { params: params }));

        return (res && res.status === 200) ? res.data : null;
    }

    async postsForUser(context: Context, user_id: number): Promise<Post[]> {
        let posts = await this.postService.posts(context, user_id);

        return posts ? posts.result : null;
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