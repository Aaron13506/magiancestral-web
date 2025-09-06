export default defineNuxtPlugin(() => {
  if (process.client) {
    // Load scripts synchronously to avoid race conditions
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    // Load GLightbox first, then accordion
    loadScript('/assets/plugins/glightbox/glightbox.min.js')
      .then(() => loadScript('/assets/plugins/accordion/accordion.min.js'))
      .then(() => {
        // Initialize GLightbox when DOM is ready
        const initLightbox = () => {
          if (typeof GLightbox !== 'undefined') {
            const lightbox = GLightbox({
              touchNavigation: true,
              loop: true,
              autoplayVideos: false
            });
          }
        };
        
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initLightbox);
        } else {
          initLightbox();
        }
      })
      .catch(error => {
        console.error('Error loading scripts:', error);
      });
  }
});