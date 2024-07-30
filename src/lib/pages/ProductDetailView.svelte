<script>
    import { onMount } from 'svelte';
    import ProductDetail from '../components/ProductDetail.svelte';
    import ProductSkeleton from '../components/ProductSkeleton.svelte';
    import Error from '../components/Error.svelte';
    import { fetchSingleProduct } from '../../api/api.js';
  
    let product = {
      id: '',
      title: '',
      description: '',
      image: '',
      price: '',
      rating: { rate: 0, count: 0 },
      category: ''
    };
    let error = null;
    let loading = true;
    let productId;
  
    export let params;
  
    $: productId = params.id
  
    console.log('Received params:', params)
  
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