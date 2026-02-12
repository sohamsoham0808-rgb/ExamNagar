import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { CoursesIcon } from "@/components/icons"

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400 py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary p-2 rounded-lg">
                                <CoursesIcon className="text-white" size={24} />
                            </div>
                            <span className="text-2xl font-bold text-white font-display">ExamNagar</span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-xs">
                            India's most trusted learning platform for competitive exams. Quality education at an affordable price.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-primary transition-colors p-2 bg-slate-800 rounded-lg"><Facebook size={20} /></Link>
                            <Link href="#" className="hover:text-primary transition-colors p-2 bg-slate-800 rounded-lg"><Twitter size={20} /></Link>
                            <Link href="#" className="hover:text-primary transition-colors p-2 bg-slate-800 rounded-lg"><Instagram size={20} /></Link>
                            <Link href="#" className="hover:text-primary transition-colors p-2 bg-slate-800 rounded-lg"><Youtube size={20} /></Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 font-display uppercase tracking-wider text-xs">Platform</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/courses" className="hover:text-white transition-colors">Course Catalog</Link></li>
                            <li><Link href="/live-classes" className="hover:text-white transition-colors">Official Live Classes</Link></li>
                            <li><Link href="/tests" className="hover:text-white transition-colors">National Mock Tests</Link></li>
                            <li><Link href="/books" className="hover:text-white transition-colors">Study Resources</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-bold mb-6 font-display uppercase tracking-wider text-xs">Assistance</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="#" className="hover:text-white transition-colors">Student Help Center</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Technical Support</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Scholarship Program</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Refund Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold mb-6 font-display uppercase tracking-wider text-xs">Reach Out</h4>
                        <div className="space-y-4">
                            <div className="flex gap-3 text-sm font-medium">
                                <Mail className="shrink-0 text-primary" size={18} />
                                <span>support@examnagar.in</span>
                            </div>
                            <div className="flex gap-3 text-sm font-medium">
                                <Phone className="shrink-0 text-primary" size={18} />
                                <span>+91 1800 123 4567</span>
                            </div>
                        </div>
                        <div className="pt-4">
                            <Button size="sm" className="w-full font-bold">Contact Support</Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-medium">
                    <p>© 2026 ExamNagar Technologies Pvt Ltd.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
