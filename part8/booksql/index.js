const { v1: uuid } = require('uuid');
const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');

const MONGODB_URI =
  'mongodb+srv://yojan:yojan@cluster0.je1im.mongodb.net/library?retryWrites=true&w=majority';

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
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => {
      const allBooks = await Book.find({});
      return allBooks.length;
    },
    authorCount: () => authors.length,
    allBooks: async () => {
      return await Book.find({});
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

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });

      if (author === null) {
        return;
      }

      author.born = args.setBornTo;
      return await author.save();
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
