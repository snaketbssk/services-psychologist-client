"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const SERVICES = [
  "Individual Counseling",
  "Family Therapy",
  "Couples Therapy",
  "Group Therapy",
  "Child & Adolescent Therapy",
  "Trauma Counseling",
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message: string;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  date: "",
  message: "",
};

interface Props {
  /** The element that opens the dialog when clicked */
  trigger: React.ReactNode;
}

/**
 * BookConsultationModal — controlled dialog with a multi-field booking form.
 *
 * Usage:
 *   <BookConsultationModal trigger={<Button>Book a Consultation</Button>} />
 */
export default function BookConsultationModal({ trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Replace with your actual API call here
    setSubmitted(true);
  }

  function handleClose() {
    setOpen(false);
    // Reset after animation finishes
    setTimeout(() => {
      setSubmitted(false);
      setForm(EMPTY);
    }, 300);
  }

  return (
    <>
      {/* Trigger — any element; we capture its onClick */}
      <span
        onClick={() => setOpen(true)}
        className="contents"
        role="presentation"
      >
        {trigger}
      </span>

      <Dialog open={open} onOpenChange={(o) => { if (!o) handleClose(); }}>
        <DialogContent className="sm:max-w-lg">
          {submitted ? (
            /* ── Success state ─────────────────────────────────────────── */
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent/15 text-3xl">
                ✓
              </div>
              <DialogTitle className="text-lg text-foreground">
                Consultation Request Sent!
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                Thank you, <strong>{form.name}</strong>. We&apos;ll contact you
                within 24 hours to confirm your appointment.
              </p>
              <Button className="mt-2 w-full" onClick={handleClose}>
                Close
              </Button>
            </div>
          ) : (
            /* ── Booking form ──────────────────────────────────────────── */
            <form onSubmit={handleSubmit} noValidate>
              <DialogHeader className="mb-4">
                <DialogTitle className="font-heading text-lg">
                  Book a Consultation
                </DialogTitle>
                <DialogDescription>
                  Fill in the details below and we&apos;ll confirm your
                  appointment within 24 hours.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-3">
                {/* Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-foreground">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-foreground">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="1-555-000-0000"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-foreground">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {/* Service + Date */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-foreground">
                      Service <span className="text-destructive">*</span>
                    </label>
                    <select
                      required
                      value={form.service}
                      onChange={(e) => set("service", e.target.value)}
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-foreground">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => set("date", e.target.value)}
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us a bit about what you're looking for..."
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>
              </div>

              <DialogFooter className="mt-4" showCloseButton>
                <Button type="submit" className="w-full sm:w-auto">
                  Request Appointment
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
