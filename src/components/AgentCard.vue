<template>
    <div>
      <v-card
        width="300"
        class="pt-3"
      >
        <div class="agent">
          <div class="avator"></div>
          <h4 class="grey--text text-center">Lydia Krugger</h4>
          <p class="text-center">
            <v-icon class="yellow--text">{{ star }}</v-icon>
            4.5
            <span class="green--text text--lighten-1">(455)</span>
          </p>
          <div class="agent-info-tel">
            <p>+254 ... ... ...</p>
            <a href="#">Show Number</a>
          </div>
        </div>
        <v-card-text background-color="grey darken-1">
          <a href="" class="btn-block d-flex" background-color="green accent-1">
            <v-icon>
              {{ mdiMessage }}
            </v-icon>
            <span class="mx-3">
               Contact Agent
            </span>
          </a>
          <a href="#" class="d-flex grey--text text--darken-2 next-agent">
            <v-icon>
              {{ lens }}
            </v-icon>
            <span class="mx-3">Find other agent</span>
          </a>
        </v-card-text>
      </v-card>
    </div>
</template>

<script>
import { mdiStar, mdiMessage, mdiMagnify } from '@mdi/js'

export default {
  name: 'agent-card',
  props: ["loggedIn"],
  data () {
    return {
      star: mdiStar,
      mdiMessage,
      lens: mdiMagnify
    }
  }
}
</script>

<style lang="scss" scoped>
  .agent {
    display: block;

    .avator {
      height: 5.4em;
      width: 5.4em;
      background: url('../assets/face.jpg') no-repeat center;
      background-size: cover;
      border-radius: 50%;
      margin: auto;
    }
  }

  .text-center {
    text-align: center;
  }
  .agent-info-tel {
    width: 80%;
    margin: 5px auto;
    background-color: #35cf68a6;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1em;
  
    p {
      color: rgb(65, 65, 65);
      padding: 0;
      margin: 0;
    }

    a {
      color: #14883a;
      text-decoration-color: white;
    }
  }

  .v-card__text {
    padding: 10px 15px;
    display: block;
    color: white;
    background: whitesmoke;

    a {
      text-decoration: none;
      text-align: center;
      span {
        margin-right : 15px;
      }
    }

    .btn-block {
      background-color: #2acc5a;
      color: white;
      width: 100%;
      justify-content: center;
      padding: 1em;
      border-radius: 4px;
      transition: background-color 200ms ease-in;

      &:hover {
        background-color: rgb(190, 190, 190);
      }

      .v-icon {
        color: white;
      }
    }

    .next-agent {
      justify-content: center;
      padding: 1em;
    }
  }

</style>
