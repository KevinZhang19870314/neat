import { ClassType, Field, Int, ObjectType } from "type-graphql";

export default function ResponseFunc<TItem>(TItemClass: ClassType<TItem>) {
    @ObjectType(`Response${TItemClass.name}Class`)
    class ResponseClass {
        @Field(type => ResponseMeta)
        _meta: ResponseMeta;

        @Field(type => TItemClass, { nullable: true })
        result?: TItem;
    }

    return ResponseClass;
}

@ObjectType(`ResponseMeta`)
export class ResponseMeta {
    @Field({ nullable: true })
    success?: string;

    @Field(type => Int, { nullable: true })
    code: number;

    @Field({ nullable: true })
    message?: string;

    @Field({ nullable: true })
    name?: string;

    @Field(type => Int, { nullable: true })
    totalCount?: number;

    @Field(type => Int, { nullable: true })
    pageCount?: number;

    @Field(type => Int, { nullable: true })
    currentPage?: number;

    @Field(type => Int, { nullable: true })
    perPage?: number;
}