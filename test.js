// write a function to retrieve a blob of json
// make an ajax request! use the fetch function

// function fetchAlbums() {
//   fetch("https://rallycoding.herokuapp.com/api/music_albums")
//     .then((res) => res.json())
//     .then((res) => console.log(res));
// }

// fetchAlbums();

const fetchAlbums = async () => {
  const res = await fetch("https://rallycoding.herokuapp.com/api/music_albums");
  const json = await res.json();
  console.log(json);
};

fetchAlbums();
