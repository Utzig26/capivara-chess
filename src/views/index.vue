<script lang="ts">
  import {computed, onMounted, ref} from 'vue';
  import {useStore} from "vuex";
  import Home from '../components/home.vue'
  import Info from '../components/info.vue'
  
  export default {
    setup() {
        const store = useStore();
        const auth = computed(() => store.state.authenticated);
        onMounted(async () => {
            try {
                await fetch("http://localhost:3000/users/", {
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"
                }).then(async (response) => {
                    if (response.ok) {
                      await store.dispatch("setAuth", true);
                    }
                    else {
                      await store.dispatch("setAuth", false);
                    }
                });
            }
            catch (e) {
                await store.dispatch("setAuth", false);
            }
        });
        return {
            auth
        };
    },
    components: { Home, Info }
}
  </script>

<template>
  <div v-if="auth">
    <Home />
  </div>
  <div v-else>
    <Info />
  </div>
</template>