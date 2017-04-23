import serverConfig from './serverConfig';

const Ajax = url => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send(null);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(`错误: ${xhr.status}`);
      }
    }
  };
});

// 影院热映
export const hotMovie = (count, start) =>
  Ajax(`${serverConfig}/v2/movie/in_theaters?count=${count}&start=${start}`);
// 即将上映
export const commingSoon = (count, start) =>
  Ajax(`${serverConfig}/v2/movie/coming_soon?count=${count}&start=${start}`);
// top250
export const top250 = (count, start) =>
  Ajax(`${serverConfig}/v2/movie/top250?count=${count}&start=${start}`);
// 北美票房榜
export const usBox = (count, start) =>
  Ajax(`${serverConfig}/v2/movie/us_box?count=${count}&start=${start}`);
// 当前电影详情信息
export const currentMovie = currentMovieId =>
  Ajax(`${serverConfig}/v2/movie/subject/${currentMovieId}`);
// 当前标签详情信息
export const getTagData = (tag, count, start) =>
  Ajax(`${serverConfig}/v2/movie/search?tag=${tag}&count=${count}&start=${start}`);
