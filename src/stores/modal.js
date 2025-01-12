import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useModal = defineStore("modal",()=>{
    const isOpen = ref(false);

    const hiddenClass = computed(()=> {
        return !isOpen.value ? "hidden" : "";
    })
    return {
        isOpen,
        hiddenClass
    }
})
