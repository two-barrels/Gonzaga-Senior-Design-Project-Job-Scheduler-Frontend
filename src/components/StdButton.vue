<template>
<div class="signin-button" @click="signin()">
    {{ title }}
</div>
</template>

<script>

export default {
    name: 'SignInBox',
    props: {
        title: String
    }
}
</script>

<style>

.std-button {
min-height: 15px;
width: fit-content;
padding: 10px;
border: 1px black solid;
background-color: aqua;
border-radius: 5px;
position: absolute;
left: 0;
right: 0;
margin-right: auto;
margin-left: auto;
margin-top: 10px;
&:hover {
    background-color: rgb(0, 160, 160);
    cursor: pointer;
}
}

</style>