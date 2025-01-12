import {
            Form as VeeForm, 
            Field as VeeField, 
            defineRule, 
            ErrorMessage,
            configure
       } from 'vee-validate';

import { required, min,confirmed, email  } from '@vee-validate/rules';

export default {
    install(app){
        app.component("VeeForm", VeeForm);
        app.component("VeeField", VeeField);
        app.component("ErrorMessage", ErrorMessage);

        defineRule('required', required);
        defineRule("min", min);
        defineRule("password_mismatch", confirmed);
        defineRule('email',email);

        configure({
            generateMessage:(ctx)=>{
                const messages = {
                    required: `The field ${ctx.field} is required`,
                    password_mismatch: "The passwords don't match.",
                    email: `The field ${ctx.field} must be a valid email`,
                    min: `The field ${ctx.field} is too short`
                }

                const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `The field ${ctx.field} is not valid!`;

                return message;
            },
            validateOnBlur: true,
            validateOnChange: true,
            validateOnInput: false,
            validateOnModelUpdate: true
        })
    }
};
