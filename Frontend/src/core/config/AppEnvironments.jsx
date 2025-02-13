class AppEnvironments {
    static get baseUrl() {
      return import.meta.env.VITE_BASE_URL;
    }
  }
  
  export default AppEnvironments;
  