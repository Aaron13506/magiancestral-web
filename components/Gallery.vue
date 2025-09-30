<template>
  <section class="gallery_two">
    <div class="container">
      <div class="row gallery-grid">
        <div v-for="(image, index) in galleryImages" :key="index" class="col-lg-4 col-md-6 col-sm-6 mb-4 gallery-item">
          <div class="gallery_two_single">
            <a class="img-popup gallery_two_image" :href="image.src">
              <img :src="image.src" :alt="image.alt" loading="lazy">
              <div class="gallery_two_hover_box">
                <div class="gallery_two_icon">
                  <span class="icon-plus-symbol"></span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
    export default {
      name: "Gallery",
      data() {
        return {
          galleryImages: [
            { src: '/assets/images/gallery/IMG_1481.jpg', alt: 'Agricultura 2' },
            { src: '/assets/images/gallery/IMG_1485.jpg', alt: 'Agricultura 3' },
            { src: '/assets/images/gallery/IMG_1510.jpg', alt: 'Agricultura 4' },
            { src: '/assets/images/gallery/IMG_1540.jpg', alt: 'Agricultura 5' },
            { src: '/assets/images/gallery/IMG_1546.jpg', alt: 'Agricultura 6' },
            { src: '/assets/images/gallery/IMG_1547.jpg', alt: 'Agricultura 7' },
            { src: '/assets/images/gallery/IMG_1559.jpg', alt: 'Agricultura 8' },
            { src: '/assets/images/gallery/IMG_1665.jpg', alt: 'Agricultura 9' },
            { src: '/assets/images/gallery/IMG-20240218-WA0030.jpg', alt: 'Agricultura 10' },
            { src: '/assets/images/gallery/IMG-20240218-WA0033.jpg', alt: 'Agricultura 11' },
            { src: '/assets/images/gallery/IMG-20240218-WA0034.jpg', alt: 'Agricultura 12' },
            { src: '/assets/images/gallery/IMG-20240218-WA0035.jpg', alt: 'Agricultura 13' },
            { src: '/assets/images/gallery/photo_2025-09-26_16-03-41.jpg', alt: 'Agricultura 14' },
            { src: '/assets/images/gallery/photo_2025-09-26_16-04-00.jpg', alt: 'Agricultura 15' },
            { src: '/assets/images/gallery/photo_2025-09-26_16-04-02.jpg', alt: 'Agricultura 16' },
            { src: '/assets/images/gallery/photo_2025-09-26_16-04-04.jpg', alt: 'Agricultura 17' },
            { src: '/assets/images/gallery/photo_2025-09-26_16-04-08.jpg', alt: 'Agricultura 18' }
          ]
        }
      },
      mounted() {
        new GLightbox({
          selector: '.img-popup',
        });
      }
    }
</script>

<style scoped>
.gallery-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.gallery-item {
  flex: 0 0 calc(33.333% - 14px);
  max-width: calc(33.333% - 14px);
}

.gallery_two_single {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.gallery_two_single:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.gallery_two_image {
  position: relative;
  overflow: hidden;
  padding-bottom: 75%;
  background: #f5f5f5;
  display: block;
  text-decoration: none;
}

.gallery_two_image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery_two_single:hover .gallery_two_image img {
  transform: scale(1.05);
}

.gallery_two_hover_box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(76, 175, 80, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery_two_single:hover .gallery_two_hover_box {
  opacity: 1;
}

.gallery_two_icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery_two_icon span {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
  color: #4caf50;
  font-size: 20px;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.gallery_two_single:hover .gallery_two_icon span {
  background: #4caf50;
  color: white;
  transform: scale(1.1);
}

@media (max-width: 1199px) {
  .gallery-item {
    flex: 0 0 calc(50% - 10px);
    max-width: calc(50% - 10px);
  }
}

@media (max-width: 767px) {
  .gallery-item {
    flex: 0 0 calc(50% - 10px);
    max-width: calc(50% - 10px);
  }

  .gallery-grid {
    gap: 15px;
  }
}

@media (max-width: 575px) {
  .gallery-item {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .gallery-grid {
    gap: 10px;
  }
}
</style>
