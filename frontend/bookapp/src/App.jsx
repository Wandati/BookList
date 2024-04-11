import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    publication_date: "",
    isbn: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("https://booklist-tp5r.onrender.com/api/books/");
      setBooks(response.data);
    } catch (error) {
      setError("Failed to fetch books");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://booklist-tp5r.onrender.com/api/books/", newBook);
      alert("Book added successfully");
      fetchBooks();
      setShowAddForm(false);
      setNewBook({
        title: "",
        author: "",
        publication_date: "",
        isbn: "",
      });
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book");
    }
  };

  const handleUpdate = (book) => {
    setShowAddForm(false);
    setSelectedBook(book);
    setNewBook(book);
    setShowUpdateForm(true);
    window.scrollTo(0, 0);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const updatedBook = {
      title: newBook.title,
      author: newBook.author,
      publication_date: newBook.publication_date,
      isbn: newBook.isbn,
    };

    try {
      await axios.put(
        `https://booklist-tp5r.onrender.com/api/books/${selectedBook.id}/`,
        updatedBook
      );
      alert("Book updated successfully");
      fetchBooks();
      setShowUpdateForm(false);
      setNewBook({
        title: "",
        author: "",
        publication_date: "",
        isbn: "",
      });
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Failed to update book");
    }
  };

  const handleDelete = async (id) => {
    const book_id = Number(id);
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`https://booklist-tp5r.onrender.com/api/books/${book_id}/`);
        alert("Book deleted successfully");
        fetchBooks();
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("Failed to delete book");
      }
    }
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    setNewBook({
      title: "",
      author: "",
      publication_date: "",
      isbn: "",
    });
  };

  const handleCancelUpdate = () => {
    setShowUpdateForm(false);
    setNewBook({
      title: "",
      author: "",
      publication_date: "",
      isbn: "",
    });
  };

  // Logic for displaying current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1 className="text-center mt-5 mb-4">BooksApp</h1>

      <div className="mb-3">
        {!showUpdateForm && (
          <button
            className="btn btn-secondary mr-2"
            onClick={() => setShowAddForm(!showAddForm)}>
            Add A Book
          </button>
        )}
      </div>
      {showAddForm && (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Title"
                  name="title"
                  value={newBook.title}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="title">Title</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  placeholder="Author"
                  name="author"
                  value={newBook.author}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="author">Author</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="publication_date"
                  name="publication_date"
                  value={newBook.publication_date}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="publication_date">Publication Date</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="isbn"
                  placeholder="ISBN"
                  name="isbn"
                  value={newBook.isbn}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="isbn">ISBN</label>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-outline-secondary mr-2">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-dark m-4"
            onClick={handleCancelAdd}>
            Cancel
          </button>
        </form>
      )}
      {showUpdateForm && selectedBook && (
        <>
          <h2 className="mb-4">Update Form</h2>
          <form onSubmit={handleUpdateSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="updateTitle"
                    placeholder="Title"
                    name="title"
                    value={newBook.title}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="updateTitle">Title</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="updateAuthor"
                    placeholder="Author"
                    name="author"
                    value={newBook.author}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="updateAuthor">Author</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="date"
                    className="form-control"
                    id="updatePublicationDate"
                    name="publication_date"
                    value={newBook.publication_date}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="updatePublicationDate">
                    Publication Date
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="updateISBN"
                    placeholder="ISBN"
                    name="isbn"
                    value={newBook.isbn}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="updateISBN">ISBN</label>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-outline-secondary mr-2">
              Update
            </button>
            <button
              type="button"
              className="btn btn-dark m-4"
              onClick={handleCancelUpdate}>
              Cancel
            </button>
          </form>
        </>
      )}

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publication Date</th>
              <th>ISBN</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {currentBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publication_date}</td>
                <td>{book.isbn}</td>
                <td>
                  <button
                    className="btn btn-outline-secondary mr-2 btn-sm"
                    onClick={() => handleUpdate(book)}>
                    Update
                  </button>
                  <button
                    className="btn btn-danger m-2 btn-sm"
                    onClick={() => handleDelete(book.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="Page navigation">
        <ul
          className="pagination justify-content-center"
          style={{ color: "black" }}>
          {Array.from(
            { length: Math.ceil(books.length / booksPerPage) },
            (_, i) => (
              <li
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                key={i + 1}>
                <button
                  className="page-link"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid gray",
                  }}
                  onClick={() => paginate(i + 1)}>
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
  );
}

export default App;
