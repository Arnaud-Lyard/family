<template>
    <div class="container flex flex-center">
        <div class="side-form register-background"></div>
        <form class="login">
            <label for="">Adresse email :</label>
            <input type="email" name="email" id="email">
            <label for="">Mot de passe :</label>
            <input type="password" name="password" id="password">
            <label for="">Confirmer votre mot de passe :</label>
            <input type="passwordConfirm" name="passwordConfirm" id="passwordConfirm">
            <button type="submit" class="button">Inscription</button>
        </form>
    </div>
</template>
<script setup lang="ts">
</script>