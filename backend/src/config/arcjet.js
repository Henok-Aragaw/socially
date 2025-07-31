import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import { ENV } from "./env.js"

//initialize Arcject with security rules
export const aj = arcjet({
    key: ENV.ARCJET_KEY,
    rules: [
        shield({
            mode:"LIVE"
        }),

        detectBot({
            mode:"LIVE",
            allow: [
             "CATEGORY:SEARCH_ENGINE",   
            ]
        }),

        tokenBucket({
            mode:"LIVE",
            refillRate: 10,
            interval: 10,
            capacity: 15,
        }),
    ],
});