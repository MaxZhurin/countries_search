<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import debounce from "debounce";

import { getDistance } from "@/utils";
import { useRootStore } from "@/stores";
import rootService from "@/services/root";

const rootStore = useRootStore();
const { countries, countriesLoading } = storeToRefs(rootStore);

const country = ref(null);
const distance = ref(2500);
const filteredCountries = ref([]);

const getFilteredCountries = () => {
  const res = [];

  if (country.value) {
    countries.value.forEach((item) => {
      if (country.value.region !== item.region) return;
      const distanceBetween = getDistance(country.value.capitalInfo.latlng, item.capitalInfo.latlng);
      if (distanceBetween > distance.value) return;
      if (country.value.flag === item.flag) return;

      res.push({ ...item, distance: distanceBetween.toFixed() });
    });
  }

  filteredCountries.value = res.sort((a, b) => a.distance - b.distance);
};

const debouncedGetFilteredCountries = debounce(getFilteredCountries, 300);

watch([distance, country], debouncedGetFilteredCountries);

onMounted(rootStore.getAllCountries);
</script>

<template>
  <div v-if="countriesLoading" class="loading"></div>
  <Transition name="fade">
    <main v-show="!countriesLoading" class="container">
      <section>
        <h2>Settings:</h2>
        <div class="settings">
          <div class="item double">
            <label for="country">country:</label>
            <select name="country" id="country" v-model="country">
              <option value="null">Please select a country</option>
              <option v-for="item in countries" :key="item.flag" :value="item">
                {{ item.capital?.[0] }}<span v-if="item.capital?.[0]">,</span> {{ item.name.common }}
              </option>
            </select>
          </div>

          <div class="item">
            <label for="distance">Distance:</label>
            <input
              type="text"
              id="distance"
              name="distance"
              size="5"
              min="500"
              max="5000"
              v-model="distance"
            />
          </div>

          <div class="item double">
            <label for="slider">Select distance:</label>
            <input
              type="range"
              class="slider"
              id="slider"
              min="500"
              max="5000"
              v-model="distance"
            />
          </div>
        </div>
      </section>

      <section>
        <h2>Results:</h2>
        <div id="results">
          <TransitionGroup
            v-if="filteredCountries.length > 0"
            name="list"
            tag="ol"
          >
            <li
              v-for="({ capital, name, distance }, index) in filteredCountries"
            >
              {{ capital?.[0] }}<span v-if="capital?.[0]">,</span> {{ name.common }} ({{ distance }}km)
            </li>
          </TransitionGroup>
          
          <p v-else>Countries not found!</p>
        </div>
      </section>
    </main>
  </Transition>
</template>

<style scoped>
main.container {
  width: 1024px;
}

section {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
}

.settings {
  display: flex;
}

.item {
  width: 10%;
}

.item.double {
  flex-grow: 2;
}

label {
  display: block;
  padding: 10px 0;
}

input {
  font-size: medium;
}

select {
  width: 85%;
  font-size: large;
  display: block;
}

.slider {
  width: 100%;
}

.loading {
  width: 48px;
  height: 48px;
  margin-top: 20px;
  border: 5px solid #f51212;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
