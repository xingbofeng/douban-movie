import {
  server,
  apikey,
} from './serverConfig';

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
  Ajax(`${server}/v2/movie/in_theaters?apikey=${apikey}&count=${count}&start=${start}`);
// 即将上映
export const commingSoon = (count, start) =>
  Ajax(`${server}/v2/movie/coming_soon?apikey=${apikey}&count=${count}&start=${start}`);
// top250
export const top250 = (count, start) =>
  Ajax(`${server}/v2/movie/top250?apikey=${apikey}&count=${count}&start=${start}`);
// 北美票房榜
export const usBox = (count, start) =>
  Ajax(`${server}/v2/movie/us_box?apikey=${apikey}&count=${count}&start=${start}`);
// 口碑榜
export const weekly = (count, start) =>
  Ajax(`${server}/v2/movie/weekly?apikey=${apikey}&count=${count}&start=${start}`);
// 新片榜
export const newMovies = (count, start) =>
  Ajax(`${server}/v2/movie/new_movies?apikey=${apikey}&count=${count}&start=${start}`);
// 当前电影详情信息
export const currentMovie = currentMovieId =>
  Ajax(`${server}/v2/movie/subject/${currentMovieId}?apikey=${apikey}`);
// 当前电影短评信息
export const comments = (currentMovieId, count, start) =>
  Ajax(`${server}/v2/movie/subject/${currentMovieId}/comments?apikey=${apikey}&count=${count}&start=${start}`);
  // 当前电影短评信息
export const reviews = (currentMovieId, count, start) =>
  Ajax(`${server}/v2/movie/subject/${currentMovieId}/reviews?apikey=${apikey}&count=${count}&start=${start}`);
// 当前标签详情信息
export const getTagData = (tag, count, start) =>
  Ajax(`${server}/v2/movie/search?apikey=${apikey}&tag=${tag}&count=${count}&start=${start}`);
