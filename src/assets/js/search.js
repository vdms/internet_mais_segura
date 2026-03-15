// =========================================
// SEARCH FUNCTIONALITY (Pagefind Integration)
// =========================================

let pagefind = null;

export async function initSearch() {
  const searchToggle = document.querySelector('.search-toggle');
  const searchModal = document.querySelector('.search-modal');
  const searchClose = document.querySelector('.search-close');
  const searchInput = document.querySelector('.search-input');
  
  if (!searchToggle || !searchModal) return;
  
  // Open search modal
  searchToggle.addEventListener('click', openSearch);
  
  // Close search modal
  searchClose?.addEventListener('click', closeSearch);
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to open search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    
    // Escape to close search
    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
      closeSearch();
    }
  });
  
  // Search input handler
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        performSearch(e.target.value);
      }, 300);
    });
  }
}

async function openSearch() {
  const searchModal = document.querySelector('.search-modal');
  const searchInput = document.querySelector('.search-input');
  
  searchModal.classList.add('active');
  searchInput?.focus();
  
  // Load Pagefind on first open
  if (!pagefind) {
    try {
      pagefind = await import('/pagefind/pagefind.js');
      await pagefind.init();
    } catch (error) {
      console.error('Failed to load search:', error);
    }
  }
}

function closeSearch() {
  const searchModal = document.querySelector('.search-modal');
  const searchInput = document.querySelector('.search-input');
  const searchResults = document.querySelector('.search-results');
  
  searchModal.classList.remove('active');
  if (searchInput) searchInput.value = '';
  if (searchResults) searchResults.innerHTML = '';
}

async function performSearch(query) {
  const searchResults = document.querySelector('.search-results');
  if (!searchResults || !pagefind) return;
  
  if (!query.trim()) {
    searchResults.innerHTML = '';
    return;
  }
  
  try {
    const results = await pagefind.search(query);
    
    if (results.results.length === 0) {
      searchResults.innerHTML = `
        <div class="search-empty">
          Nenhum resultado encontrado para "${query}"
        </div>
      `;
      return;
    }
    
    // Load and display results
    const items = await Promise.all(
      results.results.slice(0, 10).map(r => r.data())
    );
    
    searchResults.innerHTML = items.map(item => `
      <a href="${item.url}" class="search-result-item">
        <h4>${item.meta.title || 'Sem título'}</h4>
        <p>${item.excerpt}</p>
      </a>
    `).join('');
    
  } catch (error) {
    console.error('Search error:', error);
    searchResults.innerHTML = `
      <div class="search-empty">
        Erro ao pesquisar. Por favor, tente novamente.
      </div>
    `;
  }
}

export { openSearch, closeSearch };
