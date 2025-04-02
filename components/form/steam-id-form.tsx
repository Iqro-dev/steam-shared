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
import { type SteamIdFormValues, steamIdSchema } from "@/lib/validations/steam-id";
import { SteamIdHints } from "./steam-id-hints";

interface SteamFormProps {
  onSubmit: (values: SteamIdFormValues) => void;
}

export function SteamIdForm({ onSubmit }: SteamFormProps) {
  const form = useForm<SteamIdFormValues>({
    resolver: zodResolver(steamIdSchema),
    defaultValues: {
      steamId: "",
    },
  });

  const handleSubmit = async (values: SteamIdFormValues) => {
    try {
      await onSubmit(values);
    } catch {
      form.setError("steamId", {
        message: "An error occurred while validating your Steam ID",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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

        <SteamIdHints />

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
