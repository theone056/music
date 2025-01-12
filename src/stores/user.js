import { defineStore } from "pinia";
import {auth, userCollection} from '@/includes/firebase';
import { ref } from "vue";

export const useUserStore = defineStore('user', ()=>{
    const userLoggedIn = ref(false);


    const register = async (values) =>{
        const userCred = await auth.createUserWithEmailAndPassword(
            values.email, values.password
        );

        await userCollection.doc(userCred.user.uid).set({
            name: values.name,
            email: values.email,
            age: values.age,
            country: values.country
        });

        await userCred.user.updateProfile({
            displayName: values.name
        })

        userLoggedIn.value = true;
    }

    const authenticate = async (values) => {
        await auth.signInWithEmailAndPassword(
            values.email,
            values.password
        );

        userLoggedIn.value = true;
    }

    const signOut = async () => {
        await auth.signOut();

        userLoggedIn.value = false;

        window.location.reload();
    }

    return {
        userLoggedIn,
        register,
        authenticate,
        signOut
    }
})