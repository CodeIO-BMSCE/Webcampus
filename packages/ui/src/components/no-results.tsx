// components/no-results.tsx
import { cn } from "@webcampus/ui/lib/utils";
import { Search } from "lucide-react"; // You can switch to AlertCircle, FileQuestion, etc.
import { ReactNode } from "react";

interface NoResultsProps {
  icon?: React.ReactNode;
  children?: ReactNode;
  className?: string;
}

export function NoResults({
  icon = <Search className="text-muted-foreground h-6 w-6" />,
  children = "No results found",
  className,
}: NoResultsProps) {
  return (
    <div
      className={cn(
        "text-muted-foreground flex flex-col items-center justify-center px-4 py-10 text-center",
        className
      )}
    >
      <div className="mb-2">{icon}</div>
      <div className="text-sm">{children}</div>
    </div>
  );
}

{
  /*
  🧠 How to Use
`{data.length === 0 && (
  <NoResults>
    No matching records. Try different filters or keywords.
  </NoResults>
)}`


You can customize the icon too:

`<NoResults icon={<FileQuestion className="h-6 w-6 text-muted-foreground" />}>
  Nothing here yet. Add your first entry.
</NoResults>`

  */
}
