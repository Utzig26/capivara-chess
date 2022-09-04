<script lang="ts">
  import {computed} from 'vue';
  import {useStore} from "vuex";
  export default {
    name: "Nav",
    setup() {
      const store = useStore();
      const auth = computed(() => store.state.authenticated)
      const signOut = async () => {
        await fetch('http://localhost:3000/auth/signOut', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        });
        await store.dispatch('setAuth', false);
      }
      return {
        auth,
        signOut
      }
    }
  }
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Home</router-link>

      <div>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="!auth">
          <li class="nav-item">
            <router-link to="/signin" class="nav-link">Sign in</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link">Sign up</router-link>
          </li>
        </ul>

        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-else>
          <li class="nav-item">
            <a class="nav-link" @click="signOut">Sign out</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>