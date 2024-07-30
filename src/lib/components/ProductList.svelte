<script>
    import { productStore } from '../../store/store.js';
    import ProductCard from './ProductCard.svelte';
    import CardSkeleton from './CardSkeleton.svelte';
    import Error from './Error.svelte';

    /**
     * An Array of products.
     * @type {object[]}
     */
    let products = [];

    /**
     * Loading state.
     * @type {boolean}
     */
    let loading = false;

    /**
     * A variable for error status or Error message.
     * @type {string|boolean}
     */
    let error = null;
  
    /**
     * Using the subscribe from productStore which subscribes to the product store and updates products, loading, and error state.
     * @param {object} value - The current state of the product store.
     */
    productStore.subscribe(value => {
      products = value.products;
      loading = value.loading;
      error = value.error;
    });
  
    console.log('new product', products)
  </script>
  
  {#if loading && !error}
    <div class="grid justify-center">
      <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
        {#each new Array(20) as cards}
          <CardSkeleton  />
        {/each}
      </div>
    </div>
  {:else if error}
    <div class="grid justify-center">
      <Error />
    </div>
  {:else}
    <div class="grid justify-center">
      <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
        {#each products as product}
          <ProductCard key={product.id} {...product} />
        {/each}
      </div>
    </div>
  {/if}
  
  