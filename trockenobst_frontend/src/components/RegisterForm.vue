<template>
  <div class="register-form form">
    <h3>Register</h3>
    <form @submit.prevent="register" novalidate autocomplete="off">
      <label for="username">Username: </label>
      <input type="text" id="username" name="username" v-model="username" />
      <br />
      <label for="password">Passwort: </label>
      <input type="text" id="password" name="password" v-model="password" />
      <br />
      <input type="submit" value="Register!" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterForm",
  props: {},
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    register() {
      let userData = {
        username: this.username,
        password: this.password,
      };
      const uri = "http://localhost:3001/api/register/";
      console.log("starting register process");
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
