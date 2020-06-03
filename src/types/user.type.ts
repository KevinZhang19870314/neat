import { ObjectType, Field, Int } from 'type-graphql';
import { ResponseMeta } from '../resolvers/@outputs/@response.func';
import { Post } from './post.type';

@ObjectType("User")
export class User extends ResponseMeta {
    @Field(() => Int, { nullable: true })
    id: number;

    @Field({ nullable: true })
    first_name: string;

    @Field({ nullable: true })
    last_name: string;

    @Field({ nullable: true })
    gender: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    phone: string;

    @Field({ nullable: true })
    status: string;

    @Field(type => [Post], { nullable: true })
    posts: Post[];
}