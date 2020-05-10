<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand to="/">Learn what you nead</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav v-if="roleUser">
       <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <b-icon-person />
          </template>
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BIconPerson } from 'bootstrap-vue';
import RoleName from '@/helpers/RoleName';
import firebaseService from '@/services/firebaseService';
import { mainEventName, mainEventBus } from '../services/mainEventBus';

@Component({
  components: {
    BIconPerson,
  },
})
export default class Navigation extends Vue {
  public userName = '';

  public roles = [] as string[];

  public get roleUser() {
    return this.roles.includes(RoleName.User);
  }

  public created() {
    mainEventBus.$on(mainEventName.userChanged, this.userChanged);
  }

  public destroyed() {
    mainEventBus.$off(mainEventName.userChanged, this.userChanged);
  }

  public userChanged() {
    this.userName = firebaseService.userInfo?.email ?? '';
    this.roles = [];
    if (this.userName.length > 0) {
      this.roles.push(RoleName.User);
    } else {
      this.$router.push('login');
    }
  }

  // eslint-disable-next-line  class-methods-use-this
  public async logout() {
    firebaseService.logout();
  }
}
</script>
