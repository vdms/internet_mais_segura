// =========================================
// SOCIAL SHARING FUNCTIONALITY
// =========================================

export function initSocialShare() {
  const shareButtons = document.querySelectorAll('.social-share-button');
  
  shareButtons.forEach(button => {
    button.addEventListener('click', handleShare);
  });
}

function handleShare(e) {
  const button = e.currentTarget;
  const platform = button.dataset.platform;
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const text = encodeURIComponent(
    document.querySelector('meta[name="description"]')?.content || ''
  );
  
  let shareUrl = '';
  
  switch (platform) {
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
      break;
      
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
      
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      break;
      
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${title}%20${url}`;
      break;
      
    case 'email':
      shareUrl = `mailto:?subject=${title}&body=${text}%0A%0A${url}`;
      break;
      
    case 'copy':
      copyToClipboard(window.location.href, button);
      return;
      
    default:
      console.warn('Unknown share platform:', platform);
      return;
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400,noopener,noreferrer');
  }
}

async function copyToClipboard(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    
    // Visual feedback
    const originalContent = button.innerHTML;
    button.classList.add('copied');
    button.innerHTML = '✓';
    
    setTimeout(() => {
      button.classList.remove('copied');
      button.innerHTML = originalContent;
    }, 2000);
    
  } catch (error) {
    console.error('Failed to copy:', error);
    
    // Fallback for older browsers
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }
}

// Web Share API support (for mobile)
export function initNativeShare() {
  if (!navigator.share) return;
  
  const shareButtons = document.querySelectorAll('.native-share-button');
  
  shareButtons.forEach(button => {
    button.addEventListener('click', async () => {
      try {
        await navigator.share({
          title: document.title,
          text: document.querySelector('meta[name="description"]')?.content || '',
          url: window.location.href
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Share failed:', error);
        }
      }
    });
  });
}

export { copyToClipboard };
