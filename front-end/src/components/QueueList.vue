<template>
<div class="wrapper">
  <h2 class="title">Help Queue:</h2>
  <div class="students">
    <div class="student" v-for="session in queue" :key="session.uniq_id">
      <Student :session="session" :fromTA='fromTA' />
    </div>
  </div>
</div>
</template>

<script>
import Student from '@/components/Student.vue'
export default {
  name: 'QueueList',
  components: {
    Student
  },
  props: {
    queue: Array,
    fromTA: Boolean,
    TAs: Array
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1em;
}

.students {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
