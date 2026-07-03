<template>
  <div class="content">
    <h1>{{ error.message }}</h1>
    <p>{{ error.statusCode }}</p>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "error-layout",
  // you can set a custom layout for the error page
};
</script>