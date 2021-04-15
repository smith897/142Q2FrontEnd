<template>
<div class="studentWrapper">
  <HelloWorld msg="Welcome to the CS 142 Help Center" />
  <QueueList :queue="sessions" :fromTA='false' />
  <GetHelpToolbar :questionsRemaining='5' />
</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import QueueList from '../components/QueueList.vue';
import GetHelpToolbar from '../components/GetHelpToolbar';
import axios from 'axios';

export default {
  name: 'StudentPage',
  data() {
    return {
      sessions: [],
    }
  },
  created() {
    this.getSessions();
  },
  components: {
    HelloWorld,
    QueueList,
    GetHelpToolbar
  },
  methods: {
    async getSessions() {
      try {
        let response = await axios.post("api/session/get-available.php", {
          netid: this.$root.$data.myID
        });
        this.sessions = response.data;
        this.$root.$data.queue = response.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
