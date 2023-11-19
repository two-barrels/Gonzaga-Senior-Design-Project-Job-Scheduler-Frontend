<template>
<div :class="buttonType" >
    {{ title }}
</div>
</template>

<script>

export default {
    name: 'SignInBox',
    props: {
        title: String,
        buttonType: String
    }
}
</script>

<style lang="scss" scoped>

.std-button {
    min-height: 15px;
    width: fit-content;
    padding: 10px;
    border: 1px black solid;
    background-color: aqua;
    border-radius: 5px;
    &:hover {
        background-color: rgb(0, 160, 160);
        cursor: pointer;
    }
}

.login-button {
    min-height: 8px;
    width: fit-content;
    padding: 5px;
    border-bottom: 1px black solid;
    &:hover {
        background-color: rgb(0, 160, 160);
        cursor: pointer;
    }
}

</style>