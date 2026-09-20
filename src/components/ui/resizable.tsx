import { GripVertical } from "lucide-react";
import { Group, Panel, Separator } from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({
  className,
  orientation = "horizontal",
  direction,
  ...props
}: React.ComponentProps<typeof Group> & { direction?: "horizontal" | "vertical" }) => (
  <Group
    orientation={direction || orientation || "horizontal"}
    className={cn(
      "flex h-full w-full data-[orientation=vertical]:flex-col data-[orientation=horizontal]:flex-row",
      className,
    )}
    {...props}
  />
);

const ResizablePanel = Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof Separator> & {
  withHandle?: boolean;
}) => (
  <Separator
    className={cn(
      "relative flex w-3 items-center justify-center bg-transparent cursor-col-resize select-none touch-none",
      "data-[orientation=vertical]:h-3 data-[orientation=vertical]:w-full data-[orientation=vertical]:cursor-row-resize",
      "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-border/60 hover:after:bg-primary/70 transition-colors",
      "data-[orientation=vertical]:after:inset-x-0 data-[orientation=vertical]:after:top-1/2 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:-translate-y-1/2",
      "focus-visible:outline-none",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-20 flex h-7 w-3.5 items-center justify-center rounded-sm border border-border bg-card shadow-xs text-muted-foreground hover:text-foreground">
        <GripVertical className="h-3 w-3" />
      </div>
    )}
  </Separator>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };

