<template>
  <div class="home-container">
    <h1>Welcome to the Home Page</h1>
    <button @click="goToLogin">Go to Login</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style scoped>
.home-container {
  text-align: center;
}

button {
  padding: 10px 20px;
  background-color: #008cba;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #007b8b;
}
</style>
