const typeDefs = `
    type Author {
        name: String!
        books: [Book]!
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
    
    type Subscription {
      bookAdded: Book!
    }
`

module.exports = typeDefs