<template>
  <div>
    <Nav />
    <PageHeader />

    <!-- Page Title Section -->
    <section class="page-title-section">
      <div class="container">
        <h1 class="page-title">Noticias</h1>
      </div>
    </section>

    <BlogPage />
    <Footer />
  </div>
</template>

<script>

  import Nav from "../components/Nav";
  import PageHeader from "../components/PageHeader";
  import Footer from "../components/Footer";
  import BlogPage from "../components/BlogPage";
  export default {
    components: {
      BlogPage,
      Footer,
      PageHeader,
      Nav
    },
    head(){
      return {
        title: "Magiancestral | News"
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

@media (max-width: 768px) {
  .page-title-section {
    padding: 60px 0;
  }

  .page-title {
    font-size: 2.5rem;
  }
}
</style>
