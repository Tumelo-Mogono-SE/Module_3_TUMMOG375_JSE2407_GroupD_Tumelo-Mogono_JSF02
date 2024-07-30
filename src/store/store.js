import { writable } from 'svelte/store';

function createProductStore() {
  const { subscribe, set, update } = writable({
    products: [],
    originalProducts: [],
    loading: false,
    error: false,
    sorting: 'default',
    filterItem: 'All categories',
  });

  const setSorting = (sorting) => update(state => ({ ...state, sorting }));
  const setFilterItem = (category) => update(state => ({ ...state, filterItem: category }));

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