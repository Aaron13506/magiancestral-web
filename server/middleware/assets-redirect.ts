export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  
  // Redirect old static paths to new asset paths
  if (url.pathname.startsWith('/static/assets/')) {
    const newPath = url.pathname.replace('/static/assets/', '/assets/')
    return sendRedirect(event, newPath, 301)
  }
  
  // Handle any other legacy asset paths
  if (url.pathname.startsWith('/static/')) {
    const newPath = url.pathname.replace('/static/', '/')
    return sendRedirect(event, newPath, 301)
  }
})