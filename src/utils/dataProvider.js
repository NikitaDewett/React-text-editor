import axios from 'axios';

/**
 * Get synonyms for passed word from datamuse api
 * @param word {string} word of which we're looking for synonyms
 * @returns {Promise}
 */
const getSynonyms = (word) => 
  axios.get(`https://api.datamuse.com/words?ml=${word}&max=5`)
    .then(res => res.data);

export {
  getSynonyms
}
