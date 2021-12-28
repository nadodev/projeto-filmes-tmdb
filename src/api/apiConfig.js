const apiConfig = {
  baseUrl: "http://api.themoviedb.org/3/",
  apiKey: "9485e521f73209c2a78614a83105fd49",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
};

export default apiConfig;
