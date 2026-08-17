/**
 * Cloudinary serves raw/PDF URLs inline by default (great for "view in
 * browser"). To make a real "Download" button that saves the file
 * instead of opening it, Cloudinary needs the `fl_attachment` flag in
 * the URL — that's what makes it send `Content-Disposition: attachment`,
 * which is required for the browser to download rather than navigate,
 * since the plain HTML `download` attribute is ignored for cross-origin
 * URLs like Cloudinary's CDN.
 */
export function toCloudinaryDownloadUrl(url) {
  if (!url) return url;
  if (url.includes("fl_attachment")) return url;
  return url.replace("/upload/", "/upload/fl_attachment/");
}
