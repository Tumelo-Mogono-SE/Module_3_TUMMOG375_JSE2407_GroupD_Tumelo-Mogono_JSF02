<script>
    import { onMount } from 'svelte';
    import ProductDetail from '../components/ProductDetail.svelte';
    import ProductSkeleton from '../components/ProductSkeleton.svelte';
    import Error from '../components/Error.svelte';
    import { fetchSingleProduct } from '../../api/api.js';
  
    /**
     * Product details object.
     * @type {{id: string, title: string, description: string, image: string, price: string, rating: {rate: number, count: number}, category: string}}
     */
    let product = {
      id: '',
      title: '',
      description: '',
      image: '',
      price: '',
      rating: { rate: 0, count: 0 },
      category: ''
    };

    /**
     * Error object for handling fetch errors.
     * @type {Object|boolean}
     */
    let error = null;

    /**
     * Loading state indicator.
     * @type {boolean}
     */
    let loading = true;

    let productId;
  

     // used to get the route data which will be used to get id from the routers
    export let params;
  
    // Assigns route parameter id to productId variable
    $: productId = params.id
  
    console.log('Received params:', params)
  
    /**
     * Fetch product details on component mount.
     */
    onMount(async () => {
      
      console.log('param id', productId)
      if (productId) {
        loading = true;
        const { response, error: fetchError } = await fetchSingleProduct(productId);
        if (fetchError) {
          error = fetchError;
        } else {
          product = response;
        }
        loading = false;
      } else {
        error = { message: 'Product ID not found' };
        loading = false;
      }
    }); 

</script>

{#if error}
  <div class="flex justify-center">
        <Error />
  </div>
{:else}
  <div class="flex justify-center">
        {#if loading}
        <ProductSkeleton />
        {:else}
        <ProductDetail {...product} />
        {/if}
  </div>
{/if}