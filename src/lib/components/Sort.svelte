<script>
    import { onMount } from 'svelte';
    import { productStore } from '../../store/store.js';

    /**
     * Current sorting method.
     * @type {string}
     */
    let sorting;

    const { subscribe, sortProducts, setSorting } = productStore;

    /**
     * Life cycle hook that will be used to subscribe to productStore updates on component mount.
     *  Which updates the sorting method from the store's state.
     */
    onMount(() => {
        subscribe(value => {
        sorting = value.sorting;
        });
    });

    /**
     * Handle the sorting method change.
     * Updates the sorting method in the store and sorts products accordingly.
     * @param {Object} event - The change event from the sorting dropdown.
     */
    const handleSort = (event) => {
        setSorting(event.target.value);
        sortProducts();
    };
</script>


<div class="flex sm:w-[95%] max-w-[21rem] md:w-full">
    <label for="sort" class="w-20 my-auto font-semibold">
      Sort by: 
    </label>
    <select
      on:change={handleSort}
      bind:value={sorting}
      name=""
      id="sort"
      class="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="default">Default</option>
      <option value="low">Price: Low to High</option>
      <option value="high">Price: High to Low</option>
    </select>
  </div>
  