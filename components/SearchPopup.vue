<template>
  <div :class="`search-popup  ${searchPopup === true ? 'active ' : ' '}`">
    <div
      class="search-popup__overlay custom-cursor__overlay"
      @click="searchPopupStatusChange"
    ></div>
    <!-- /.search-popup__overlay -->
    <div class="search-popup__inner">
      <form action="#" class="search-popup__form">
        <input
          type="text"
          name="search"
          placeholder="Type here to Search...."
        />
        <button type="submit"><i class="fa fa-search"></i></button>
      </form>
    </div>
    <!-- /.search-popup__inner -->
  </div>
  <!-- /.search-popup -->
</template>
<script setup>
import { useMainStore } from '~/store/index.js';

const store = useMainStore();

const searchPopup = computed(() => store.searchPopupStatus);

const searchPopupStatusChange = () => {
  store.changeSearchPopupStatus();
};
</script>
