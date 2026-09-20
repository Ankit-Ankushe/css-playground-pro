import { useState } from "react";
import {
  Bug,
  Check,
  Copy,
  ExternalLink,
  Heart,
  Mail,
  X,
} from "lucide-react";

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState("bug"); // "bug" | "contact"
  const [copied, setCopied] = useState(false);

  const email = "ankitankushe@gmail.com";
  const subject =
    feedbackType === "bug"
      ? "CSS Quest Bug Report"
      : "CSS Quest Feedback & Support";

  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
    subject,
  )}`;

  const handleOpen = (type, e) => {
    e.preventDefault();
    setFeedbackType(type);
    setModalOpen(true);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <footer className="mt-14 border-t border-border/60 bg-muted/20 py-6 text-xs text-muted-foreground transition-colors">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
          {/* Copyright & Credit */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-center sm:justify-start sm:text-left">
            <span>Built with</span>
            <Heart className="inline size-3 fill-destructive/80 text-destructive/80" />
            <span>by</span>
            <span className="font-semibold text-foreground">Ankit Ankushe</span>
            <span>© 2026</span>
            <span className="hidden text-border sm:inline">·</span>
            <span className="hidden text-muted-foreground/80 sm:inline">
              50 Interactive CSS Quests
            </span>
          </div>

          {/* Feedback & Support Subtle Links */}
          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              type="button"
              onClick={(e) => handleOpen("bug", e)}
              className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-destructive focus-visible:outline-none"
            >
              <Bug className="size-3.5 opacity-70" />
              <span>Report a Bug</span>
            </button>

            <span className="text-border">|</span>

            <button
              type="button"
              onClick={(e) => handleOpen("contact", e)}
              className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none"
            >
              <Mail className="size-3.5 opacity-70" />
              <span>Contact Me</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Contact & Bug Report Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/45 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Feedback and Support"
            className="animate-pop-in card-soft relative w-full max-w-md p-6 shadow-xl"
          >
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>

            <div className="flex items-center gap-3">
              <span
                className={`grid size-10 place-items-center rounded-xl text-primary-foreground ${
                  feedbackType === "bug" ? "bg-destructive/90" : "gradient-hero"
                }`}
              >
                {feedbackType === "bug" ? (
                  <Bug className="size-5 text-destructive-foreground" />
                ) : (
                  <Mail className="size-5" />
                )}
              </span>
              <div>
                <h3 className="text-base font-bold text-foreground">
                  {feedbackType === "bug" ? "Report an Issue / Bug" : "Contact & Feedback"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Send your thoughts directly to{" "}
                  <span className="font-semibold text-foreground">{email}</span>
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-2.5">
              {/* Option 1: Open in Gmail Web */}
              <a
                href={gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setModalOpen(false)}
                className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/10 p-3 text-sm font-semibold text-primary transition-all hover:bg-primary/20"
              >
                <span className="flex items-center gap-2">
                  <Mail className="size-4" />
                  Compose in Gmail (Browser)
                </span>
                <ExternalLink className="size-4 opacity-70" />
              </a>

              {/* Option 2: Open Default Mail App */}
              <a
                href={mailtoUrl}
                onClick={() => setModalOpen(false)}
                className="flex items-center justify-between rounded-xl border border-border bg-muted/50 p-3 text-sm font-semibold text-foreground transition-all hover:bg-muted"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="size-4" />
                  Open Default Mail App
                </span>
                <span className="text-xs text-muted-foreground">mailto:</span>
              </a>

              {/* Option 3: Copy Email Address */}
              <button
                type="button"
                onClick={handleCopy}
                className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-3 text-sm font-semibold text-foreground transition-all hover:bg-muted"
              >
                <span className="flex items-center gap-2">
                  {copied ? (
                    <Check className="size-4 text-success" />
                  ) : (
                    <Copy className="size-4 text-muted-foreground" />
                  )}
                  <span>{copied ? "Email copied to clipboard!" : `Copy: ${email}`}</span>
                </span>
                <span
                  className={`text-xs font-bold ${
                    copied ? "text-success" : "text-muted-foreground"
                  }`}
                >
                  {copied ? "Copied!" : "Click to Copy"}
                </span>
              </button>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
