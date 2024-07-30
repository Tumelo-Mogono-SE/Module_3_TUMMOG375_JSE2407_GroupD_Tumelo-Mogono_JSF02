<script>
    import Filter from '../components/Filter.svelte';
    import Sort from '../components/Sort.svelte';
    import ProductList from '../components/ProductList.svelte';
</script>


<div class="grid lg:flex gap-y-4 gap-x-48 lg:items-start mt-3 mx-auto justify-center">
    <Filter />
    <Sort />
</div>
<ProductList />