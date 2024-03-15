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
      var dispCat = ''; // Initialize

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
      clipboard.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      clipboard.setAttribute("viewBox", "0 0 496 512");

      // Create and set the path for the SVG
      const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathElement.setAttribute("fill", "#ffffff");
      pathElement.setAttribute("d", "M104.6 48H64C28.7 48 0 76.7 0 112V384c0 35.3 28.7 64 64 64h96V400H64c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H80c0 17.7 14.3 32 32 32h72.4C202 108.4 227.6 96 256 96h62c-7.1-27.6-32.2-48-62-48H215.4C211.6 20.9 188.2 0 160 0s-51.6 20.9-55.4 48zM144 56a16 16 0 1 1 32 0 16 16 0 1 1 -32 0zM448 464H256c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16l140.1 0L464 243.9V448c0 8.8-7.2 16-16 16zM256 512H448c35.3 0 64-28.7 64-64V243.9c0-12.7-5.1-24.9-14.1-33.9l-67.9-67.9c-9-9-21.2-14.1-33.9-14.1H256c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64z");

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
const reactButton = document.getElementById('react-button');
const emoteMenu = document.getElementById('emotes');

reactButton.addEventListener('click', function(event) {
  toggleEmoteMenu();
});


// Add event listener to hide iframe when clicked outside of it
document.addEventListener('click', (event) => {
  const isClickOnReactButton = reactButton.contains(event.target);
  if (!isClickOnReactButton && reactButton.classList.contains('active')) {
    toggleEmoteMenu();
  }
});

// Function to toggle emote menu
function toggleEmoteMenu(){
    //check if reaction menu is active and toggle on/off
    if(reactButton.classList.contains('active')){
    reactButton.classList.remove('active');
    emotes.style.display = 'none';
  } else {
    reactButton.classList.add('active');
    emotes.style.display = 'block';
  }
}

// Listen for when the info button is clicked
document.getElementById('info-button').addEventListener('click', function(event) {
  alert("uh..this doesn't do anything yet");
});
