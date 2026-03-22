"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { postConsultation, type IConsultationRequest } from "@/lib/service-psychologist";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PHONE_NUMBER, EMAIL } from "@/lib/constants";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

// ─── Validation — mirrors C# CreateConsultationCommandValidator ───────────────

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim()) errors.name = "Name is required.";
  else if (form.name.length > 255)
    errors.name = "Name must be less than 255 characters.";

  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Please enter a valid email address.";
  else if (form.email.length > 255)
    errors.email = "Email must be less than 255 characters.";

  if (!form.phone.trim()) errors.phone = "Phone number is required.";
  else if (form.phone.length > 255)
    errors.phone = "Phone number must be less than 255 characters.";

  if (!form.message.trim()) errors.message = "Message is required.";
  else if (form.message.length > 1000)
    errors.message = "Message must be less than 1000 characters.";

  return errors;
}

const INITIAL_FORM: FormState = { name: "", email: "", phone: "", message: "" };

// ─── API ──────────────────────────────────────────────────────────────────────

async function submitConsultation(payload: IConsultationRequest): Promise<void> {
  await postConsultation(payload);
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function EmailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="2" y="5" width="16" height="12" rx="2" />
      <path d="M2 7l8 5 8-5" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M4 3h3.5l1.5 4-2 1.5a10 10 0 004.5 4.5L13 11l4 1.5V16a1 1 0 01-1 1C7.163 17 3 12.837 3 4a1 1 0 011-1z" />
    </svg>
  );
}

const CONTACT_INFO = [
  { id: "email", label: EMAIL, Icon: EmailIcon },
  { id: "phone", label: PHONE_NUMBER, Icon: PhoneIcon },
] as const;

// ─── Shared input class ───────────────────────────────────────────────────────

const inputBase =
  "w-full rounded-[10px] border border-border bg-background px-[13px] py-[11px] md:px-[15px] md:py-[13px] text-sm text-foreground placeholder:text-muted-foreground transition-[border-color,box-shadow] focus:outline-none focus:border-subject focus:ring-[3px] focus:ring-subject/20 disabled:opacity-60";

// ─── Component ────────────────────────────────────────────────────────────────

export default function BookConsultation() {
  const t = useTranslations("BOOK_CONSULTATION");

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: submitConsultation,
    onSuccess: () => {
      setTimeout(() => {
        setForm(INITIAL_FORM);
        setErrors({});
        reset();
      }, 3000);
    },
  });

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    mutate({
      name: form.name,
      email: form.email,
      phoneNumber: form.phone,
      message: form.message,
    });
  }

  const btnLabel = isPending
    ? t("SUBMITTING")
    : isSuccess
      ? t("SUCCESS")
      : t("SUBMIT");

  return (
    <section
      id="book-consultation"
      className="bg-secondary/40 rounded-2xl md:rounded-[20px] px-5 py-6 sm:px-7 sm:py-8 md:px-[52px] md:py-14 grid grid-cols-1 md:grid-cols-[1fr_1.05fr] gap-6 sm:gap-7 md:gap-12 items-center max-w-[1100px] mx-auto"
    >
      {/* ── Left column ───────────────────────────────────────────────────── */}
      <div>
        {/* Eyebrow */}
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-2 md:mb-4">
          {t("HEADER")}
        </p>

        {/* Heading */}
        <h2 className="font-heading font-normal text-[26px] sm:text-[30px] md:text-[40px] leading-[1.18] text-foreground mb-3 md:mb-[18px]">
          {t("MAIN")}
        </h2>

        {/* Description */}
        <p className="text-[13.5px] md:text-[14.5px] text-muted-foreground leading-[1.7] mb-4 md:mb-7 max-w-[380px]">
          {t("DESCRIPTION")}
        </p>

        {/* Divider */}
        <hr className="border-border mb-4 md:mb-6" />

        {/* Contact info list */}
        <ul className="space-y-3 md:space-y-[14px] mb-4 md:mb-7 list-none p-0">
          {CONTACT_INFO.map(({ id, label, Icon }) => (
            <li
              key={id}
              className="flex items-center gap-[10px] text-[13px] md:text-[14px] text-foreground"
            >
              <span className="text-muted-foreground shrink-0">
                <Icon />
              </span>
              {label}
            </li>
          ))}
        </ul>

      </div>

      {/* ── Right card ────────────────────────────────────────────────────── */}
      <div className="bg-background rounded-xl md:rounded-2xl px-4 py-5 sm:px-6 sm:py-7 md:px-8 md:py-9 shadow-[0_2px_24px_rgb(0_0_0/7%)]">
        <h3 className="font-heading font-normal text-xl md:text-[26px] text-foreground text-center mb-5 md:mb-[26px]">
          {t("CARD_TITLE")}
        </h3>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-3 md:gap-[13px]"
        >
          {/* Name */}
          <div>
            <input
              name="name"
              type="text"
              placeholder={t("NAME_INPUT")}
              value={form.name}
              onChange={handleInputChange}
              required
              disabled={isPending}
              autoComplete="name"
              className={cn(
                inputBase,
                errors.name && "border-destructive focus:border-destructive focus:ring-destructive/20"
              )}
            />
            {errors.name && (
              <p className="text-xs text-destructive mt-1 ml-0.5">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              name="email"
              type="email"
              placeholder={t("EMAIL_INPUT")}
              value={form.email}
              onChange={handleInputChange}
              disabled={isPending}
              autoComplete="email"
              className={cn(
                inputBase,
                errors.email && "border-destructive focus:border-destructive focus:ring-destructive/20"
              )}
            />
            {errors.email && (
              <p className="text-xs text-destructive mt-1 ml-0.5">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              name="phone"
              type="tel"
              placeholder={t("PHONE_INPUT")}
              value={form.phone}
              onChange={handleInputChange}
              disabled={isPending}
              autoComplete="tel"
              className={cn(
                inputBase,
                errors.phone && "border-destructive focus:border-destructive focus:ring-destructive/20"
              )}
            />
            {errors.phone && (
              <p className="text-xs text-destructive mt-1 ml-0.5">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <textarea
              name="message"
              placeholder={t("MESSAGE_INPUT")}
              value={form.message}
              onChange={handleInputChange}
              disabled={isPending}
              rows={3}
              className={cn(
                inputBase,
                "min-h-[80px] md:min-h-[96px] resize-y",
                errors.message && "border-destructive focus:border-destructive focus:ring-destructive/20"
              )}
            />
            {errors.message && (
              <p className="text-xs text-destructive mt-1 ml-0.5">
                {errors.message}
              </p>
            )}
          </div>

          {/* API error */}
          {isError && (
            <p className="text-[13px] text-destructive leading-snug">
              {(error as Error)?.message ?? t("ERROR")}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending || isSuccess}
            className={cn(
              "w-full py-[11px] md:py-[14px] h-auto rounded-[10px] text-sm md:text-[15px] font-semibold transition-all duration-200 active:scale-[0.985]",
              isSuccess && "bg-success text-success-foreground hover:bg-success"
            )}
          >
            {btnLabel}
          </Button>
        </form>
      </div>
    </section>
  );
}
