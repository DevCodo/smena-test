<template>
  <v-card width="400" class="mx-auto mt-12">
    <v-card-title>
      <h1 class="display-1">Авторизация</h1>
    </v-card-title>
    <v-card-text>
      <v-alert
        v-model="showError"
        type="error"
      >
        {{error}}
      </v-alert>
      <v-form ref="form">
        <v-text-field 
          v-model="username"
          :rules="nameRules"
          required
          label="Имя"
          @keyup.enter="login"
          prepend-icon="mdi-account-circle"
        />
        <v-text-field 
          v-model="password"
          :rules="passwordRules"
          required
          label="Пароль" 
          @keyup.enter="login"
          :type="showPassword ? 'text' : 'password'" 
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="info" @click="login" :disabled="processing">Войти</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="success" to="/register">Регистрация</v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>

import { mapGetters } from 'vuex';

export default {
  name: 'Login',

  created() {
    this.$store.commit('setMessage', null)
    this.$store.commit('setError', null)
  },

  data: () => ({
    showPassword: false,
    username: "",
    nameRules: [
      v => !!v || 'Имя обязательно для заполнения',
    ],
    password: "",
    passwordRules: [
      v => !!v || 'Пароль обязателен для заполнения',
    ],
    message: ""
  }),

  computed: {
    ...mapGetters(['processing', 'error']),
    showError() {
      return this.error !== null
    },
  },

  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        })
      }
    }
  },
};
</script>
