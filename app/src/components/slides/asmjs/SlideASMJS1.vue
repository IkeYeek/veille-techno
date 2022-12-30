<template>
  <p>
    En effet, comme j’ai pu le dire précédemment, l’un des design-flaw principal de javascript repose sur les concepts même de ce dernier. Le dynamisme du langage - dans ce cas précis - implique un non déterminisme à l’exécution. Ce non déterminisme (au niveau du contenu d’un objet par exemple, ou de la signature d’une méthode) oblige les moteurs javascript à s’adapter pendant l’exécution à tous ces paramètres, gaspillant une quantité non négligeable de mémoire vive (notamment pour stocker les différentes versions du code machine lorsqu’il est généré / optimisé), et de temps d’exécution (pour vérifier ces contraintes et s’adapter lorsque nécessaire en switchant vers une version non optimisée du code par exemple)
  </p>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>