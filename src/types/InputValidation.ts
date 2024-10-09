import { z } from 'zod';

export const RegistrationSchema = z.object({
    name: z.string().min(1),
    username: z.string().min(1).max(18),
    password: z.string().min(8),
});

export const LoginSchema = z.object({
    username: z.string().min(1).max(18),
    password: z.string().min(8),
})

export const assignmentSubmitSchema = z.object({
    username: z.string().min(1).max(18),
    task: z.string().min(1),
    admin: z.string().min(1).max(18),
})