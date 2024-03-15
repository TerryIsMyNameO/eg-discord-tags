// Generate tag gallery from json file
fetch('gallery-data.json')
  .then(response => response.json())
  .then(data => {
    // Sort the data array alphabetically by name
    data.sort((a, b) => a.name.localeCompare(b.name));

    const galleryDiv = document.getElementById('gallery');
    data.forEach(item => {
      // Create imageContainer div
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');
      imageContainer.setAttribute('data-keywords', item.keywords);
      imageContainer.setAttribute('data-name', item.name);
      imageContainer.setAttribute('data-category', item.category);

      const cmdName = 'name: ' + item.name;
      var cmdCat = ''; // Initialize cmdCat
      var dispCat = ''; // Initialize dispCat

      // Check if tag is categorized and update cmdCat and dispCat
      if (item.category !== ''){
        cmdCat = ' category: ' + item.category;
        dispCat = " |" + cmdCat;
      }

      // Generate and set title for tooltip
      imageContainer.title = cmdName + dispCat;

      // Generate and set command to be copied
      const cmd = '/tag get ' + cmdName + cmdCat;
      imageContainer.setAttribute('data-command', cmd);

      // Create image element
      const image = document.createElement('img');
      image.src = item.src;

      // Create div for clipboard icon on hover
      const iconContainer = document.createElement('div');
      iconContainer.classList.add('icon');

      // Create clipboard SVG element
      const clipboard = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      clipboard.setAttribute("class", "react-button");
      clipboard.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      clipboard.setAttribute("viewBox", "0 0 496 512");

      // Create and set the path for the SVG
      const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathElement.setAttribute("fill", "#ffffff");
      pathElement.setAttribute("d", "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm-160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm194.8 170.2C334.3 380.4 292.5 400 248 400s-86.3-19.6-114.8-53.8c-13.6-16.3 11-36.7 24.6-20.5 22.4 26.9 55.2 42.2 90.2 42.2s67.8-15.4 90.2-42.2c13.4-16.2 38.1 4.2 24.6 20.5z");

      // Set the comment for the SVG
      clipboard.appendChild(document.createComment("Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."));

      // Append the path to the SVG element
      clipboard.appendChild(pathElement);

      // Append SVG clipboard to iconContainer
      iconContainer.appendChild(clipboard);

      // Append image and iconContainer to imageContainer
      imageContainer.appendChild(image);
      imageContainer.appendChild(iconContainer);

      // Append imageContainer to gallery
      galleryDiv.appendChild(imageContainer);
    });
  })
  .catch(error => console.error('Error fetching gallery data:', error));


// Listen for clicks on category links and filter images based on chosen category
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


// Search
const searchInput = document.getElementById('search');
const gallery = document.getElementById('gallery').children;
let currentCategory = 'all'; // Initialize currentCategory
let currentSearchTerm = ''; // Initialize currentSearchTerm

// Read Search Input
searchInput.addEventListener('input', function() {
  currentSearchTerm = this.value.toLowerCase(); // Update currentSearchTerm
  applySearchFilter(); // Apply search filter
});


// Clear search input when clear button is clicked
document.getElementById('clear-search').addEventListener('click', function() {
  searchInput.value = ''; // Clear search input
  currentSearchTerm = ''; // Reset currentSearchTerm
  applySearchFilter(); // Apply search filter
  toggleClearButton(); // Hide clear button
});

// Show/hide clear button
searchInput.addEventListener('input', toggleClearButton);
function toggleClearButton() {
  const clearButton = document.getElementById('clear-search');
  clearButton.style.display = searchInput.value ? 'block' : 'none';
}

// Apply search filter
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

// Listen if gallery item is clicked
document.getElementById('gallery').addEventListener('click', function(event) {
  const clickedContainer = event.target.closest('.image-container');
  if (clickedContainer) {
    const command = clickedContainer.getAttribute('data-command');
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

// Listen for when the react button is clicked
document.getElementById('react-button').addEventListener('click', function(event) {
  alert("uh..this doesn't do anything yet");
});

// Listen for when the info button is clicked
document.getElementById('info-button').addEventListener('click', function(event) {
  alert("uh..this doesn't do anything yet");
});
