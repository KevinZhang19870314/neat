import { ClassType, Field, ObjectType } from "type-graphql";
import { ResponseMeta } from "./@response.func";

export default function PaginatedResponseFunc<TItem>(TItemClass: ClassType<TItem>) {
    @ObjectType(`Paginated${TItemClass.name}Class`)
    class PaginatedResponseClass {
        @Field(() => ResponseMeta)
        _meta: ResponseMeta;

        @Field(() => [TItemClass], { nullable: true })
        result?: TItem[];
    }

    return PaginatedResponseClass;
}