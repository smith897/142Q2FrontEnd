<template>
<div class="studentWrapper">
  <HelloWorld msg="Welcome to the CS 142 Help Center" />
  <QueueList :queue="sessions" :fromTA='false' />
  <GetHelpToolbar :questionsRemaining='5' /> <!-- TODO: Set questionsRemaining -->
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
      sessionNumbers: [],
      sessions: []
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
        let availableResponse = await axios.post("api/session/get-available.php", {
          netid: this.$root.$data.myID
        });
        this.sessionNumbers = availableResponse.data;
        this.sessions = [];
        this.$root.$data.queue = [];
        for (var i = 0; i < this.sessionNumbers.length; i++) {
          let detailsResponse = await axios.post("/api/session/get-details.php", {
            netid: this.$root.$data.myID,
            session: this.sessionNumbers[i]
          });
          this.sessions.push(detailsResponse.data);
          this.$root.$data.queue.push(detailsResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
