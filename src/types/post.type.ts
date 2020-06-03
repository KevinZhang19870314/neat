import { ObjectType, Field, Int } from 'type-graphql';
import { ResponseMeta } from '../resolvers/@outputs/@response.func';

@ObjectType("Post")
export class Post extends ResponseMeta {
    @Field(() => Int, { nullable: true })
    id: number;

    @Field({ nullable: true })
    user_id: string;

    @Field({ nullable: true })
    title: string;

    @Field({ nullable: true })
    body: string;
}