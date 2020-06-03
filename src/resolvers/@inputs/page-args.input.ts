import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class PageArgs {
    @Field(type => Int)
    page: number;

    @Field(type => Int)
    size: number;
}