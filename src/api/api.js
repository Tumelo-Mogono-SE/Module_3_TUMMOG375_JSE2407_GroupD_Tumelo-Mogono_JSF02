/**
 * Fetches the list of product categories from the API.
 * @returns {Promise<Object>} A promise that resolves to an object containing the response data or an error.
 */
export const getCategories = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products/categories");
      if (!response.ok) {
        throw new Error("Data fetching failed, please check your network connection");
      }
      const data = await response.json();
      return { response: data };
    } catch (error) {
      return { error: error };
    }
  };
  
  /**
 * Fetches the details of a single product from the API by its ID.
 * @param {number} id - The ID of the product to fetch.
 * @returns {Promise<Object>} A promise that resolves to an object containing the response data or an error.
 */
  export const fetchSingleProduct = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!response.ok) {
        throw new Error("Data fetching failed :( , please check your network connection and reload.");
      }
      const data = await response.json();
      console.log(data)
      return { response: data };
    } catch (error) {
      return { error: error };
    }
  };

