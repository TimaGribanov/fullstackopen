const {ApolloServer} = require('@apollo/server')
const {startStandaloneServer} = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const {GraphQLError} = require('graphql')
const jwt = require('jsonwebtoken')
mongoose.set('strictQuery', false)
const Author = require('./models/person')
const Book = require('./models/book')
const User = require('./models/user')
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
    
    type User {
        username: String!
        id: ID!
        favourite: String
    }
    
    type Token {
        value: String!
    }
    type Query {
        authorCount: Int!
        bookCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        findAuthor: Author!
        me: User
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
        createUser(
            username: String!
            favourite: String
        ): User
        login(
            username: String!
            password: String!
        ): Token
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
      if (args.genre) {
        if (args.genre === '') return Book.find({})
        return Book.find({genres: args.genre})
      }
      return Book.find({})
    },
    me: (root, args, context) => context.currentUser
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
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
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
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
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
    },
    createUser: async (root, args) => {
      const user = new User({username: args.username})
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return {value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: {port: 4000},
  context: async ({req, res}) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return {currentUser}
    }
  }
}).then(({url}) => {
  console.log(`Server ready at ${url}`)
})