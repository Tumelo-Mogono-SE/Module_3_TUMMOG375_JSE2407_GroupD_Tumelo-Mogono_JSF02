import { writable } from 'svelte/store';

/**
 * Creates a store for managing product data, including fetching, sorting, and filtering.
 * @returns {Object} An object containing store methods and properties.
 */
function createProductStore() {
  const { subscribe, set, update } = writable({
    products: [],
    originalProducts: [],
    loading: false,
    error: false,
    sorting: 'default',
    filterItem: 'All categories',
  });

  /**
   * Function that sets the sorting method for the product list.
   * @param {string} sorting - The sorting method ('default', 'low', 'high').
   */
  const setSorting = (sorting) => update(state => ({ ...state, sorting }));

  /**
   * Function that sets the filter category for the product list.
   * @param {string} category - The category to filter products by.
   */
  const setFilterItem = (category) => update(state => ({ ...state, filterItem: category }));

  /**
   * Function that fetches the products from the API based on the current filter category.
   * Updates the store with the fetched products or an error if the fetch fails.
   */
  const fetchProducts = async () => {
    update(state => ({ ...state, loading: true }));
    let filterItem;
    update(state => {
      filterItem = state.filterItem;
      return state;
    });

    try {
      const response = await fetch(
        filterItem !== 'All categories'
          ? `https://fakestoreapi.com/products/category/${filterItem}`
          : 'https://fakestoreapi.com/products'
      );

      if (!response.ok) {
        throw new Error("Data fetching failed, please check your network connection");
      }

      const data = await response.json();
      update(state => ({
        ...state,
        products: data,
        originalProducts: JSON.parse(JSON.stringify(data)), // Deep copy
        loading: false,
      }));
    } catch (error) {
      update(state => ({ ...state, error: error }));
    } finally {
      sortProducts();
    }
  };

  /**
   * Sorts the products in the store based on the current sorting method.
   * If the sorting method is 'default', the products are reset to the original order.
   */
  const sortProducts = () => {
    update(state => {
      if (state.sorting !== 'default') {
        state.products.sort((a, b) => (state.sorting === 'low' ? a.price - b.price : b.price - a.price));
      } else {
        state.products = JSON.parse(JSON.stringify(state.originalProducts)); // Reset to original
      }
      return state;
    });
  };

  return {
    subscribe,
    setSorting,
    setFilterItem,
    fetchProducts,
    sortProducts,
  };
}

export const productStore = createProductStore();