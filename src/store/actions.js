import * as types from './mutation-types';
import { ajax } from '../util';

export const changeCurrentMovie = ({ commit }, currentMovieId) => {
  ajax(`/v2/movie/subject/${currentMovieId}`).then((currentMovie) => {
    commit(types.CURRENT_MOVIE, currentMovie);
  }).catch((error) => {
    commit(types.NET_ERROR, error);
  });
};
