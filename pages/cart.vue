<template>
  <div>
    <Nav />
    <PageHeader title="Carrito" />
    <Cart />
    <Footer />
  </div>
</template>

<script>

  import Nav from "../components/Nav";
  import PageHeader from "../components/PageHeader";
  import Cart from "../components/Cart";
  import Footer from "../components/Footer";
  export default {
    components: {
      Footer,
      Cart,
      PageHeader,
      Nav
    },
    head(){
      return {
        title: "Magiancestral | Carrito"
      }
    }
  }
</script>
