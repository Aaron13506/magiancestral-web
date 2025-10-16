<template>
  <div>
    <Nav />
    <PageHeader />

    <!-- Page Title Section -->
    <section class="page-title-section">
      <div class="container">
        <h1 class="page-title">Sobre Nosotros</h1>
      </div>
    </section>

    <ProductOne />
    <EsenciaSeparator />
    <ProductOneReverse />
    <EsenciaSeparator />
    <ProductOneThird />
    <Footer />
  </div>
</template>

<script>

  import Nav from "../components/Nav";
  import PageHeader from "../components/PageHeader";
  import ProductOne from "../components/ProductOne";
  import ProductOneReverse from "../components/ProductOneReverse";
  import ProductOneThird from "../components/ProductOneThird";
  import EsenciaSeparator from "../components/EsenciaSeparator";
  import Footer from "../components/Footer";
  export default {
    components: {
      Footer,
      PageHeader,
      ProductOne,
      ProductOneReverse,
      ProductOneThird,
      EsenciaSeparator,
      Nav
    },
    head(){
      return {
        title: "Magiancestral | Farmers"
      }
    }
  }
</script>

<style scoped>
.page-title-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  text-align: center;
}

.page-title {
  font-size: 4rem;
  color: #b3a85a;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 991px) {
  .page-title-section {
    padding: 60px 0;
  }

  .page-title {
    font-size: 2.2rem;
    line-height: 1.3;
  }
}

@media (max-width: 768px) {
  .page-title-section {
    padding: 50px 0;
  }

  .page-title {
    font-size: 1.75rem;
    line-height: 1.3;
    padding: 0 15px;
  }
}

@media (max-width: 576px) {
  .page-title-section {
    padding: 40px 0;
  }

  .page-title {
    font-size: 1.5rem;
    line-height: 1.25;
    padding: 0 10px;
  }
}
</style>
