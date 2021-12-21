<template>
  <div class="login-form form">
    <h3>Login</h3>
    <form @submit.prevent="login" novalidate autocomplete="off">
      <label for="username">Username: </label>
      <input type="text" id="username" name="username" v-model="username" />
      <br />
      <label for="password">Passwort: </label>
      <input type="text" id="password" name="password" v-model="password" />
      <br />
      <input type="submit" value="Log Me In!" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginForm",
  props: {},
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      let userData = {
        username: this.username,
        password: this.password,
      };
      const uri = "http://127.0.0.1:3001/api/login/";
      console.log("starting login process");
      axios
        .post(uri, userData)
        .then(function (response) {
          console.log("backend answered:");
          console.log(response);
        })
        .catch(function (error) {
          console.log("something went wrong:");
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
</style>
