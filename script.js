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

searchInput.addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  Array.from(gallery).forEach(item => {
    const keywords = item.getAttribute('data-keywords').toLowerCase();
    const name = item.getAttribute('data-name').toLowerCase();
    const category = item.getAttribute('data-category').toLowerCase();

    // Check if the item belongs to the currently selected category
    const categoryMatch = currentCategory === 'all' || category === currentCategory;

    if ((searchTerm === '' || keywords.includes(searchTerm) || name.includes(searchTerm)) && categoryMatch) {
      item.style.display = 'inline-block';
    } else {
      item.style.display = 'none';
    }
  });
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
    Array.from(gallery).forEach(item => {
      const category = item.getAttribute('data-category').toLowerCase();

      // Check if the item belongs to the currently selected category
      const categoryMatch = currentCategory === 'all' || category === currentCategory;

      if (categoryMatch) {
        item.style.display = 'inline-block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
