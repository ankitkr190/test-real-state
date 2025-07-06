import { Toaster as Sonner, ToastT } from "sonner";
import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { cn } from "@/lib/utils";

/**
 * Position options for the toast notification
 */
export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

/**
 * Theme options for the toast notification
 */
export type ToastTheme = "light" | "dark" | "system";

/**
 * Props for the Toaster component
 * @interface ToasterProps
 */
export interface ToasterProps {
  /** Position of the toast notification */
  position?: ToastPosition;
  /** Whether to use rich colors for the toast */
  richColors?: boolean;
  /** Theme of the toast notification */
  theme?: ToastTheme;
  /** Duration of the toast in milliseconds */
  duration?: number;
  /** Whether to show the close button */
  closeButton?: boolean;
  /** Custom class name for the toast container */
  className?: string;
  /** Maximum number of toasts to show at once */
  maxToasts?: number;
  /** Whether to expand the toast on hover */
  expand?: boolean;
  /** Custom animation duration in milliseconds */
  animationDuration?: number;
}

/**
 * Default values for the Toaster component
 */
const DEFAULT_PROPS: Partial<ToasterProps> = {
  position: "bottom-right",
  theme: "system",
  duration: 4000,
  closeButton: true,
  maxToasts: 3,
  expand: true,
  animationDuration: 300,
};

/**
 * Toaster component for displaying toast notifications
 * @component
 * @param {ToasterProps} props - The props for the Toaster component
 * @returns {ReactElement | null} The Toaster component or null during hydration
 */
export function Toaster({
  position = DEFAULT_PROPS.position,
  richColors,
  theme = DEFAULT_PROPS.theme,
  duration = DEFAULT_PROPS.duration,
  closeButton = DEFAULT_PROPS.closeButton,
  className = "",
  // maxToasts = DEFAULT_PROPS.maxToasts,
  expand = DEFAULT_PROPS.expand,
  animationDuration = DEFAULT_PROPS.animationDuration,
}: ToasterProps): ReactElement | null {
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Sonner
      className={cn(
        "toaster group",
        "fixed z-50 flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className
      )}
      toastOptions={{
        classNames: {
          toast: cn(
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground",
            "group-[.toaster]:border-border group-[.toaster]:shadow-lg",
            "group-[.toaster]:rounded-lg group-[.toaster]:p-4",
            "group-[.toaster]:transition-all group-[.toaster]:duration-300",
            "group-[.toaster]:ease-in-out group-[.toaster]:transform",
            "group-[.toaster]:hover:scale-[1.02] group-[.toaster]:hover:shadow-xl",
            "group-[.toaster]:backdrop-blur-sm group-[.toaster]:bg-opacity-90",
            "group-[.toaster]:border group-[.toaster]:border-border/50",
            "group-[.toaster]:data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
            "group-[.toaster]:data-[swipe=cancel]:translate-x-0",
            "group-[.toaster]:data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
            "group-[.toaster]:data-[state=open]:animate-in group-[.toaster]:data-[state=closed]:animate-out",
            "group-[.toaster]:data-[swipe=end]:animate-out",
            "group-[.toaster]:data-[state=closed]:fade-out-80",
            "group-[.toaster]:data-[state=open]:slide-in-from-bottom-full",
            "group-[.toaster]:data-[state=closed]:slide-out-to-right-full",
            "group-[.toaster]:data-[state=open]:sm:slide-in-from-bottom-full",
            "group-[.toaster]:data-[state=closed]:sm:slide-out-to-right-full",
            "group-[.toaster]:relative group-[.toaster]:overflow-hidden",
            "group-[.toaster]:after:absolute group-[.toaster]:after:bottom-0 group-[.toaster]:after:left-0",
            "group-[.toaster]:after:h-1 group-[.toaster]:after:w-full",
            "group-[.toaster]:after:bg-primary/20 group-[.toaster]:after:rounded-b-lg",
            "group-[.toaster]:after:transition-all group-[.toaster]:after:duration-300",
            "group-[.toaster]:after:ease-in-out"
          ),
          title: cn(
            "group-[.toast]:text-base group-[.toast]:font-semibold",
            "group-[.toast]:tracking-tight group-[.toast]:leading-tight"
          ),
          description: cn(
            "group-[.toast]:text-sm group-[.toast]:text-muted-foreground",
            "group-[.toast]:leading-normal group-[.toast]:mt-1"
          ),
          actionButton: cn(
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
            "group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-2",
            "group-[.toast]:text-sm group-[.toast]:font-medium",
            "group-[.toast]:transition-colors group-[.toast]:duration-200",
            "group-[.toast]:hover:bg-primary/90 group-[.toast]:focus:outline-none",
            "group-[.toast]:focus:ring-2 group-[.toast]:focus:ring-primary/50"
          ),
          cancelButton: cn(
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
            "group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-2",
            "group-[.toast]:text-sm group-[.toast]:font-medium",
            "group-[.toast]:transition-colors group-[.toast]:duration-200",
            "group-[.toast]:hover:bg-muted/80 group-[.toast]:focus:outline-none",
            "group-[.toast]:focus:ring-2 group-[.toast]:focus:ring-muted/50"
          ),
          closeButton: cn(
            "group-[.toast]:absolute group-[.toast]:right-2 group-[.toast]:top-2",
            "group-[.toast]:rounded-md group-[.toast]:p-1",
            "group-[.toast]:text-foreground/50 group-[.toast]:opacity-0",
            "group-[.toast]:transition-opacity group-[.toast]:duration-200",
            "group-[.toast]:hover:text-foreground group-[.toast]:hover:opacity-100",
            "group-[.toast]:focus:opacity-100 group-[.toast]:focus:outline-none",
            "group-[.toast]:focus:ring-2 group-[.toast]:ring-offset-2",
            "group-[.toast]:ring-ring group-[.toast]:ring-offset-background"
          ),
        },
        duration,
        closeButton,
      }}
      position={position}
      richColors={richColors}
      theme={theme}
      expand={expand}
      aria-label="Notifications"
      style={
        {
          "--toast-duration": `${duration}ms`,
          "--toast-animation-duration": `${animationDuration}ms`,
        } as React.CSSProperties
      }
    />
  );
}

// Export toast types for external use
export type { ToastT };
