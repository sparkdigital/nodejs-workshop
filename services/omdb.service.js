/*
 * OMDB helper service
 *
 * This service queries some of the OMDB's API endpoints to fetch movies data.
 *
 * The OMDB service schemas:
 *
 * - Error
 *
 * {"Response":"False","Error":"Error Message"}
 *
 * - Movies list
 *
 * {"Search":[...movies list... ],"totalResults":"nn","Response":"True"}
 *
 * - Movie info
 *
 * {"Title":"...","Year":"...","Rated":"...","Released":"...","Runtime":"...","Genre":"...","Director":"...","Writer":"...","Actors":"...","Plot":"...","Language":"...","Country":"...","Awards":"...","Poster":"...","Ratings":[{"Source":"...","Value":"..."},...],"Metascore":"...","imdbRating":"...","imdbVotes":"...","imdbID":"...","Type":"movie","DVD":"...","BoxOffice":"...","Production":"...","Website":"...","Response":"True"}
 *
 */

'use strict';

// Require Node's HTTP module
const request = require('request');

// Create a helper function for the module. This encapsulates the proper HTTP request.
function makeOmdbRequest(path, callback) {
  const hostname = 'http://www.omdbapi.com';

  // Execute the actual HTTP call and set a callback
  return request({
    uri: `${hostname}${path}`,
    json: true
  }, (error, response, body) => {
      // We want to follow Node's callback convention: callback(err, res).
      // If there was no error (Response === true), we send back the json response,
      // else we send it, but as an error
      if(body.Response === 'True') {
        callback(null, body);
      } else {
        callback(body);
      }
  });
}

// Create the class
class OMDB {

  // Define static methos, to be called without a class instance.
  static search(query, callback) {
    const path = `/?type=movie&s=${query}`;

    return makeOmdbRequest(path, (err, response) => {
      if(response) {
        // If there was no error, only return the movies array
        response = response.Search;
      }

      callback(err, response);
    });
  }

  static get(imdbId, callback) {
    const path = `/?i=${imdbId}`;

    return makeOmdbRequest(path, callback);
  }
}

// Export the module, so any other module can require it
module.exports = OMDB;
