function GetImage(size, image) {
  if (image == undefined || image == null || image == "") return false;
  return `https://image.tmdb.org/t/p/${size}${image}`;
}

export default GetImage;
