  fetch('gallery-data.json')
  .then(response => response.json())
  .then(data => {
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

  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    Array.from(gallery).forEach(item => {
      const keywords = item.getAttribute('data-keywords').toLowerCase();
      const name = item.getAttribute('data-name').toLowerCase();
      if (searchTerm === '' || keywords.includes(searchTerm) || name.includes(searchTerm)) {
        item.style.display = 'inline-block';
      } else {
        item.style.display = 'none';
      }
    });
  });

// Add event listener to the gallery container for delegation
document.getElementById('gallery').addEventListener('click', function(event) {
  // Check if the clicked element is an image
  console.log('Clicked on an image');
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
          item.style.display = 'inline-block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
