import { ObjectId } from "mongodb";
import { getDB } from "../DB/mongo"
import { IResolvers } from "@graphql-tools/utils";
import { signToken } from "../auth";
import { X_COLLECTION } from "../utils";

export const resolvers: IResolvers = {

};