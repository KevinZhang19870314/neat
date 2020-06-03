import { InputType, Field } from "type-graphql";

@InputType({ description: "Login parameters" })
export class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  captcha: string;
}