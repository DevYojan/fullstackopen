const { v1: uuid } = require('uuid');
const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');

const MONGODB_URI =
  'mongodb+srv://yojan:yojan@cluster0.je1im.mongodb.net/?retryWrites=true&w=majority';

console.log('Connecting to: ', MONGODB_URI);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB: ', error.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]!
    id: ID!
  }

  type Author {
    name: String!
    born: String
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      console.log(args);
      if (args.genre) {
        return books.filter((book) => book.genres.includes(args.genre));
      }

      if (args.author) {
        return books.filter((book) => book.author === args.author);
      }

      return books;
    },
    allAuthors: () => {
      return authors.map((a) => a);
    },
  },

  Author: {
    bookCount: (root) => {
      return books.filter((book) => book.author === root.name).length;
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      console.log({ ...args });
      const newBook = new Book({ ...args });
      await newBook.save();
      return newBook;
    },

    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name);

      if (author === null) {
        return;
      }

      author.born = args.setBornTo;
      authors = authors.map((at) => (at.name === author.name ? author : at));
      return author;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
