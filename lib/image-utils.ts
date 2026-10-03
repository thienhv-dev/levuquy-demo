/**
 * Utility function to get the correct image path with basePath prefix for GitHub Pages deployment
 * This is needed for regular <img> tags that don't automatically use Next.js basePath
 */
export function getImagePath(imagePath: string): string { 
  // In production (GitHub Pages), add basePath prefix
  const basePath = '/levuquy-demo' // Change this to your repository name
  
  return imagePath.startsWith('/') ? `${basePath}${imagePath}` : `${basePath}/${imagePath}`
}