import { Resolver, Query, Arg, Ctx, FieldResolver, Root } from "type-graphql";
import { Context } from "../context";
import ResponseFunc from "./@outputs/@response.func";
import { User } from "../types/user.type";
import { UserService } from "../services/user.service";
import PaginatedResponseFunc from "./@outputs/@page-response.func";
import { Post } from "../types/post.type";

const PaginatedUserResponse = PaginatedResponseFunc(User);
export type PaginatedUserResponse = InstanceType<typeof PaginatedUserResponse>;

const UserResponse = ResponseFunc(User);
export type UserResponse = InstanceType<typeof UserResponse>;

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Query(() => UserResponse, { nullable: true })
    async user(@Ctx() context: Context, @Arg('id') id: number): Promise<UserResponse> {
        return this.userService.user(context, id);
    }

    @Query(() => PaginatedUserResponse, { nullable: true })
    async users(@Ctx() context: Context, @Arg('page', { nullable: true }) page?: number): Promise<PaginatedUserResponse> {
        return this.userService.users(context, page);
    }

    @FieldResolver()
    async posts(@Ctx() context: Context, @Root() user: User): Promise<Array<Post>> {
        return this.userService.postsForUser(context, user.id);
    }
}