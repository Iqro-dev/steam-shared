import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface SteamFormProps {
  onSubmit: (values: { steamid: string }) => void;
}

export const formSchema = z.object({
  steamid: z.string().length(17, {
    message: "Make sure your Steam ID is correct.",
  }),
});

export function SteamIdForm({ onSubmit }: SteamFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      steamid: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="steamid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Steam ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your steam id..."
                  {...field}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </FormControl>
              <FormDescription>Steam ID is a 64 bit ID which is a 17 digit number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
