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
        await fetch('http://localhost:3000/auth/signup',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify(data)
        });
        await router.push('/signin');
      };
      return { data, submit };
    }
  }
</script>

<template >
  <div class="form-signup w-100 m-auto">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Sign up</h1>
      <div class="form-floating mb-2">
        <input v-model="data.username" type="text" class="form-control" id="floatingInput" placeholder="username">
        <label for="floatingInput">Username</label>
      </div>

      <div class="form-floating mb-2">
        <input v-model="data.password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
    </form>
  </div>
</template>

<style>
  .form-signup {
    max-width: 330px;
    padding: 15px;
  }

  .form-signup .form-floating:focus-within {
    z-index: 2;
  }
</style>