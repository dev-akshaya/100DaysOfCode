// Book Class : Represent Books
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
// UI Class : Handle UI Tasks
class UI {
  static displayBooks() {

    const books = Store.getBooks();

    books.forEach((book) => {
      UI.addBookToList(book);
    });
  }
  static addBookToList(book) {
    const list = document.getElementById('book-list');

    const row = document.createElement('tr');
    row.innerHTML = ` 
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
    `;

    list.appendChild(row);
  }

  static showAlert(message, className){
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Remove in 1sec
    setTimeout(() => document.querySelector('.alert').remove(), 2000);
  }

  static clearFields(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }

  static deleteBook(target){
    if(target.classList.contains('delete')){
      target.parentElement.parentElement.remove();
    }
  }
}

// Storage Class : Handle Storage --------------------------------
class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn){
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event : To Display Books ---------------------------------------
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event : To Add Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  //Prevent Defult Value
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // Validate Fields 
  if(title === '' || author === '' || isbn === '') {
    UI.showAlert('Please fill all the fields', 'danger');
  } else {
    const book = new Book(title, author, isbn);

    // Add Book to UI
    UI.addBookToList(book);

    // Add Book to local storage
    Store.addBook(book);
    
    // Show Alert
    UI.showAlert('Book Added', 'success');

    // Clear Fields
    UI.clearFields();
  }
});

// Event : To Remove Book
document.querySelector('#book-list').addEventListener('click', (e) => {

  // Remove Book from UI
  UI.deleteBook(e.target);

  // Remove book from Local Storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

  // Show Alert
  UI.showAlert('Book Removed', 'success');
});