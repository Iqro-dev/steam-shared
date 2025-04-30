import { z } from "zod";

export const steamIdSchema = z.object({
  steamId: z.string().length(17, {
    message: "Make sure your Steam ID is correct.",
  }),
});

export type SteamIdFormValues = z.infer<typeof steamIdSchema>;
