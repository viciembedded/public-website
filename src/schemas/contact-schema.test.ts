// Self-check, no test runner needed: node --experimental-strip-types src/schemas/contact-schema.test.ts
import assert from "node:assert/strict"

import { validateContact } from "./contact-schema.ts"

const valid = {
  name: "  Ada Lovelace ",
  email: "ada@example.com",
  company: "",
  enquiryType: "Software Development",
  message: "We need firmware for a sensor board prototype.",
}

const ok = validateContact(valid)
assert.equal(ok.errors, null)
assert.equal(ok.data?.name, "Ada Lovelace")

const bad = validateContact({
  ...valid,
  name: "   ",
  email: "not-an-email",
  enquiryType: "",
  message: "too short",
})
assert.deepEqual(Object.keys(bad.errors ?? {}).sort(), [
  "email",
  "enquiryType",
  "message",
  "name",
])
assert.equal(
  bad.errors?.email,
  "Enter a valid email address, like name@example.com."
)

assert.equal(
  validateContact({ ...valid, email: "" }).errors?.email,
  "Enter your email address."
)
assert.ok(
  validateContact({ ...valid, enquiryType: "Hacking" }).errors?.enquiryType
)

console.log("contact-schema: all checks passed")
