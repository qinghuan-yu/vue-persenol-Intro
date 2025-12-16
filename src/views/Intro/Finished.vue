<template>
  <div>
    <h2 v-scramble>Finished Projects</h2>
    <div class="projects-container">
      <div class="project-item">
        <h3><a href="https://github.com/qinghuan-yu/Vue-projekt-" target="_blank" rel="noopener noreferrer" v-scramble>This Vue Project</a></h3>
      </div>
      <div class="project-item">
        <a href="https://music.163.com/song?id=2758145032&uct2=U2FsdGVkX1+OhAUdieOlKJSEMOkMOSabaOpgnpVUVko=" target="_blank" rel="noopener noreferrer" v-scramble>からっぽの星で</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FinishedProjects'
}
</script>
<style scoped>
.projects-container {
  margin-top: 20px;
}
.project-item {
  margin-bottom: 10px;
}
a {
  color: #61b1d6;
  text-decoration: none;
  font-size: 1.1em;
}

a:hover {
  text-decoration: underline;
}
</style>