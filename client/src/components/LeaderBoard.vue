<template>
  <div class="leaderboard">
    <h2>Leaderboard</h2>
    <table class="leaderboard-table">
      <thead>
        <tr>
          <th class="arrow-rank" :class="arrowRankDirection"><span
              @click="switchTableHeader('rank'); sortPlayers('rank')">
              Rank <i>
                <font-awesome-icon icon="fa-solid fa-arrow-up" />
              </i>
              <i>
                <font-awesome-icon icon="fa-solid fa-arrow-down" />
              </i>
            </span>
          </th>
          <th class="arrow-battletag" :class="arrowBattletagDirection"><span
              @click="switchTableHeader('battletag'); sortPlayers('battletag')">
              Battletag <i>
                <font-awesome-icon icon="fa-solid fa-arrow-up" />
              </i><i>
                <font-awesome-icon icon="fa-solid fa-arrow-down" />
              </i>
            </span></th>
          <th class="arrow-victory" :class="arrowVictoryDirection"><span
              @click="switchTableHeader('victory'); sortPlayers('victory')">
              Victory <i>
                <font-awesome-icon icon="fa-solid fa-arrow-up" />
              </i><i>
                <font-awesome-icon icon="fa-solid fa-arrow-down" />
              </i>
            </span></th>
          <th class="arrow-defeat" :class="arrowDefeatDirection"><span
              @click="switchTableHeader('defeat'); sortPlayers('defeat')">
              Defeat <i>
                <font-awesome-icon icon="fa-solid fa-arrow-up" />
              </i><i>
                <font-awesome-icon icon="fa-solid fa-arrow-down" />
              </i>
            </span></th>
          <th v-if="userStore.getIsPlayer"><span>Request</span></th>

        </tr>
      </thead>

      <tbody>
        <tr v-for="player in playersList" :key="player.id">
          <td>{{ player.rank === 1000 ? '-' : player.rank }}</td>
          <td>{{ player.battletag }}</td>
          <td>{{ player.victory }}</td>
          <td>{{ player.defeat }}</td>
          <td v-if="userStore.getIsPlayer"><i @click="prepareMatch(player.id)">
              <font-awesome-icon icon="fa-solid fa-comments" />
            </i></td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <th colspan="5">Top 25 players</th>
        </tr>
      </tfoot>
    </table>
    <Modal v-show="isModalVisible" @confirm="sendMatchRequest()" @close="closeModal()">
      <template v-slot:header>Propose a date for the match.</template>
      <template v-slot:body>

        <label for="matchTime">Planned date:</label>
        <input type="datetime-local" v-model="matchTime" id="matchTime" name="matchTime">
        <div v-if="errorMatch" class="error">{{ errorMatch }}</div>
      </template>
      <template v-slot:buttonOne> Accept </template>
      <template v-slot:buttonTwo> Cancel </template>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { GetAllPlayersQuery, useGenerateMatchMutation, useGetAllPlayersQuery } from '../graphql/generated/schema';
import { useSortPlayers } from '../composables/sortPlayers';
import { useUserStore } from '../store';
import Modal from "../components/Modal.vue";
const userStore = useUserStore();

const isModalVisible = ref<boolean>(false);
const matchTime = ref<string>("");
const { result } = useGetAllPlayersQuery()

const handleResult = (data: GetAllPlayersQuery) => {
  playersList.value = data.getAllPlayers.map((player) => {
    return {
      id: player.id,
      rank: player.rank,
      battletag: player.profile.battletag,
      victory: player.victory,
      defeat: player.defeat
    }
  })
};

watch(result, () => {
  if (!result.value) {
    return;
  }
  handleResult(result.value);
  sortPlayers('rank');
}, {
  immediate: true
});

const playerId = ref<string>("");
function prepareMatch(opponentId: string) {
  isModalVisible.value = true;
  playerId.value = opponentId;
}

const errorMatch = ref<string>("");
function sendMatchRequest() {
  const { mutate: sendGenerateMatchMutation, onDone } = useGenerateMatchMutation({
    variables: {
      data: {
        opponentId: playerId.value,
        date: matchTime.value
      }
    }
  })
  sendGenerateMatchMutation();
  onDone(({ errors }) => {
    if (errors && errors[0].message === "DATE_IS_PAST") {
      errorMatch.value = 'You must choose a later date.';
      setTimeout(() => {
        errorMatch.value = '';
      }, 3000);
    } else if (errors && errors[0].message === "CANT_PLAY_AGAINST_YOURSELF") {
      errorMatch.value = "You can't assign a match to yourself.";
      setTimeout(() => {
        errorMatch.value = "";
      }, 3000);
    }
    else if (errors && errors[0].message === "INVALID_DATE") {
      errorMatch.value = "Invalid date.";
      setTimeout(() => {
        errorMatch.value = "";
      }, 3000);
    } else {
      isModalVisible.value = false;
      playerId.value = "";
    }
  }
  )
}

function closeModal() {
  isModalVisible.value = false;
  playerId.value = "";
}


const { playersList, sortPlayers, switchTableHeader, arrowRankDirection, arrowBattletagDirection, arrowDefeatDirection, arrowVictoryDirection } = useSortPlayers();
</script>
