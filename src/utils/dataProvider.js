import axios from 'axios';

/**
 * Get synonyms for passed word from datamuse api
 * @param word {string} word of which we're looking for synonyms
 * @returns {Promise}
 */
async function getSynonyms(word) {
  return await axios.get(`https://api.datamuse.com/words?ml=${word}&max=5`)
    .then(res => {
      return res.data
    });
};

export {
  getSynonyms
}
