"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

const formSchema = z.object({
  title: z.string().min(1),
  rating: z.number().min(1).max(10),
  description: z.string().min(1),
  location: z.string().min(1),
});

export type ReviewSchemaType = z.infer<typeof formSchema>;

type ReviewFormProps = {
  initialValues?: ReviewSchemaType;
  onSubmit: (values: ReviewSchemaType) => void;
};

export default function ReviewForm({
  initialValues,
  onSubmit,
}: ReviewFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  function submitAndReset(values: ReviewSchemaType) {
    form.reset();
    onSubmit(values);
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitAndReset)}
          className="space-y-2"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restaurant Name</FormLabel>
                <FormControl>
                  <Input placeholder="Kebab Store" {...field} />
                </FormControl>
                <FormDescription>Put the restaurants name here</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="I really enjoyed the köfta" {...field} />
                </FormControl>
                <FormDescription>Describe your experience</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Izmir" {...field} />
                </FormControl>
                <FormDescription>Add the restaurants location</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="8"
                    {...field}
                    min={1}
                    max={10}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormDescription>
                  Rate your experience from 1-10
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="mt-4" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
