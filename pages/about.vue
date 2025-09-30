<template>
  <div>
    <Nav />
    <PageHeader />
    <ServiceDetailMedicines />
    <Footer />
  </div>
</template>

<script>

  import Nav from "../components/Nav";
  import PageHeader from "../components/PageHeader";
  import ServiceDetailMedicines from "../components/ServiceDetailMedicines";
  import Footer from "../components/Footer";
  export default {
    components: {
      Footer,
      ServiceDetailMedicines,
      PageHeader,
      Nav
    },
    head(){
      return {
        title: "Magiancestral | Otras Medicinas"
      }
    }
  }
</script>
