import { getDB } from "../DB/mongo"
import bcrypt from "bcryptjs" //importante para encriptar (y no desenctriptar)
import { USER_COLLECTION } from "../utils";
//import { getYPorID } from "./Y"; //para usar funciones de otra coleccion
import { ObjectId } from "mongodb";

export const CreateUser = async (email: string, password: string) => {
    const db = getDB();
    const passEncrypt = bcrypt.hash(password, 10);
    const result = await db.collection(USER_COLLECTION).insertOne({email, password: passEncrypt});
    return result.insertedId.toString();
};

export const validateUser = async (email: string, password: string) => {
    const db = getDB();
    const user = await db.collection(USER_COLLECTION).findOne({email});
    if(!user) throw new Error ("ERROR: Usuario con ese correo no existe");

    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) throw new Error ("ERROR: Contraseña incorrecta");

    return user;
};