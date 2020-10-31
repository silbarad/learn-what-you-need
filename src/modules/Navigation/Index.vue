<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand to="/">Learn what you need</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav v-if="isAuthorized">
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import { BIconPerson } from 'bootstrap-vue';
import { provide, consume } from 'provide-consume-decorator';
import { getModule } from 'vuex-module-decorators';
import NavigationStore from '@/stores/NavigationStore';

@Component({
  components: {
    BIconPerson,
  },
})
@provide({
  // provide a data store
  /* istanbul ignore next */
  navigationStore() {
    return getModule(NavigationStore, this.$store);
  },
})
export default class Navigation extends Vue {
  @consume('navigationStore') ds!: NavigationStore;

  public get isAuthorized() {
    return this.ds.getIsAuthorized;
  }

  public async created() {
    await this.ds.init();
  }

  public async logout() {
    await this.ds.logout();
  }

  @Watch('ds.getIsAuthorized')
  public IsAuthorizedWatch(newValue: boolean) {
    if (newValue) {
      if (this.$route && this.$route.name === 'Login') {
        this.$router.push(this.$route.query.returnUrl as string);
      } else {
        this.$router.push('home');
      }
    } else {
      this.$router.push('login');
    }
  }
}
</script>
