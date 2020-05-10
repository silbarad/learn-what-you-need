<template>
  <b-container>
    <b-row>
      <b-col cols="12" class="pb-3 pt-2 border-bottom border-dark">
        <h2>Login</h2>
      </b-col>
    </b-row>
    <b-row :no-gutters="true" class="pt-3">
      <b-col cols="12" md="8">
        <b-form-group label-cols-sm="3" label="Email" label-for="userName">
          <b-form-input
            id="userName"
            v-model="model.email"
            placeholder="user@user.pl"
            ref="userName"
            @keyup.enter="login">
          </b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row :no-gutters="true">
      <b-col cols="12" md="8">
        <b-form-group label-cols-sm="3" label="Password" label-for="password">
          <b-form-input
            type="password"
            id="password"
            v-model="model.password"
            @keyup.enter="login"
            placeholder="password"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row :no-gutters="true" class="pt-3">
      <b-col cols="12" md="8">
        <button
          type="button"
          class="btn btn-primary"
          :disabled="waitingResponse"
          @click="login">Login</button>
      </b-col>
    </b-row>
    <b-row v-if="waitingResponse" :no-gutters="true" class="pt-3">
      <b-col cols="12" md="8">
         <b-spinner label="Loading..."></b-spinner>
      </b-col>
    </b-row>
    <b-row v-if="message.show" :no-gutters="true" class="pt-3">
      <b-col cols="12" md="8">
          <b-alert :show="message.show" variant="warning">
            {{message.content}}
          </b-alert>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserAuthenticateSend } from '@/services/models/UserAuthenticateSend';

import firebaseService from '@/services/firebaseService';
import { mainEventBus, mainEventName } from '../services/mainEventBus';

const LOGIN_EMAIL_NOTVALID_MESSAGE = 'Email is incorect.';
const LOGIN_PASSWORD_NOTVALID_MESSAGE = 'Password is incorrecot.';

@Component
export default class About extends Vue {
  public checked = false;

  public waitingResponse = false;

  public message = {
    show: false,
    content: '',
  };

  public model: UserAuthenticateSend = {
    email: '',
    password: '',
  };

  public mounted() {
    this.$nextTick(() => {
      const userNameInput = this.$refs.userName as HTMLInputElement | undefined;
      if (!userNameInput) return;
      userNameInput.focus();
    });
  }

  public created() {
    mainEventBus.$on(mainEventName.userChanged, this.redirectPage);
  }

  public destroyed() {
    mainEventBus.$off(mainEventName.userChanged, this.redirectPage);
  }

  public async login() {
    this.message.show = false;
    this.waitingResponse = true;
    if (this.model.email.length < 4) {
      this.message.content = LOGIN_EMAIL_NOTVALID_MESSAGE;
      this.message.show = true;
      this.waitingResponse = false;
      return;
    }
    if (this.model.password.length < 4) {
      this.message.content = LOGIN_PASSWORD_NOTVALID_MESSAGE;
      this.message.show = true;
      this.waitingResponse = false;
      return;
    }
    this.message.content = await firebaseService.login(this.model);
    if (this.message.content) {
      this.message.show = true;
    } else {
      this.redirectPage();
    }
    this.waitingResponse = false;
  }

  public redirectPage() {
    const returnUrl = this.$route.query.returnUrl as string;
    if (returnUrl) {
      this.$router.push({
        path: returnUrl,
      });
    } else {
      this.$router.push('home');
    }
  }
}
</script>
