const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);//so by here we got an image to send over

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  ); //posted to cloudinary

  if (!res.ok) {
    throw new Error('Image upload failed');
  } //error or not

  const data = await res.json(); //returns the link
  return data.secure_url; // the public HTTPS URL of the uploaded image
}