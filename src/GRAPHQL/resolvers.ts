import { ObjectId } from "mongodb";
import { getDB } from "../DB/mongo"
import { IResolvers } from "@graphql-tools/utils";
import { signToken } from "../auth";
import { USER_COLLECTION, RESTAURANT_COLLECTION,CITY_COLLECTION} from "../utils";


export const resolvers: IResolvers = {

};