<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import debounce from "debounce";

import { getDistance } from "@/utils";
import { useRootStore } from "@/stores";
import rootService from "@/services/root";

const rootStore = useRootStore();
const { countries, countriesLoading } = storeToRefs(rootStore);

const capital = ref(null);
const distance = ref(2500);
const filteredCountries = ref([]);

const getFilteredCountries = () => {
  const res = [];

  if (capital.value) {
    countries.value.forEach((country) => {
      if (capital.value.region !== country.region) return;
      const distanceBetween = getDistance(capital.value.latlng, country.latlng);
      if (distanceBetween > distance.value) return;
      if (capital.value.flag === country.flag) return;

      res.push({ ...country, distance: distanceBetween.toFixed() });
    });
  }

  filteredCountries.value = res.sort((a, b) => a.distance - b.distance);
};

const debouncedGetFilteredCountries = debounce(getFilteredCountries, 300);

watch([distance, capital], debouncedGetFilteredCountries);

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
            <label for="capital">Capital:</label>
            <select name="capital" id="capital" v-model="capital">
              <option value="null">Please select a capital</option>
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
