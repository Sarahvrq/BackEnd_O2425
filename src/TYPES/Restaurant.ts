import { ObjectId } from "mongodb"

export type Restaurant = {  
    _id: ObjectId
    name: string,
    address: string,
    city: ObjectId,
    phone: string,
    
};