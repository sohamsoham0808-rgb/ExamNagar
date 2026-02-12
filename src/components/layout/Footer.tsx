import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { CoursesIcon } from "@/components/icons"

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary p-1.5 rounded-lg">
                                <CoursesIcon className="text-white" size={20} />
                            </div>
                            <span className="text-xl font-bold text-white font-outfit">ExamNagar</span>
                        </div>
                        <p className="text-sm leading-relaxed">
                            Empowering millions of students to achieve their dreams with quality education anywhere, anytime.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></Link>
                            <Link href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></Link>
                            <Link href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></Link>
                            <Link href="#" className="hover:text-primary transition-colors"><Youtube size={20} /></Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-4 font-outfit">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/courses" className="hover:text-primary transition-colors">All Courses</Link></li>
                            <li><Link href="/live-classes" className="hover:text-primary transition-colors">Live Sessions</Link></li>
                            <li><Link href="/tests" className="hover:text-primary transition-colors">Mock Tests</Link></li>
                            <li><Link href="/teachers" className="hover:text-primary transition-colors">Our Teachers</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-bold mb-4 font-outfit">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Refer & Earn</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Scholarship</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact Support</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">App Download</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold mb-4 font-outfit">Contact Us</h4>
                        <div className="flex gap-3 text-sm">
                            <Mail className="shrink-0 text-primary" size={18} />
                            <span>support@examnagar.in</span>
                        </div>
                        <div className="flex gap-3 text-sm">
                            <Phone className="shrink-0 text-primary" size={18} />
                            <span>+91 1800 123 4567</span>
                        </div>
                        <div className="flex gap-3 text-sm">
                            <MapPin className="shrink-0 text-primary" size={18} />
                            <span>Knowledge Hub, Sector 62, Noida, India</span>
                        </div>
                    </div>
                </div>

                <hr className="my-10 border-slate-800" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>© 2026 ExamNagar Technologies Pvt Ltd. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
