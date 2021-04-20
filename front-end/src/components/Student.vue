<template>
<div class="wrapper">
  <div class="session" v-bind:class="{beingHelped: getIsHelped, isMe: getIsMe, isHelpedByMe: getIsHelpedByMe}">
    <div class="firstRowHolder">
      <div class="positionHolder">
        <p class="position">{{1}}</p> <!-- TODO set to real position -->
      </div>
      <div class="imageHolder">
        <img class="image" :src="'/images/Chong.png'"> <!-- TODO set to real image (or delete) -->
      </div>
      <div class="nameHolder">
        <h2 class="name">{{session.student.name}}</h2>
      </div>
    </div>
    <div class="secondRowHolder">
      <div class="questionHolder">
        <h3 class="question">Question:</h3>
        <p class="questionText">{{session.question}}</p>
      </div>
      <div class="helpInfoHolder">
        <div class="timeWaitingHolder">
          <p>Time waiting: {{session.enqueue_time}} min</p>
        </div>
        <div class="helperHolder">
          <p>Being helped by: {{getHelper}}</p>
        </div>
      </div>
      <div class="helpButtonHolder" v-if="fromTA">
        <h2 class="helpButton" v-if="fromTA" @click="updateHelping()">{{ helpButtonText }}</h2>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Session',
  props: {
    fromTA: Boolean,
    session: Object
  },
  data() {
    return {
      isHelped: false,
      isMe: false,
      isHelpedByMe: false,
      helper: 'No one',
      helpButtonText: 'Help'
    }
  },
  computed: {
    getHelper() {
      if (this.session.ta.length === 0) {
        return "No one"
      }
      else {
        let response = "";
        for (var i = 0; i < this.session.ta.length; i++) {
          response += this.session.ta[i];
          if (i < this.session.ta.length - 1) {
            response += ", ";
          }
        }
        return response;
      }
    },
    getIsHelped() {
      return !(this.session.ta.length === 0);
    },
    getIsHelpedByMe() {
      if (!this.fromTA) return false;
      if (this.session.ta.length != 0) {
        for (var i = 0; i < this.session.ta.length; i++) {
          if (this.session.ta.user.net_id === this.$root.$data.myID) {
            return true;
          }
        }
      }
      return false;
    },
    getIsMe() {
      if (this.fromTA) return false;
      else if (this.session.student.net_id === this.$root.$data.myID) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    async updateHelping() {
      try {
        await axios.post("/api/session/join.php", {
          netid: this.$root.$data.myID,
          session: "Test ID" //TODO: Add functionality for session IDs (currently uses student netids)
        });
      } catch (error) {
        console.log(error);
      }
      location.reload(); //Reloads the page
    },
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2em;
}

.session {
  border-width: medium;
  border-style: solid;
  border-color: #A9A9A9;
  background-color: #CAEBF2;
  display: flex;
  flex-direction: column;
}

@media only screen and (min-width: 1000px) {
  .student {
    flex-direction: row;
  }
}

.beingHelped {
  background-color: #A9A9A9;
  border-color: black;
  color: black;
}

.isMe {
  border-color: #FF3B3F;
}

.isHelpedByMe {
  border-color: #FF3B3F;
}

.firstRowHolder {
  display: flex;
  flex-direction: row;
  flex: 1;
  margin-bottom: 0.5em;
}

@media only screen and (min-width: 700px) {
  .firstRowHolder {
    flex: 2;
  }
}

.positionHolder {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
}

.position {
  font-size: 2em;
  margin: 0.25em 0em 0.25em 0.5em;
}

.imageHolder {
  display: flex;
  flex: 6;
  align-items: center;
  justify-content: center;
  background-color: inherit;
}

@media only screen and (min-width: 700px) {
  .imageHolder {
    flex: 4;
  }
}

.image {
  margin: 1em 0em 1em 0em;
  max-width: 60%;
  max-height: 100%;
}

@media only screen and (min-width: 700px) {
  .image {
    max-width: 35%;
    max-height: 100%;
  }
}

.informationHolder {
  display: flex;
  flex-direction: column;
  flex: 8;
  justify-content: flex-start;
  align-items: center;
  background-color: inherit;
}

.nameHolder {
  display: flex;
  flex: 4;
  align-items: center;
  justify-content: center;
}

@media only screen and (min-width: 700px) {
  .nameHolder {
    flex: 2;
  }
}

.name {
  display: flex;
  font-size: 1em;
  margin: 0.5em 0.5em 1em 0em;
  font-weight: bolder;
}

@media only screen and (min-width: 1000px) {
  .name {
    font-size: 1.75em;
  }
}

.secondRowHolder {
  display: flex;
  flex-direction: column;
  flex: 1;
}

@media only screen and (min-width: 700px) {
  .secondRowHolder {
    flex-direction: row;
  }
}

.questionHolder {
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 4;
}

@media only screen and (min-width: 700px) {
  .questionHolder {
    flex: 10;
  }
}

@media only screen and (min-width: 1000px) {
  .questionHolder {
    margin-right: 2em;
  }
}

.question {
  font-size: 1em;
}

@media only screen and (min-width: 1000px) {
  .question {
    font-size: 1.5em;
    margin-bottom: 0.5em;
  }
}

.questionText {
  font-size: 0.75em;
  margin: 0em 0.5em 0em 0.5em;
}

@media only screen and (min-width: 1000px) {
  .questionText {
    font-size: 1.25em;
  }
}

.helpInfoHolder {
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 2;
  font-size: 0.5em;
}

@media only screen and (min-width: 700px) {
  .helpInfoHolder {
    flex: 8;
    font-size: 0.75em;
  }
}

.helpButtonHolder {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 3;
  margin-bottom: 1em;
}

@media only screen and (min-width: 700px) {
  .helpInfoHolder {
    margin-right: 1em;
  }
}

.helpButton {
  padding: 0.5em 1em 0.5em 1em;
  background-color: #FF3B3F;
  color: #EFEFEF;
  border-width: thin;
  border-style: solid;
  border-color: black;
  font-size: 0.75em;
}

@media only screen and (min-width: 700px) {
  .helpButtonHolder {
    margin-right: 1em;
    font-size: 1.5em;
  }
}
</style>
