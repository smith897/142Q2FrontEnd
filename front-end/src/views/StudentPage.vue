<template>
<div class="studentWrapper">
  <HelloWorld msg="Welcome to the CS 142 Help Center" />
  <QueueList :queue="sessions" :fromTA='false' />
  <GetHelpToolbar :questionsRemaining='5' />
</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'; //FIXME Do we need this anymore?
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
        let response = await axios.get("/api/foobar/get-public-sessions.php");
        this.sessions = response.data;
        this.$root.$data.queue = response.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
