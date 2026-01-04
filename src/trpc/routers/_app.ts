import { resolve } from 'path';
import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
export const appRouter = createTRPCRouter({
    getWorkflows: protectedProcedure.query(({ ctx }) => {
        return prisma.workflows.findMany()
    }),
    createWorkflow: protectedProcedure.mutation(async () => {
        //Fetch the video
        await new Promise((resolve) => setTimeout(resolve, 5_000))

        //Transcribe the video
        await new Promise((resolve) => setTimeout(resolve, 5_000))

        //Send the transcription to OpenAI
        await new Promise((resolve) => setTimeout(resolve, 5_000))

        return prisma.workflows.create({
            data: {
                name: "test-Workflow",
            },
        })
    })
});
// export type definition of API
export type AppRouter = typeof appRouter;