<script>
  import Router  from 'svelte-spa-router';
  import NavBar from './lib/components/NavBar.svelte';
  import Home from './lib/pages/Home.svelte';
  import ProductDetailView from './lib/pages/ProductDetailView.svelte';

  const routes = {
    '/': Home,
    '/products/:id': ProductDetailView,
  };
</script>


<NavBar />
<main>
  <Router {routes} />
</main>