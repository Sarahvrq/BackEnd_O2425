import { getDB } from "../DB/mongo"
import bcrypt from "bcryptjs" //importante para encriptar (y no desenctriptar)
import { CITY_COLLECTION, RESTAURANT_COLLECTION } from "../utils";
//import { getYPorID } from "./Y"; //para usar funciones de otra coleccion
import { ObjectId } from "mongodb";

export const getALLRests = async (page?: number, size?: number) => {
    const db = getDB();
        page = page || 1;
        size = size || 10;
    const result = await db.collection(RESTAURANT_COLLECTION).find().skip((page-1)*size).limit(size).toArray();
    return result;
};

export const getONERest = async (city_id: ObjectId) => {
    const db = getDB();
    const restaurante = await db.collection(RESTAURANT_COLLECTION).findOne({_id: new ObjectId(city_id)});
    if (!restaurante) throw new Error ("ERROR: Resturante no existe en esa ciudad");
    return restaurante;
};

export const getCity = async (id: ObjectId) => {
    const db = getDB();
    const ciudad = await db.collection(CITY_COLLECTION).findOne({_id: new ObjectId(id)});
    if(!ciudad) throw new Error ("ERROR: Ciudad no existe");
    return ciudad;

};

        export const ValiTelefLength = async (phone: string) => {
        if (phone.length > 15) throw new Error("ERROR: Numero no valido");

        return phone;
        };

        export const VerifTelefDB = async (phone: string) => {
        const db = getDB();
        const result = await db.collection(RESTAURANT_COLLECTION).findOne({ phone });
        if (result)throw new Error("ERROR: Telefono ya existe");

        return phone;
        };

export const addRest = async(name: string, address: string, city: ObjectId, phone: string) => {
    const db = getDB();
    const validPhone = await ValiTelefLength(phone);
    const verifiedPhone = await VerifTelefDB(validPhone);

    const Insertresult = await db.collection(RESTAURANT_COLLECTION).insertOne({name, address, city, phone:verifiedPhone});
    if(!Insertresult) throw new Error ("ERROR: No se pudo añadir restaurante. Revisa los campos");
    
    return await getONERest(Insertresult.insertedId)

};

export const updateRest = async(rest_id: ObjectId, city_id: ObjectId) => {
    const db = getDB();

    const localRestId = new ObjectId(rest_id);
    const localCityId = new ObjectId(city_id);

    const restParaUpdate = await db.collection(RESTAURANT_COLLECTION).findOne({_id: localRestId});
    if(!restParaUpdate) throw new Error ("ERROR: Restaurante no encontrado");

    await db.collection(CITY_COLLECTION).updateOne({_id: localCityId}, {$set: {restaurante: localRestId}});

    const cityUpdate = await db.collection(CITY_COLLECTION).findOne({_id: localCityId});
    return cityUpdate;
};

export const deleteRestaurant = async(id: string) => {
    const db = getDB();
    const result = await db.collection(RESTAURANT_COLLECTION).deleteOne({_id: new ObjectId(id)});

    if(result.deletedCount === 0) throw new Error ("ERROR: Restaurante no encontrado");
    return true;
};

