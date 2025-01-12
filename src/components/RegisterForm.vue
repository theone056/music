<script setup>
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

const userStore = useUserStore();
const reg_show_alert = ref(false);
const reg_alert_variant = ref('bg-blue-500');
const reg_in_submission = ref(false);
const reg_alert_msg = ref('Please wait! Your account is being created');

const schema = {
    name: 'required|min:3',
    email:'required',
    age: "required",
    password: "required|min:9",
    confirm_password: "password_mismatch:@password",
    country: "required",
    tos: "required"
}

const userData = {
    country: 'USA',
    tos: '1'
}

const Register = async (values) => {
    reg_show_alert.value = true;
    reg_in_submission.value = true;
    reg_alert_variant.value = 'bg-blue-500';
    reg_alert_msg.value = 'Please wait! Your account is being created';

    try{
       await userStore.register(values);
    }
    catch(error)
    {
        reg_in_submission.value = false;
        reg_alert_variant.value = 'bg-red-500';
        reg_alert_msg.value = 'An unexpected error occured. Please try again later.';
        return;
    }

    reg_alert_variant.value = 'bg-green-500';
    reg_alert_msg.value = 'Success! Your account has been created.';

    window.location.reload();
}

</script>

<template>
    <div class="text-white text-center font-bold p-4 rounded mb-4"
            v-if="reg_show_alert" 
            :class="reg_alert_variant"
            >
            {{ reg_alert_msg }}
    </div>
    <!-- Registration Form -->
    <vee-form :validation-schema="schema" @submit="Register" :initialValues="userData">
        <!-- Name -->
        <div class="mb-3">
        <label class="inline-block mb-2">Name</label>
        <vee-field
            type="text"
            name="name"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Name"
        />
        <ErrorMessage class="text-red-600" name="name" />
        </div>
        <!-- Email -->
        <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <vee-field
            type="email"
            name="email"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Email"
        />
        <ErrorMessage class="text-red-600" name="email" />
        </div>
        <!-- Age -->
        <div class="mb-3">
        <label class="inline-block mb-2">Age</label>
        <vee-field
            name="age"
            type="number"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        />
        <ErrorMessage class="text-red-600" name="age" />
        </div>
        <!-- Password -->
        <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <vee-field
            name="password" 
            v-slot="{ field,errors }"
            :bails="false"
        >
            <input v-bind="field" placeholder="Password" type="password" class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded" />
            <div class="text-red-600" v-for="error in errors" :key="error">
                {{ error }}
            </div>
        </vee-field>
        <!--<ErrorMessage class="text-red-600" name="password" />-->
        </div>
        <!-- Confirm Password -->
        <div class="mb-3">
        <label class="inline-block mb-2">Confirm Password</label>
        <vee-field
            name="confirm_password"
            type="password"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Confirm Password"
        />
        <ErrorMessage class="text-red-600" name="confirm_password" />
        </div>
        <!-- Country -->
        <div class="mb-3">
        <label class="inline-block mb-2">Country</label>
        <vee-field
            as="select"
            name="country"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        >
            <option value="USA">USA</option>
            <option value="Mexico">Mexico</option>
            <option value="Germany">Germany</option>
        </vee-field>
        <ErrorMessage class="text-red-600" name="country" />
        </div>
        <!-- TOS -->
        <div class="mb-3 pl-6">
        <vee-field
            name="tos"
            type="checkbox"
            value = "1"
            class="w-4 h-4 float-left -ml-6 mt-1 rounded"
        />
        <label class="inline-block w-full">Accept terms of service</label>
        <ErrorMessage class="text-red-600" name="tos" />
        </div>
        <button
        :disabled="reg_in_submission"
        type="submit"
        class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
        >
        Submit
        </button>
    </vee-form>
</template>