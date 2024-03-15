// Generate tag gallery from json file
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

      const cmdName = 'name: ' + item.name;
      var cmdCat = ''; // Initialize cmdCat
      var dispCat = ''; // Initialize dispCat

      //check if tag is categorized and update cmdCat and dispCat
      if (item.category !== ''){
        cmdCat = ' category: ' + item.category;
        dispCat = " |" + cmdCat;
      }

      const cmd = '/tag get ' + cmdName + cmdCat;

      imageContainer.title = cmdName + dispCat;
      imageContainer.setAttribute('data-command', cmd);


      const image = document.createElement('img');
      image.src = item.src;

      const iconContainer = document.createElement('div');
      iconContainer.classList.add('icon');

      const icon = document.createElement('i');
      icon.classList.add('fa');
      icon.classList.add('fa-clipboard');
      icon.setAttribute('aria-hidden', 'true');

      imageContainer.appendChild(image);
      iconContainer.appendChild(icon);
      imageContainer.appendChild(iconContainer);
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

// Listen for if info button is clicked
document.getElementById('info-button').addEventListener('click', function(event) {
  alert("uh..this doesn't do anything yet");
});
