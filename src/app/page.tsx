import Link from "next/link"
import { ArrowRight, Play, Users, Star, GraduationCap, BookOpen, Trophy, Zap, Clock, BookText, Keyboard, FileText, Bell, Gem, Book as BookIcon, CheckCircle2, Sparkles, Target, TrendingUp, Heart } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { CourseCard } from "@/components/ui/CourseCard"
import { TOP_COURSES } from "@/lib/data/courses"
import { Section } from "@/components/layout/Section"
import { Badge } from "@/components/ui/Badge"
import { HomeHeroSlider } from "@/components/home/HomeHeroSlider"
import { SectionSlider } from "@/components/ui/SectionSlider"

export default function Home() {
  const resourceSections = [
    { title: "Premium Batches", icon: <Gem className="text-primary" />, desc: "Complete courses by top educators", href: "/courses?filter=paid", color: "from-primary/10 to-violet-50" },
    { title: "Free Learning", icon: <Play className="text-emerald-500" />, desc: "Start learning at zero cost", href: "/courses?filter=free", color: "from-emerald-500/10 to-emerald-50" },
    { title: "Study Material", icon: <BookIcon className="text-blue-500" />, desc: "Books & notes for every exam", href: "/books", color: "from-blue-500/10 to-blue-50" },
    { title: "Free Mocks", icon: <Trophy className="text-amber-500" />, desc: "Daily practice tests for you", href: "/tests?filter=free", color: "from-amber-500/10 to-amber-50" },
    { title: "Test Series", icon: <Zap className="text-primary" />, desc: "Smart analytics & feedback", href: "/tests?filter=paid", color: "from-primary/10 to-violet-50" },
    { title: "PYQ Archive", icon: <FileText className="text-rose-500" />, desc: "Solved previous year papers", href: "/pyq", color: "from-rose-500/10 to-rose-50" },
  ];

  return (
    <div className="flex flex-col bg-slate-50">
      {/* Professional Hero Slider */}
      <HomeHeroSlider />


      {/* Resources Slider */}
      <Section className="py-24 overflow-hidden">
        <SectionSlider
          title="Explore Ecosystem"
          subtitle="Everything you need to crack your exam"
          className="max-w-7xl mx-auto"
        >
          {resourceSections.map((res, i) => (
            <Link key={i} href={res.href} className="group block bg-white p-8 rounded-[2.5rem] border border-slate-200/50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-500 shadow-sm">
                  {res.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2 font-outfit group-hover:text-primary transition-colors uppercase tracking-tight">{res.title}</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed font-medium">{res.desc}</p>
                <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500">
                  Join Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </SectionSlider>
      </Section>

      {/* Course Highlights */}
      <Section className="bg-slate-900 py-32 rounded-[4rem] mx-4 overflow-hidden relative">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <SectionSlider
            title="Popular Batches"
            subtitle="Top Rated Live Courses by industry experts"
            className="text-white"
          >
            {TOP_COURSES.map((course) => (
              <div key={course.id} className="transform hover:scale-[1.05] transition-all duration-500 h-full">
                <CourseCard course={course} />
              </div>
            ))}
          </SectionSlider>

          <div className="mt-12 text-center lg:text-right">
            <Link href="/courses">
              <Button variant="outline" className="h-14 px-10 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] border-white/10 text-white hover:bg-white/10 backdrop-blur-sm transition-all">
                View Full Catalog
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-32 text-center">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 leading-[1.1] uppercase tracking-tighter">
            Your dream job <br />is <span className="gradient-text italic font-black">one step away</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-md mx-auto font-bold uppercase tracking-wide leading-relaxed">
            Begin your preparation for free — no credit card required. Instant access to trial classes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/signup">
              <Button size="lg" className="h-16 px-12 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/30 active:scale-95 transition-all">
                Create Free Account <ArrowRight className="ml-3" size={20} />
              </Button>
            </Link>
            <Link href="/courses">
              <Button size="lg" variant="outline" className="h-16 px-12 rounded-[2rem] font-black text-xs uppercase tracking-widest border-slate-200 text-slate-900 active:scale-95 transition-all">
                Browse Full List
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  )
}
