import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'danger' | 'link';
    size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const variants = {
            primary: 'bg-primary text-white hover:bg-primary/90 shadow-sm shadow-primary/20',
            secondary: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/5',
            accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
            ghost: 'hover:bg-muted text-foreground',
            outline: 'border border-input bg-transparent hover:bg-muted text-foreground',
            danger: 'bg-red-500 text-white hover:bg-red-600',
            link: 'text-primary underline-offset-4 hover:underline p-0 h-auto',
        }

        const sizes = {
            sm: 'h-9 px-4 text-xs',
            md: 'h-11 px-6 py-2.5 text-sm',
            lg: 'h-14 px-10 text-base',
            icon: 'h-11 w-11',
        }

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-md font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
