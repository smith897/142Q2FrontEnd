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
      sessionNumbers: [],
      sessions: []
    }
  },
  methods: {
    async getSessions() { //FIXME This is copied and pasted from StudentPage.vue, can I avoid duplicate code somehow? Maybe somehow move this to main.js?
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
