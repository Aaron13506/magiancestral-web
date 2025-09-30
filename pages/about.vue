<template>
  <div>
    <Nav />
    <PageHeader title="About" />
    <ProductOne />
    <ProductOne />
    <ProductOne />
    <Footer />
  </div>
</template>

<script>

  import Nav from "../components/Nav";
  import PageHeader from "../components/PageHeader";
  import Footer from "../components/Footer";
  import ProductOne from "../components/ProductOne";
  export default {
    components: {
      ProductOne,
      Footer,
      PageHeader,
      Nav
    },
    head(){
      return {
        title: "Magiancestral | About"
      }
    }
  }
</script>
