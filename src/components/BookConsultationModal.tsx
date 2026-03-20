"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message: string;
}

const EMPTY: FormState = { name: "", email: "", phone: "", service: "", date: "", message: "" };

interface Props {
  trigger: React.ReactNode;
}

export default function BookConsultationModal({ trigger }: Props) {
  const t = useTranslations("BOOK_CONSULTATION_MODAL");

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const SERVICES = [
    t("SERVICE_INDIVIDUAL"),
    t("SERVICE_FAMILY"),
    t("SERVICE_COUPLES"),
    t("SERVICE_GROUP"),
    t("SERVICE_CHILD"),
    t("SERVICE_TRAUMA"),
  ];

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleClose() {
    setOpen(false);
    setTimeout(() => { setSubmitted(false); setForm(EMPTY); }, 300);
  }

  return (
    <>
      <span onClick={() => setOpen(true)} className="contents" role="presentation">
        {trigger}
      </span>

      <Dialog open={open} onOpenChange={(o) => { if (!o) handleClose(); }}>
        <DialogContent className="sm:max-w-lg">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent/15 text-3xl">✓</div>
              <DialogTitle className="text-lg text-foreground">
                {t("SUCCESS_TITLE")}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                {t("SUCCESS_MESSAGE", { name: form.name })}
              </p>
              <Button className="mt-2 w-full" onClick={handleClose}>
                {t("CLOSE")}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <DialogHeader className="mb-4">
                <DialogTitle className="font-heading text-lg">{t("TITLE")}</DialogTitle>
                <DialogDescription>{t("DESCRIPTION")}</DialogDescription>
              </DialogHeader>

              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-foreground">
                      {t("FULL_NAME")} <span className="text-destructive">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder={t("NAME_PLACEHOLDER")}
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-foreground">{t("PHONE")}</label>
                    <input
                      type="tel"
                      placeholder={t("PHONE_PLACEHOLDER")}
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-foreground">
                    {t("EMAIL")} <span className="text-destructive">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    placeholder={t("EMAIL_PLACEHOLDER")}
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-foreground">
                      {t("SERVICE")} <span className="text-destructive">*</span>
                    </label>
                    <select
                      required
                      value={form.service}
                      onChange={(e) => set("service", e.target.value)}
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="" disabled>{t("SERVICE_PLACEHOLDER")}</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-foreground">{t("DATE")}</label>
                    <input
                      type="date"
                      value={form.date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => set("date", e.target.value)}
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-foreground">{t("MESSAGE")}</label>
                  <textarea
                    rows={3}
                    placeholder={t("MESSAGE_PLACEHOLDER")}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>
              </div>

              <DialogFooter className="mt-4" showCloseButton>
                <Button type="submit" className="w-full sm:w-auto">{t("SUBMIT")}</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
