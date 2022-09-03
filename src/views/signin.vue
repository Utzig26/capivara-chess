<script lang="ts">
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  export default {
    setup() {
      const router = useRouter();
      const data = reactive({
        username:'',
        password:''
      });

      const submit = async () => {
        await fetch('http://localhost:3000/auth/signin',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify(data)
        });
        await router.push('/');
      };
      return { data, submit };
    }
  }
</script>

<template>
  <div class="form-signin w-100 m-auto">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Sign in</h1>

      <div class="form-floating mb-2">
        <input v-model="data.username" type="text" class="form-control" id="floatingInput" placeholder="username">
        <label for="floatingInput">Username</label>
      </div>

      <div class="form-floating mb-2">
        <input v-model="data.password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    </form>
  </div>
</template>

<style>
  .form-signin {
    max-width: 330px;
    padding: 15px;
  }

  .form-signin .form-floating:focus-within {
    z-index: 2;
  }
</style>