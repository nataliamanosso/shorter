import { z } from "zod";

export const shortenSchema = z.object({
    url: z.string().url().refine(
        (u) => /^https?:\/\//i.test(u),
        "A URL deve começar com http:// ou https://"
    ),
    alias: z
        .string()
        .min(3)
        .max(20)
        .regex(/^[a-zA-Z0-9-_]+$/)
        .optional(),
});
