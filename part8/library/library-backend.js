const {ApolloServer} = require('@apollo/server')
const {startStandaloneServer} = require('@apollo/server/standalone')
const {v1: uuid} = require('uuid')
const mongoose = require('mongoose')
const {GraphQLError} = require('graphql')
mongoose.set('strictQuery', false)
const Author = require('./models/person')
const Book = require('./models/book')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting ot MongoDB: ', error.message))

const typeDefs = `
    type Author {
        name: String!
        bookCount: Int!
        born: Int
    }
    
    type Book {
        title: String!
        published: Int!
        author: Author
        id: ID!
        genres: [String!]!
    }

    type Query {
        authorCount: Int!
        bookCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        findAuthor: Author!
    }
    
    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int
            genres: [String]
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }
`

const resolvers = {
  Query: {
    authorCount: async () => await Author.collection.countDocuments(),
    allAuthors: async (root, args) => await Author.find({}),
    findAuthor: async (root, args) => await Author.findOne({name: args.name}),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        const authorObj = await Author.findOne({name: args.author})

        if (args.genre)
          return Book.find({author: authorObj, genres: args.genre})

        return Book.find({author: authorObj})
      }

      if (args.genre)
        return Book.find({genres: args.genre})

      return Book.find({})
    }
  },

  Author: {
    name: (root) => root.name,
    bookCount: async (root) => await Book.find({author: root._id}).countDocuments()
  },

  Book: {
    title: (root) => root.title,
    author: async (root) => await Author.findById(root.author)
  },

  Mutation: {
    addBook: async (root, args) => {
      let authorObj = await Author.findOne({name: args.author})

      if (authorObj === null) {
        authorObj = new Author({name: args.author})
        try {
          await authorObj.save()
        } catch (error) {
          throw new GraphQLError('Saving the author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      }

      const book = new Book({author: authorObj, title: args.title, published: args.published, genres: args.genres})

      try {
        book.save()
      } catch (error) {
        throw new GraphQLError('Saving the book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }

      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({name: args.name})
      author.born = args.setBornTo
      try {
        author.save()
      } catch (error) {
        throw new GraphQLError('Editing the author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.setBornTo,
            error
          }
        })
      }

      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: {port: 4000},
}).then(({url}) => {
  console.log(`Server ready at ${url}`)
})