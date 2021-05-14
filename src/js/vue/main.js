// Create Vue instance
const app = Vue.createApp({
  data() {
    return {
      dob: ''
    };
  },
  delimiters: ["((", "))"]
});

// Mount Vue App
const mountedApp = app.mount('#app');
// mountedApp.product = 'Shoes';