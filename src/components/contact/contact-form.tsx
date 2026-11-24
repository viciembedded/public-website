import { useRef, useState, type ComponentProps } from "react"
import { IconCircleCheck } from "@tabler/icons-react"
import {
  revalidateLogic,
  useForm,
  type AnyFieldApi,
} from "@tanstack/react-form"
import { m } from "motion/react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  contactSchema,
  enquiryTypes,
  type ContactEnquiry,
  type ContactFormValues,
} from "@/schemas/contact-schema"

// Any form backend that accepts a JSON POST (e.g. Formspree, a serverless function).
// It must validate and rate-limit on the server too (reuse contactSchema there); client checks are a convenience.
const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

const fieldOrder: (keyof ContactEnquiry)[] = [
  "name",
  "email",
  "company",
  "enquiryType",
  "message",
]

// Larger than shadcn's compact default: comfortable touch targets (blueprint §6).
const controlClass = "h-11 bg-card px-3.5 text-base md:text-base"

/** Accessibility wiring shared by every control: invalid state and error/hint links. */
function controlProps(field: AnyFieldApi, hintId?: string) {
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid
  return {
    invalid,
    props: {
      id: field.name,
      name: field.name,
      onBlur: field.handleBlur,
      "aria-invalid": invalid || undefined,
      "aria-describedby":
        [hintId, invalid && `${field.name}-error`].filter(Boolean).join(" ") ||
        undefined,
    },
  }
}

function FieldMessage({
  field,
  invalid,
}: {
  field: AnyFieldApi
  invalid: boolean
}) {
  if (!invalid) return null
  return (
    <FieldError
      id={`${field.name}-error`}
      errors={field.state.meta.errors}
      className="animate-in duration-200 fade-in-0 slide-in-from-top-1"
    />
  )
}

function TextField({
  field,
  label,
  optional,
  ...inputProps
}: {
  field: AnyFieldApi
  label: string
  optional?: boolean
} & Omit<ComponentProps<typeof Input>, "id" | "name" | "value" | "onChange">) {
  const { invalid, props } = controlProps(field)
  return (
    <Field data-invalid={invalid || undefined}>
      <FieldLabel htmlFor={field.name}>
        {label}
        {optional && (
          <span className="font-normal text-muted-foreground">(optional)</span>
        )}
      </FieldLabel>
      <Input
        {...inputProps}
        {...props}
        value={field.state.value ?? ""}
        onChange={(event) => field.handleChange(event.target.value)}
        className={controlClass}
      />
      <FieldMessage field={field} invalid={invalid} />
    </Field>
  )
}

type Status = "idle" | "sent" | "error"

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState("")
  const honeypotRef = useRef<HTMLInputElement>(null)

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      enquiryType: "",
      message: "",
    } satisfies ContactFormValues as ContactFormValues,
    // Validate on submit first, then re-check on every change so errors clear as they're fixed.
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
    validators: { onDynamic: contactSchema },
    onSubmitInvalid: ({ formApi }) => {
      const first = fieldOrder.find(
        (name) => formApi.getFieldMeta(name)?.errors.length
      )
      if (first) document.getElementById(first)?.focus()
    },
    onSubmit: async ({ value, formApi }) => {
      // Honeypot: real visitors never see or fill this field.
      if (honeypotRef.current?.value) {
        setStatus("sent")
        return
      }

      if (!endpoint) {
        setStatus("error")
        setError(
          "The enquiry form isn't connected yet, so your message wasn't sent. Please try again later."
        )
        return
      }

      setError("")
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          // Send the trimmed, validated values, not the raw input.
          body: JSON.stringify(contactSchema.parse(value)),
        })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        formApi.reset()
        setStatus("sent")
      } catch {
        setStatus("error")
        setError(
          "Your enquiry wasn't sent because of a connection or server problem. Your details are still in the form; please try again."
        )
      }
    },
  })

  if (status === "sent") {
    return (
      <m.div
        role="status"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="rounded-xl border border-primary/30 bg-card p-8"
      >
        <m.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 18,
            delay: 0.15,
          }}
          className="mb-4 inline-flex text-primary"
        >
          <IconCircleCheck aria-hidden="true" className="size-9" stroke={1.5} />
        </m.span>
        <h2 className="text-xl font-semibold tracking-tight">Enquiry sent</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Thank you for contacting Vici Embedded. Your enquiry has been
          received. We will review the details and get back to you.
        </p>
      </m.div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        void form.handleSubmit()
      }}
      aria-labelledby="form-heading"
    >
      <h2
        id="form-heading"
        className="mb-6 text-2xl font-semibold tracking-tight"
      >
        Send an enquiry
      </h2>

      <FieldGroup className="gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <form.Field name="name">
            {(field) => (
              <TextField
                field={field}
                label="Full name"
                maxLength={120}
                autoComplete="name"
              />
            )}
          </form.Field>
          <form.Field name="email">
            {(field) => (
              <TextField
                field={field}
                label="Email address"
                type="email"
                maxLength={200}
                autoComplete="email"
              />
            )}
          </form.Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <form.Field name="company">
            {(field) => (
              <TextField
                field={field}
                label="Company or organization"
                optional
                maxLength={160}
                autoComplete="organization"
              />
            )}
          </form.Field>
          <form.Field name="enquiryType">
            {(field) => {
              const { invalid, props } = controlProps(field)
              return (
                <Field data-invalid={invalid || undefined}>
                  <FieldLabel htmlFor={field.name}>Enquiry type</FieldLabel>
                  <Select
                    value={field.state.value || null}
                    onValueChange={(value) => field.handleChange(value ?? "")}
                  >
                    <SelectTrigger
                      {...props}
                      className={`w-full data-[size=default]:h-11 ${controlClass}`}
                    >
                      <SelectValue placeholder="Choose a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {enquiryTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldMessage field={field} invalid={invalid} />
                </Field>
              )
            }}
          </form.Field>
        </div>

        <form.Field name="message">
          {(field) => {
            const { invalid, props } = controlProps(field, "message-hint")
            return (
              <Field data-invalid={invalid || undefined}>
                <FieldLabel htmlFor={field.name}>
                  Your project or enquiry
                </FieldLabel>
                <Textarea
                  {...props}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  maxLength={5000}
                  rows={6}
                  className="min-h-36 bg-card px-3.5 py-3 text-base md:text-base"
                />
                <FieldMessage field={field} invalid={invalid} />
                <FieldDescription id="message-hint">
                  A brief description is enough: what you want to build or
                  solve, and where it stands today.
                </FieldDescription>
              </Field>
            )
          }}
        </form.Field>

        {/* Honeypot field, hidden from people and assistive tech. */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="website">Website</label>
          <input
            ref={honeypotRef}
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {status === "error" && (
          <m.p
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive"
          >
            {error}
          </m.p>
        )}

        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full px-6 text-[0.95rem] sm:w-fit"
            >
              {isSubmitting ? "Sending…" : "Send Enquiry"}
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  )
}
