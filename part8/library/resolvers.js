const Author = require('./models/person')
const Book = require('./models/book')
const {GraphQLError} = require('graphql/index')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    authorCount: async () => await Author.collection.countDocuments(),
    allAuthors: async () => await Author.aggregate([{
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: 'author',
        as: 'books'
      }
    }]),
    findAuthor: async (root, args) => await Author.findOne({name: args.name}),
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
    name: (root) => root.name
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

      await pubsub.publish('BOOK_ADDED', {bookAdded: book})

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
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers