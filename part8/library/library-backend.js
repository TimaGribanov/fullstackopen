const {ApolloServer} = require('@apollo/server')
const {startStandaloneServer} = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birth year not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birth year not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'Demons',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]


const typeDefs = `
    type Author {
        name: String!
        bookCount: Int!
        born: Int
    }
    
    type Book {
        title: String!
        published: Int!
        author: String!
        id: ID!
        genres: [String!]!
    }

    type Query {
        authorCount: Int!
        bookCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
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
        authorCount: () => authors.length,
        bookCount: () => books.length,
        // allBooks: () => books,
        allBooks: (root, args) => {
            if (args.author === undefined) {
                if (args.genre === undefined)
                    return books
                else
                    return books.filter(b => b.genres.includes(args.genre))
            } else {
                if (args.genre === undefined)
                    return books.filter(b => b.author === args.author)
                else
                    return books.filter(b => b.genres.includes(args.genre)).filter(b => b.author === args.author)
            }

        },
        allAuthors: () => authors
    },

    Author: {
        name: (root) => root.name,
        bookCount: (root) => books.filter(b => b.author === root.name).length
    },

    Mutation: {
        addBook: (root, args) => {
            const book = { ...args }
            books = books.concat(book)
            if (authors.filter(a => a.name === args.author).length === 0) {
                const person = {
                    name: args.author,
                    id: uuid()
                }
                authors = authors.concat(person)
            }
            return book
        },
        editAuthor: (root, args) => {
            if (authors.filter(a => a.name === args.name).length === 0) return null

            let personToEdit = authors.filter(a => a.name === args.name)[0]
            personToEdit = { born: args.setBornTo, ...personToEdit}
            authors = authors.map(a => a.name === personToEdit.name ? personToEdit : a)
            return personToEdit
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