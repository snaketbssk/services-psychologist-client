"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import BookConsultation from "@/components/BookConsultation";

interface Props {
  trigger: React.ReactElement;
}

export default function BookConsultationDialog({ trigger }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent
        showCloseButton
        className="w-[calc(100vw-2rem)] max-w-5xl sm:max-w-5xl p-0 overflow-hidden rounded-[20px]
          duration-300
          data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-open:slide-in-from-bottom-6
          data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:slide-out-to-bottom-4"
      >
        <BookConsultation />
      </DialogContent>
    </Dialog>
  );
}
