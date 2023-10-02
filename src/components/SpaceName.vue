<template>
    <div class="name">
        <h1>{{ spaceID }}</h1>
    </div>
</template>

<script>
export default {
  name: 'SpaceName',
  props: {
    spaceID: String
  }
}
</script>

<style>
.name {
    text-align: left;
    font-size: 25px;
}

</style>