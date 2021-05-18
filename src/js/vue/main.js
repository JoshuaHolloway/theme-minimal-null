// Create Vue instance
const app = Vue.createApp({
  data() {
    return {
      name: '',
      dob: ''
    };
  }, // data() {}
  methods: {
    onSubmit: function() {
      let formData = {
        name: this.name,
        dob: this.dob
      };
    }, // onSubmit()
  }, // methods: {}
  delimiters: ["((", "))"]
});

// Mount Vue App
const mountedApp = app.mount('#app');
// mountedApp.product = 'Shoes';