import { getDB } from "../DB/mongo"
import bcrypt from "bcryptjs" //importante para encriptar (y no desenctriptar)
import { CITY_COLLECTION, RESTAURANT_COLLECTION } from "../utils";
//import { getYPorID } from "./Y"; //para usar funciones de otra coleccion
import { ObjectId } from "mongodb";

export const ArraydeRestEnCiudad = async (ids: ObjectId[]) => {
    const db = getDB();
    if(!ids || ids.length === 0) return [];
    const idsRestaurantes = ids.map(x => new ObjectId(x));
    return await db.collection(RESTAURANT_COLLECTION).find({_id: {$in: idsRestaurantes}}).toArray();
};

export const getCity = async (id: ObjectId) => {
    const db = getDB();
    const city = await db.collection(CITY_COLLECTION).findOne({_id: new ObjectId(id)});
    if (!city) throw new Error ("ERROR: City no existe");
    return city;
};