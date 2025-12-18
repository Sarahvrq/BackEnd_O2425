import { gql } from "apollo-server";

export const typeDefs = gql`

type User {
    _id: ID!
    email: String!
}

type Restaurant {
    _id: ID!
    name: String!
    address: String!
    city: ID!
    phone: String!
}

type City {
    _id: ID!
    name: String!
    country: String!
    restaurants: [Restaurant!]!
}



type Query {
    me: User

    getRestaurants(page: Int, size: Int): [Restaurant!]!
    getRestaurant(_id: ID!): Restaurant

    getCity(_id: ID!): City
}

    type Mutation {
        register(email: String!, password: String!): String!
        login(email: String!, password: String!): String!

        addRestaurant(name: String!, address: String!, city: ID!, phone: String!): Restaurant!
        updateRestaurant(_id: ID!, name: String, address: String, city: ID, phone: String): Restaurant!
        deleteRestaurant(_id: ID!): Boolean!
}

`;