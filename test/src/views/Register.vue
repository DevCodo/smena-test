<template>
  <v-card width="400" class="mx-auto mt-12">
    <v-card-title>
      <h1 class="display-1">Регистрация</h1>
    </v-card-title>
    <v-card-text>
      <v-alert
        v-model="showMessage"
        :type="typeMessage"
      >
        {{getMessage}}
      </v-alert>
      <v-form ref="form">
        <v-text-field 
          v-model="username"
          :rules="nameRules"
          required
          label="Имя"
          @keyup.enter="onSubmit"
          prepend-icon="mdi-account-circle"
        />
        <v-text-field 
          v-model="password"
          :rules="passwordRules"
          required
          label="Пароль" 
          @keyup.enter="onSubmit"
          :type="showPassword ? 'text' : 'password'" 
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        />
        <v-text-field 
          v-model="secondPassword"
          :rules="secondPasswordRules"
          required
          label="Повторите ралоль" 
          @keyup.enter="onSubmit"
          :type="showPassword ? 'text' : 'password'" 
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="info" @click="onSubmit" :disabled="processing">Зарегистрироваться</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="success" to="/login">Авторизация</v-btn>
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
  data() {
    return {
      showPassword: false,
      username: "",
      nameRules: [
        v => !!v || 'Имя обязательно для заполнения',
      ],
      password: "",
      passwordRules: [
        v => !!v || 'Пароль обязателен для заполнения',
      ],
      secondPassword: "",
      secondPasswordRules: [
        v => !!v || 'Пароль обязателен для заполнения',
        v => v === this.password || 'Пароль не совпадает',
      ],
    }
  },

  computed: {
    ...mapGetters(['processing', 'error', 'message', 'user']),
    showMessage() {
      return this.error !== null || this.message !== null
    },
    typeMessage() {
      if (this.error) return "error"
      else return "success"
    },
    getMessage() {
      if (this.error) return this.error
      else return this.message
    },
  },

  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('registration', {
          username: this.username,
          password: this.password
        })
      }
    },
  },

  watch: {
    message(val) {
      if (val) {
        this.$refs.form.resetValidation()
        this.password = "";
        this.secondPassword = "";
        this.username = "";
      }
    }
  }
};
</script>


