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
          <td v-if="userStore.getIsPlayer"><i>
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
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { GetAllPlayersQuery, useGetAllPlayersQuery } from '../graphql/generated/schema';
import { useSwitchTableHeader } from '../composables/switchTableHeader';
import { useUserStore } from '../store';
const userStore = useUserStore();

interface Player {
  id: number;
  rank: number;
  battletag: string;
  victory: number;
  defeat: number;
}
const playersList = ref<Player[]>([]);

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

function sortPlayers(column: string) {
  switch (column) {
    case 'rank':
      if (arrowRankDirection.value.down) {
        playersList.value.sort((a, b) => {
          return a.rank - b.rank;
        });
      } else {
        playersList.value.sort((a, b) => {
          return b.rank - a.rank;
        });
      }
      break;

    case 'battletag':
      if (arrowBattletagDirection.value.down) {
        playersList.value.sort((a, b) => {
          return a.battletag.localeCompare(b.battletag);
        });
      } else {
        playersList.value.sort((a, b) => {
          return b.battletag.localeCompare(a.battletag);
        });
      }
      break;

    case 'victory':
      if (arrowVictoryDirection.value.down) {
        playersList.value.sort((a, b) => {
          return a.victory - b.victory;
        });
      } else {
        playersList.value.sort((a, b) => {
          return b.victory - a.victory;
        });
      }
      break;

    case 'defeat':
      if (arrowDefeatDirection.value.down) {
        playersList.value.sort((a, b) => {
          return a.defeat - b.defeat;
        });
      } else {
        playersList.value.sort((a, b) => {
          return b.defeat - a.defeat;
        });
      }

      break;
    default:
      break;
  }
}

const { switchTableHeader, arrowRankDirection, arrowBattletagDirection, arrowDefeatDirection, arrowVictoryDirection } = useSwitchTableHeader();
</script>
