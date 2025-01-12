<script setup>
import { useModal } from '@/stores/modal';
import { useUserStore } from '@/stores/user';

const {userLoggedIn, signOut} = useUserStore();
const useModalStore = useModal();

const toggleAuthModal = () =>{
    useModalStore.isOpen = !useModalStore.isOpen;
}

</script>


<template>
    <!-- Header -->
    <header id="header" class="bg-gray-700">
      <nav class="container mx-auto flex justify-start items-center py-5 px-4">
        <!-- App Name -->
        <RouterLink class="text-white font-bold uppercase text-2xl mr-4" :to="{ name: 'home'}" exact-active-class="no-active">
          Music
        </RouterLink>

        <div class="flex flex-grow items-center">
          <!-- Primary Navigation -->
          <ul class="flex flex-row mt-1">
            <li>
              <RouterLink class="px-2 text-white" :to="{ name: 'about'}" >About</RouterLink>
            </li>
            <!-- Navigation Links -->
            <li v-if="!userLoggedIn">
              <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">Login / Register</a>
            </li>
            <template v-else>
              <li>
                <RouterLink class="px-2 text-white" :to="{ name: 'manage' }">Manage</RouterLink>
              </li>
              <li>
                <a class="px-2 text-white" href="#" @click.prevent="signOut()">Logout</a>
              </li>
            </template>
          
          </ul>
        </div>
      </nav>
    </header>
</template>