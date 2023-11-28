// Replace 'YOUR_NYT_API_KEY' with your New York Times API key
const apiKey = 'j3RX19EmEo2JQb68yVjQXJ6HgZ6xdWAg';
const apiUrl = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json';

// Function to fetch best-selling books
async function fetchBooks() {
  const url = `${apiUrl}?api-key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Display books on the webpage
    displayBooks(data.results.books);
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

// Function to display books on the webpage
function displayBooks(books) {
  const booksList = document.getElementById('books-list');

  // Clear existing books before displaying new ones
  booksList.innerHTML = '';

  books.forEach(book => {
    const listItem = document.createElement('li');
    listItem.classList.add('book-item'); // Add a class for styling

    // Create elements for book information
    const titleElement = document.createElement('strong');
    titleElement.textContent = book.title;

    const authorElement = document.createElement('p');
    authorElement.textContent = `by ${book.author}`;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = book.description;

    // Append elements to the list item
    listItem.appendChild(titleElement);
    listItem.appendChild(authorElement);
    listItem.appendChild(descriptionElement);

    // Append the list item to the books list
    booksList.appendChild(listItem);
  });
}

// Function to handle button click
function onButtonClick() {
  // Toggle the visibility of the books list
  const booksList = document.getElementById('books-list');
  booksList.style.display = (booksList.style.display === 'none' || booksList.style.display === '') ? 'block' : 'none';

  // If the books list is visible, fetch and display best-selling books
  if (booksList.style.display === 'block') {
    fetchBooks();
  }
}

// Add an "Open" button
const openButton = document.createElement('button');
openButton.textContent = 'Open Books List';
openButton.className = 'action-button'; // Apply the CSS class for styling
openButton.addEventListener('click', onButtonClick);

// Add a "Close" button
const closeButton = document.createElement('button');
closeButton.textContent = 'Close Books List';
closeButton.className = 'action-button'; // Apply the CSS class for styling
closeButton.addEventListener('click', () => {
  const booksList = document.getElementById('books-list');
  booksList.style.display = 'none';
});

// Append the buttons to the body
document.body.appendChild(openButton);
document.body.appendChild(closeButton);

// Fetch books when the page loads
window.onload = fetchBooks;
