import { z } from "zod"

export const enquiryTypes = [
  "Embedded Systems Engineering",
  "Software Development",
  "Cybersecurity",
  "Computer and Technology Solutions",
  "IoT and Intelligent Systems",
  "AI and Intelligent Hardware",
  "Product Partnership",
  "General Enquiry",
] as const

// Kept free of UI imports so a form backend can reuse it for server-side validation.
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter your full name.")
    .max(120, "Name must be 120 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .pipe(z.email("Enter a valid email address, like name@example.com.")),
  company: z
    .string()
    .trim()
    .max(160, "Company name must be 160 characters or fewer.")
    .optional(),
  // Input is a plain string so an empty form ("" = nothing chosen) type-checks; output is the enum.
  enquiryType: z.string().pipe(z.enum(enquiryTypes, "Choose an enquiry type.")),
  message: z
    .string()
    .trim()
    .min(20, "Describe your project or enquiry in at least 20 characters.")
    .max(5000, "Keep your message to 5,000 characters or fewer."),
})

export type ContactEnquiry = z.infer<typeof contactSchema>
/** Raw form values before validation (what the form holds while the visitor types). */
export type ContactFormValues = z.input<typeof contactSchema>
export type ContactErrors = Partial<Record<keyof ContactEnquiry, string>>

export function validateContact(input: unknown) {
  const result = contactSchema.safeParse(input)
  if (result.success) return { data: result.data, errors: null }

  const errors: ContactErrors = {}
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof ContactEnquiry
    errors[field] ??= issue.message
  }
  return { data: null, errors }
}
