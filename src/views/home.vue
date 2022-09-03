<script lang="ts">
  import {onMounted, ref} from 'vue';
  import {useStore} from "vuex";
  import Info from '@/components/info.vue'
  export default {
    setup() {
      const store = useStore();
      const message = ref('notLogged');
      onMounted(async () => {
        try {
          await fetch('http://localhost:3000/users/', {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
          }).then(async (response) => {
            if(response.ok){
              //const content = await response.json();
              message.value = 'logged'
              await store.dispatch('setAuth', true);
            }else{
              message.value = 'notLogged'
              await store.dispatch('setAuth', false);
            }
          });
        } catch (e) {
          await store.dispatch('setAuth', false);
        }
      });
      return {
        message
      }
    }
  }
  </script>

<template>
  <Info />
  <home/>
</template>