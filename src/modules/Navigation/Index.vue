<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand to="/">Learn what you need</b-navbar-brand>
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
import { provide, consume } from 'provide-consume-decorator';
import { getModule } from 'vuex-module-decorators';
// import RoleName from '../../helpers/RoleName';
import NavigationStore from './store/NavigationStore';

@Component({
  components: {
    BIconPerson,
  },
})
@provide({
  // provide a data store
  navigationStore() {
    return getModule(NavigationStore, this.$store);
  },
})
export default class Navigation extends Vue {
  @consume('navigationStore') ds!: NavigationStore;

  public get roleUser() {
    if (!this.ds) {
      return false;
    }
    // return this.ds.userRoles.includes(RoleName.User);
    return false;
  }

  public async created() {
    await this.ds.init();
  }

  public destroyed() {
    // mainEventBus.$off(mainEventName.userChanged, this.userChanged);
  }

  public userChanged() {
    // this.userName = firebaseService.userInfo?.email ?? '';
    // this.roles = [];
    // if (this.userName.length > 0) {
    //   this.roles.push(RoleName.User);
    // } else {
    //   this.$router.push('login');
    // }
  }

  public async logout() {
    // firebaseService.logout();
  }
}
</script>
