import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import rootService from "@/services/root";

export type Country = {
  capital: string[];
  name: {
    common: string;
  },
};

interface RootStore {
  countriesLoading: boolean;
  countries: Country[];
}

const toast = useToast();

export const useRootStore = defineStore("root", {
  state: (): RootStore => ({
    countriesLoading: true,
    countries: [],
  }),
  actions: {
    async getAllCountries() {
        try {
          this.countriesLoading = true;
          const { data } = await rootService.getAllCountries();
          this.countries = data;
        } catch {
          toast.error("Failed to load countries!");
        } finally {
          this.countriesLoading = false;
        }
    },
  },
});
