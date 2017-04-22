const Ajax = url => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send(null);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(`Error: ${xhr.status}`);
      }
    }
  };
});

// 影院热映
export const hotMovie = Ajax('/v2/movie/in_theaters');
// 即将上映
export const commingSoon = Ajax('/v2/movie/coming_soon');
// top250
export const top250 = Ajax('/v2/movie/top250');
// 北美票房榜
export const usBox = Ajax('/v2/movie/us_box');
