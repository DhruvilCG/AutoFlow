import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/db";


import { polarClient } from "./polar";
import { checkout, polar, portal } from "@polar-sh/better-auth";
// import { polar } from "@polar-sh/better-auth";.


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    emailAndPassword : {
        enabled : true,
        autoSignIn : true // user can auto sign in if user is register
    },
    socialProviders: {
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
    plugins : [
        polar({
            client : polarClient,
            createCustomerOnSignUp : true,
            use : [
                checkout({
                    products : [
                        {
                            productId: "b5115811-2a36-4aab-8806-38f16236fce4",
                            slug: "autoflow-pro"
                        }
                    ],
                    successUrl: process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly: true
                }),
                portal(),
            ]
        })
    ]
});