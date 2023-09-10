<template>
  <div class="leaderboard">
    <h2>Leaderboard</h2>
    <table class="leaderboard-table">
      <thead>
        <tr>
          <th class="arrow-rank" :class="arrowRankDirection"><span @click="switchTableHeader('rank')">
              Rank <i>
                <font-awesome-icon icon="fa-solid fa-arrow-up" />
              </i>
              <i>
                <font-awesome-icon icon="fa-solid fa-arrow-down" />
              </i>
            </span>
          </th>
          <th class="arrow-battletag" :class="arrowBattletagDirection"><span @click="switchTableHeader('battletag')">
              Battletag <i>
                <font-awesome-icon icon="fa-solid fa-arrow-up" />
              </i><i>
                <font-awesome-icon icon="fa-solid fa-arrow-down" />
              </i>
            </span></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="player in playersList" :key="player.id">
          <td>{{ player.rank }}</td>
          <td>{{ player.battletag }}</td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <th colspan="4">Top 25 players</th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { GetAllPlayersQuery, useGetAllPlayersQuery } from '../graphql/generated/schema';
import { useSwitchTableHeader } from '../composables/switchTableHeader';

interface Player {
  id: number;
  rank: number;
  battletag: string;
}
const playersList = ref<Player[]>([]);

const { result } = useGetAllPlayersQuery()

const handleResult = (data: GetAllPlayersQuery) => {
  playersList.value = data.getAllPlayers.map((player) => {
    return {
      id: player.id,
      rank: player.rank,
      battletag: player.profile.battletag
    }
  })
};

watch(result, () => {
  if (!result.value) {
    return;
  }
  handleResult(result.value);
}, {
  immediate: true
});

const { switchTableHeader, arrowRankDirection, arrowBattletagDirection } = useSwitchTableHeader();
</script>
