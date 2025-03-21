import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";

interface SteamFormProps {
  onSubmit: (values: { steamId: string }) => void;
}

export const formSchema = z.object({
  steamId: z.string().length(17, {
    message: "Make sure your Steam ID is correct.",
  }),
});

export function SteamIdForm({ onSubmit }: SteamFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      steamId: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="steamId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your 17-digit Steam ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="7656119xxxxxxxxxx"
                  {...field}
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  className="transition-all duration-200 focus:scale-[1.02]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4 space-y-2">
          <p className="font-medium text-foreground/80">Your Steam ID should:</p>

          <ul className="space-y-1.5 cursor-default">
            <li className="flex items-center gap-2 group">
              <ArrowRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1" />

              <span className="group-hover:text-primary transition-colors">
                Contain exactly 17 digits
              </span>
            </li>

            <li className="flex items-center gap-2 group">
              <ArrowRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1" />

              <span className="group-hover:text-primary transition-colors">
                Start with &apos;7656119&apos;
              </span>
            </li>

            <li className="flex items-center gap-2 group">
              <ArrowRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1" />

              <span className="group-hover:text-primary transition-colors">
                Only contain numbers
              </span>
            </li>
          </ul>
        </div>

        <Button
          type="submit"
          className="flex w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          Validate
        </Button>
      </form>
    </Form>
  );
}
