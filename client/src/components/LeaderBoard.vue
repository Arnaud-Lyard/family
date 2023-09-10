<template>
  <div class="leaderboard">
    <h2>Leaderboard</h2>
    <div v-for="player in playersList" :key="player.id">
      <router-link :to="{ name: 'player', params: { id: player.id } }">
        <p>{{ player.battletag }} {{ player.rank }}</p>
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { GetAllPlayersQuery, useGetAllPlayersQuery } from '../graphql/generated/schema';
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
</script>
