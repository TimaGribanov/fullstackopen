import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int, $genres: [String]) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author{name}
      published
      genres
    }
  }
`

export const CHANGE_AUTHOR = gql`
  mutation changeAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
        books {title}
    }
  }
`

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title,
        author{name},
        published,
        genres
    }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
        ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const BOOKS_BY_GENRE = gql`
    query booksByGenre($genre: String) {
        allBooks(genre: $genre) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const GET_USER = gql`
    query getUser {
        me {
            username,
            favourite
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`