import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    searchPopupStatus: false
  }),
  
  actions: {
    changeSearchPopupStatus() {
      this.searchPopupStatus = !this.searchPopupStatus
    }
  }
})
