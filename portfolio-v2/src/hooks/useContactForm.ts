import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Contact form schema validation
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

interface UseContactFormOptions {
  endpoint?: string;
  onSuccess?: (data: ContactFormValues) => void;
  onError?: (error: unknown) => void;
}

export const useContactForm = (options: UseContactFormOptions = {}) => {
  const {
    endpoint = "https://formspree.io/f/your-form-id", // Replace with your actual endpoint
    onSuccess,
    onError,
  } = options;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const handleSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(
          `Form submission failed with status: ${response.status}`,
        );
      }

      setIsSubmitted(true);
      form.reset();
      onSuccess?.(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
      onError?.(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to reset the form state after successful submission
  const resetFormState = () => {
    setIsSubmitted(false);
    setError(null);
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
    isSubmitting,
    isSubmitted,
    error,
    resetFormState,
  };
};

export default useContactForm;
