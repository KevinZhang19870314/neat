import { Resolver, Query, Arg, Ctx } from "type-graphql";
import { Context } from "../context";
import PaginatedResponseFunc from "./@outputs/@page-response.func";
import { Post } from "../types/post.type";
import { PostService } from "../services/post.service";

const PaginatedPostResponse = PaginatedResponseFunc(Post);
export type PaginatedPostResponse = InstanceType<typeof PaginatedPostResponse>;

@Resolver(() => Post)
export class PostResolver {
    constructor(private readonly postService: PostService) { }

    @Query(() => PaginatedPostResponse, { nullable: true })
    async posts(@Ctx() context: Context, @Arg('user_id', { nullable: true }) userId?: number, @Arg('page', { nullable: true }) page?: number): Promise<PaginatedPostResponse> {
        return this.postService.posts(context, userId, page);
    }
}