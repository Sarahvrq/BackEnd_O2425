import { ObjectId } from "mongodb"
import { Restaurant } from "./Restaurant"

export type City = {
    _id: ObjectId,
    name: string,
    country: string,
    restaurants: ObjectId[]
};