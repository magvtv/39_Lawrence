import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircleIcon, CheckCircleIcon, SendIcon } from "lucide-react";
import type React from "react";
import { useContactForm } from "../../hooks/useContactForm";

interface ContactFormProps {
  endpoint?: string;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  endpoint,
  className = "",
}) => {
  const {
    form,
    handleSubmit,
    isSubmitting,
    isSubmitted,
    error,
    resetFormState,
  } = useContactForm({
    endpoint,
    onSuccess: () => {
      // You could add analytics tracking here
      console.log("Form submitted successfully");
    },
  });

  const { register, formState } = form;
  const { errors } = formState;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Get In Touch</CardTitle>
        <CardDescription>
          Fill out the form below to send me a message. I'll get back to you as
          soon as possible.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isSubmitted ? (
          <Alert
            variant="default"
            className="bg-green-50 border-green-200 text-green-800"
          >
            <CheckCircleIcon className="h-4 w-4" />
            <AlertTitle>Message Sent!</AlertTitle>
            <AlertDescription>
              Thank you for your message. I'll respond as soon as possible.
            </AlertDescription>
            <Button
              variant="outline"
              className="mt-4 bg-white"
              onClick={resetFormState}
            >
              Send Another Message
            </Button>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Your name"
                className={
                  errors.name ? "border-red-300 focus-visible:ring-red-300" : ""
                }
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="your.email@example.com"
                className={
                  errors.email
                    ? "border-red-300 focus-visible:ring-red-300"
                    : ""
                }
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">
                Subject <span className="text-red-500">*</span>
              </Label>
              <Input
                id="subject"
                {...register("subject")}
                placeholder="What is this regarding?"
                className={
                  errors.subject
                    ? "border-red-300 focus-visible:ring-red-300"
                    : ""
                }
                disabled={isSubmitting}
              />
              {errors.subject && (
                <p className="text-red-500 text-sm">{errors.subject.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">
                Message <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="message"
                {...register("message")}
                placeholder="Your message"
                rows={5}
                className={
                  errors.message
                    ? "border-red-300 focus-visible:ring-red-300"
                    : ""
                }
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Sending...
                </>
              ) : (
                <>
                  <SendIcon className="mr-2 h-4 w-4" /> Send Message
                </>
              )}
            </Button>
          </form>
        )}
      </CardContent>

      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-sm text-muted-foreground">
          You can also reach me at{" "}
          <a
            href="mailto:contact@example.com"
            className="text-primary hover:underline"
          >
            contact@example.com
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default ContactForm;
