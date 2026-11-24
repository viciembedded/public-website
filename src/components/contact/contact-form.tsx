import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"

const enquiryTypes = [
  "Embedded Systems Engineering",
  "Software Development",
  "Cybersecurity",
  "Computer and Technology Solutions",
  "IoT and Intelligent Systems",
  "AI and Intelligent Hardware",
  "Product Partnership",
  "General Enquiry",
]

// Any form backend that accepts a JSON POST (e.g. Formspree, a serverless function).
// It must validate and rate-limit on the server too; client checks are only a convenience.
const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

type Status = "idle" | "sending" | "sent" | "error"

const fieldClass =
  "mt-2 block w-full rounded-lg border border-input bg-card px-3.5 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive"

const labelClass = "text-sm font-medium"

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))

    // Honeypot: real visitors never see or fill this field.
    if (data.website) {
      setStatus("sent")
      return
    }
    delete data.website

    if (!endpoint) {
      setStatus("error")
      setError(
        "The enquiry form isn't connected yet, so your message wasn't sent. Please try again later."
      )
      return
    }

    setStatus("sending")
    setError("")
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      form.reset()
      setStatus("sent")
    } catch {
      setStatus("error")
      setError(
        "Your enquiry wasn't sent because of a connection or server problem. Your details are still in the form; please try again."
      )
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-xl border border-primary/30 bg-card p-8"
      >
        <h2 className="text-xl font-semibold tracking-tight">Enquiry sent</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Thank you for contacting Vici Embedded. Your enquiry has been
          received. We will review the details and get back to you.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} aria-labelledby="form-heading" className="space-y-6">
      <h2 id="form-heading" className="text-2xl font-semibold tracking-tight">
        Send an enquiry
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className={labelClass}>
            Company or organization{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            maxLength={160}
            autoComplete="organization"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="enquiryType" className={labelClass}>
            Enquiry type
          </label>
          <select
            id="enquiryType"
            name="enquiryType"
            required
            defaultValue=""
            className={fieldClass}
          >
            <option value="" disabled>
              Choose a topic
            </option>
            {enquiryTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Your project or enquiry
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={20}
          maxLength={5000}
          rows={6}
          aria-describedby="message-hint"
          className={fieldClass}
        />
        <p id="message-hint" className="mt-2 text-sm text-muted-foreground">
          A brief description is enough: what you want to build or solve, and
          where it stands today.
        </p>
      </div>

      {/* Honeypot field, hidden from people and assistive tech. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive"
        >
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "sending"}
        className="h-11 w-full px-6 text-[0.95rem] sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send Enquiry"}
      </Button>
    </form>
  )
}
