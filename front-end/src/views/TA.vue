<template>
  <div class="TAWrapper">
    <HelloWorld msg="Welcome to the CS 142 Help Center"/>
    <QueueList :queue="sessions" :fromTA='true'/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import QueueList from '../components/QueueList.vue'
import axios from 'axios';
export default {
  name: 'Student',
  components: {
    HelloWorld,
    QueueList
  },
  created() {
    this.getSessions();
  },
  data() {
    return {
      sessions: [],
    }
  },
  methods: {
    async getSessions() {
      try {
        let response = await axios.get("api/session/get-available.php");
        this.sessions = response.data;
        this.$root.$data.queue = response.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
