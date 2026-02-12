import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/Card"

interface StatsCardProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: {
        value: string;
        isUp: boolean;
    };
    className?: string;
}

export function StatsCard({ label, value, icon, trend, className }: StatsCardProps) {
    return (
        <Card className={cn("border-none shadow-sm hover:shadow-md transition-all", className)}>
            <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{label}</p>
                    <div className="flex items-center gap-3">
                        <h3 className="text-3xl font-bold font-outfit">{value}</h3>
                        {trend && (
                            <span className={cn(
                                "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                                trend.isUp ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
                            )}>
                                {trend.isUp ? '+' : '-'}{trend.value}
                            </span>
                        )}
                    </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl text-primary">
                    {icon}
                </div>
            </CardContent>
        </Card>
    )
}
