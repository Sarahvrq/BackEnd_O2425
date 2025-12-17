import { ObjectId } from "mongodb";
import { getDB } from "../DB/mongo"
import { IResolvers } from "@graphql-tools/utils";
import { signToken } from "../auth";
import { USER_COLLECTION, RESTAURANT_COLLECTION,CITY_COLLECTION} from "../utils";
import { deleteRestaurant, getALLRests, getONERest, updateRest } from "../COLLECTIONS/Restaurants";
import { CreateUser, validateUser } from "../COLLECTIONS/Users";
import { City } from "../TYPES/City";
import { ArraydeRestEnCiudad } from "../COLLECTIONS/Cities";


export const resolvers: IResolvers = {
    Queries: {
        me: async (_,__, {user}) => {
            if(!user) throw new Error ("Login necesaria");
            return {_id: user._id.toString(), ...user}; 
        },

        getRestaurants: async (_,{page,size}) => {
            return await getALLRests(page,size);
        },

        getRestaurant: async (_,{id}) => {
            return await getONERest(id);
        },
    },

    Mutations: {
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
        },

        updateRestaurant: async(_,{restaurant}, {city}) => {
            return await updateRest(restaurant, city);
        },

        deleteRestaurant: async(_, {id}, {user}) => {
            if(!user) throw new Error ("ERROR: Necesitas estar logeado para eliminar restaurante");
            return await deleteRestaurant(id);
        },
    },

    City: {
        restaurants: async(parent: City) => {
            return await ArraydeRestEnCiudad(parent.restaurants);
        }
    },
};