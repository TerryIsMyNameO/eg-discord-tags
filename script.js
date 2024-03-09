fetch('gallery-data.json')
  .then(response => response.json())
  .then(data => {
    // Sort the data array alphabetically by name
    data.sort((a, b) => a.name.localeCompare(b.name));

    const galleryDiv = document.getElementById('gallery');
    data.forEach(item => {
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');
      imageContainer.setAttribute('data-keywords', item.keywords);
      imageContainer.setAttribute('data-name', item.name);
      imageContainer.setAttribute('data-category', item.category);

      const image = document.createElement('img');
      image.src = item.src;
      image.alt = item.alt;
      image.title = item.alt;
      image.setAttribute('data-command', item.command);

      imageContainer.appendChild(image);
      galleryDiv.appendChild(imageContainer);
    });
  })
  .catch(error => console.error('Error fetching gallery data:', error));

// JavaScript for search functionality
const searchInput = document.getElementById('search');
const gallery = document.getElementById('gallery').children;
let currentCategory = 'all'; // Initialize currentCategory
let currentSearchTerm = ''; // Initialize currentSearchTerm

// Function to apply search filter
function applySearchFilter() {
  Array.from(gallery).forEach(item => {
    const keywords = item.getAttribute('data-keywords').toLowerCase();
    const name = item.getAttribute('data-name').toLowerCase();
    const category = item.getAttribute('data-category').toLowerCase();

    // Check if the item belongs to the currently selected category and matches the search term
    const categoryMatch = currentCategory === 'all' || category === currentCategory;
    const searchMatch = currentSearchTerm === '' || keywords.includes(currentSearchTerm) || name.includes(currentSearchTerm);

    if (categoryMatch && searchMatch) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

searchInput.addEventListener('input', function() {
  currentSearchTerm = this.value.toLowerCase(); // Update currentSearchTerm
  applySearchFilter(); // Apply search filter
});

// Add event listeners to category links for filtering images
document.querySelectorAll('.category-link').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    // Remove the active class from all category links
    document.querySelectorAll('.category-link').forEach(link => {
      link.classList.remove('active-category');
    });
    // Add active class to the clicked category link
    this.classList.add('active-category');
    currentCategory = this.getAttribute('data-category').toLowerCase(); // Update currentCategory
    applySearchFilter(); // Apply search filter
  });
});

// Function to show/hide clear button based on search input value
function toggleClearButton() {
  const clearButton = document.getElementById('clear-search');
  clearButton.style.display = searchInput.value ? 'block' : 'none';
}

// Add event listener to show/hide clear button
searchInput.addEventListener('input', toggleClearButton);

// Add event listener to clear search input when clear button is clicked
document.getElementById('clear-search').addEventListener('click', function() {
  searchInput.value = ''; // Clear search input
  currentSearchTerm = ''; // Reset currentSearchTerm
  applySearchFilter(); // Apply search filter
  toggleClearButton(); // Hide clear button
});

// Add event listener to the gallery container for delegation
document.getElementById('gallery').addEventListener('click', function(event) {
  // Check if the clicked element is an image
  //console.log('Clicked on an image');
  if (event.target.tagName === 'IMG') {
    const command = event.target.getAttribute('data-command');
    copyToClipboard(command);
    alert('Command copied to clipboard: ' + command);
  }
});

// Function to copy text to clipboard
function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

  // Add event listeners to category links for filtering images
  document.querySelectorAll('.category-link').forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      // Remove the active class from all category links
      document.querySelectorAll('.category-link').forEach(link => {
        link.classList.remove('active-category');
      });
      // Add active class to the clicked category link
      this.classList.add('active-category');
      const category = this.getAttribute('data-category').toLowerCase();
      Array.from(gallery).forEach(item => {
        const itemCategory = item.getAttribute('data-category').toLowerCase();
        if (category === 'all' || itemCategory === category) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
