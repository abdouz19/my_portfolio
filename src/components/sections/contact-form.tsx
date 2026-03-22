"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { honeypot: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    if (data.honeypot) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <Card hover={false}>
      <h3 className="mb-4 text-xl font-bold">Send Me a Message</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("honeypot")}
          />
        </div>
        <Input
          label="Full Name"
          placeholder="Your full name"
          required
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          required
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Subject"
          placeholder="What's this about?"
          required
          error={errors.subject?.message}
          {...register("subject")}
        />
        <Textarea
          label="Message"
          placeholder="Your message here..."
          required
          error={errors.message?.message}
          {...register("message")}
        />
        <Button
          type="submit"
          variant="gradient"
          className="w-full"
          loading={isSubmitting}
          icon={<Send className="h-4 w-4" />}
        >
          Send Message
        </Button>
        {status === "success" && (
          <p className="text-sm text-accent-green">
            Message sent successfully! I&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-accent-red">
            Failed to send message. Please try again or email me directly.
          </p>
        )}
      </form>
    </Card>
  );
}
