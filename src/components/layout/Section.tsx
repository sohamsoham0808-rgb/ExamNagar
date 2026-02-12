import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    container?: boolean;
}

export function Section({ children, className, container = true, ...props }: SectionProps) {
    return (
        <section className={cn("py-16 md:py-24", className)} {...props}>
            <div className={cn(container && "container mx-auto px-4")}>
                {children}
            </div>
        </section>
    )
}
