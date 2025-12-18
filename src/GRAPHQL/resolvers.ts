import { ObjectId } from "mongodb";
import { getDB } from "../DB/mongo"
import { IResolvers } from "@graphql-tools/utils";
import { signToken } from "../auth";
import { addRest, deleteRestaurant, getALLRests, getONERest, updateRest } from "../COLLECTIONS/Restaurants";
import { CreateUser, validateUser } from "../COLLECTIONS/Users";
import { City } from "../TYPES/City";
import { ArraydeRestEnCiudad, getCity } from "../COLLECTIONS/Cities";


export const resolvers: IResolvers = {
    Query: {
        me: async (_,__, {user}) => {
            if(!user) throw new Error ("Login necesaria");
            return {_id: user._id.toString(), ...user}; 
        },

        getRestaurants: async (_,{page,size}) => {
            return await getALLRests(page,size);
        },

        getRestaurant: async (_,{_id}) => {
            return await getONERest(new ObjectId(_id));
        },

          getCity: async (_, {_id}) => {
            return await getCity(new ObjectId(_id));
        },
    },

    Mutation: {
        register: async(_,{email,password}) => {
            const UserId = await CreateUser(email, password);
            return signToken(UserId);
        },

        login: async(_,{email,password}) => {
            const user = await validateUser(email, password);
            if(!user) throw new Error ("ERROR: Credenciales incorrectos");
            return signToken(user._id.toString());
        },


        addRestaurant: async(_, {name, address, city, phone}, {user}) => {
            if(!user) throw new Error ("ERROR: Necesitas estar logeado para añadir restaurante");
            return await addRest(name,address,city,phone);
        },

        updateRestaurant: async(_,{restaurant}, {city}) => {
            return await updateRest(restaurant, city);
        },

        deleteRestaurant: async(_, {_id}, {user}) => {
            if(!user) throw new Error ("ERROR: Necesitas estar logeado para eliminar restaurante");
            return await deleteRestaurant(new ObjectId(_id));
        },
    },

    City: {
        restaurants: async(parent: City) => {
            return await ArraydeRestEnCiudad(parent.restaurants);
        }
    },
};