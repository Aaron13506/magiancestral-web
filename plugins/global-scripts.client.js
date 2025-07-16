export default defineNuxtPlugin(() => {
  if (process.client) {
    // Load global scripts
    const scripts = [
      '/assets/plugins/glightbox/glightbox.min.js',
      '/assets/plugins/accordion/accordion.min.js'
    ];
    
    scripts.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    });
  }
});