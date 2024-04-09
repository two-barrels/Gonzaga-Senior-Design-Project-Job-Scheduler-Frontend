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
@import url(https://fonts.googleapis.com/css?family=Open+Sans);

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

.primary-default {
    width: fit-content;
    padding: 14px 40px;
    color: white;
    background-color: $color-secondary--400;
    border-radius: 5px;
    &:hover {
        background-color: $color-secondary--800;
        cursor: pointer;
    }
}
.secondary-default {
    width: fit-content;
    padding: 14px 40px;
    color: white;
    background-color: $color-help--500;
    border-radius: 5px;
    &:hover {
        background-color: $color-primary--900;
        cursor: pointer;
    }
}
.upsell-default {
    width: fit-content;
    padding: 14px 40px;
    color: white;
    background-color: $color-success--400;
    border-radius: 5px;
    &:hover {
        background-color: $color-secondary--800;
        cursor: pointer;
    }
}
.alert-default {
    width: fit-content;
    padding: 14px 40px;
    color: white;
    background-color: $color-danger--400;
    border-radius: 5px;
    &:hover {
        background-color: $color-danger--900;
        cursor: pointer;
    }
}
.disable-default {
    width: fit-content;
    padding: 14px 40px;
    color: white;
    background-color: $color-neutral--400;
    border-radius: 5px;
}
.primary-previous {
    width: fit-content;
    padding: 14px 40px;
    background-color: white;
    color: $color-secondary--400;
    border: 1px $color-secondary--400 solid;
    border-radius: 5px;
    &:hover {
        background-color: $color-secondary--50;
        cursor: pointer;
    }
}
.secondary-previous {
    width: fit-content;
    padding: 14px 40px;
    background-color: white;
    color: $color-help--500;
    border: 1px $color-help--500 solid;
    border-radius: 5px;
    &:hover {
        background-color: $color-primary--50;
        cursor: pointer;
    }
}
.upsell-previous {
    width: fit-content;
    padding: 14px 40px;
    background-color: white;
    color: $color-success--400;
    border: 1px $color-success--400 solid;
    border-radius: 5px;
    &:hover {
        background-color: $color-success--50;
        cursor: pointer;
    }
}

.alert- {
    width: fit-content;
    padding: 14px 40px;
    background-color: white;
    color: $color-danger--400;
    border-radius: 5px;
    border: 1px $color-danger--400 solid;
    &:hover {
        background-color: $color-danger--50;
        cursor: pointer;
    }
}

.nav-button {
    width: fit-content;
    padding: 10px 20px;
    color: white;
    background-color: $color-primary--700;
    border: 1px $color-primary--700 solid;
    border-right: 1px $color-neutral--400 solid;
    &:hover {
        border-radius: 5px;
        border: 1px $color-primary--500 solid;
        background-color: $color-primary--500;
        cursor: pointer;
    }
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
}
.account-button{
    width: fit-content;
    color: white;
    background-color: $color-primary--700;
    border: 1px $color-primary--700 solid;
    border-radius: 5px;    
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;    
}

.drop-down{
    width: 100%;
    color: white;
    padding: 10px 20px;
    background-color: $color-primary--700;
    border: 1px $color-primary--700 solid;   
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600; 
    &:hover {
        border: 1px $color-primary--500 solid;
        background-color: $color-primary--500;
        cursor: pointer;
    }
}
</style>