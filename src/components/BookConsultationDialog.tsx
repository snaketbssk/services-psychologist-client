"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import BookConsultation from "@/components/BookConsultation";

interface Props {
  trigger: React.ReactNode;
}

export default function BookConsultationDialog({ trigger }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <span onClick={() => setOpen(true)} className="contents" role="presentation">
        {trigger}
      </span>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton
          className="w-[calc(100vw-2rem)] max-w-5xl sm:max-w-5xl p-0 overflow-hidden rounded-[20px]"
        >
          <BookConsultation />
        </DialogContent>
      </Dialog>
    </>
  );
}
