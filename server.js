import { ApolloServer, gql } from 'apollo-server';

const musics = [
    {name: "2002" , artist: "Anne-Marie" , type: "Pop"},
    {name: "Lost star" , artist: "Adam Levine" , type: "Pop"},
    {name: "Back in back" , artist: "AC/DC" , type: "Rock"}
];
//schema
const typeDefs = gql`
    type Query {
        musics: [Music]
        music(name: String): Music
    }
    type Music {
        name: String
        artist: String
        type: String
    }
`;

//resolver
const resolvers = {
    Query: {
        musics: (parent, args, context, info) => {
            return musics;
        },
        music: (parent, args, context, info) => {
            return musics.find(music => music.name === args.name);
        }
    }
};

//function apollo-server
const startApolloServer = async (typeDefs, resolvers) => {
    const server = new ApolloServer({ typeDefs, resolvers });
    const { url } = await server.listen();
    console.log(`Server ready at ${url}`);
};

//call function
startApolloServer(typeDefs, resolvers);