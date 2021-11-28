/**
 * retrieve produt data on server
 * @param {*} id optional id to specify in the url
 * @param {*} onSuccess success callback
 * @param {*} onError error callback
 */
const retrieveProductData = (id = null, onSuccess = null, onError = null) => {
  let url =
    id === null
      ? "http://localhost:3000/api/products"
      : "http://localhost:3000/api/products/" + id;
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onError(response.statusText);
      }
    })
    .then(onSuccess)
    .catch(onError);
};
