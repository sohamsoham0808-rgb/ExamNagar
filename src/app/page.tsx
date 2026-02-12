import Link from "next/link"
import { ArrowRight, Play, Users, Star, GraduationCap, BookOpen, Clock, ShieldCheck, Library, Zap, Globe } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { CourseCard } from "@/components/ui/CourseCard"
import { TOP_COURSES } from "@/lib/data/courses"
import { HomeHeroSlider } from "@/components/home/HomeHeroSlider"
import { SectionSlider } from "@/components/ui/SectionSlider"

export default function Home() {
  const categories = [
    { name: "JEE / NEET", icon: <GraduationCap size={32} />, count: "120+ Courses", href: "/courses?cat=jee-neet" },
    { name: "SSC / Banking", icon: <ShieldCheck size={32} />, count: "250+ Courses", href: "/courses?cat=ssc-banking" },
    { name: "UPSC / PSC", icon: <Library size={32} />, count: "80+ Courses", href: "/courses?cat=upsc-psc" },
    { name: "School (6-12)", icon: <BookOpen size={32} />, count: "300+ Courses", href: "/courses?cat=school" },
    { name: "Skill Dev", icon: <Zap size={32} />, count: "150+ Courses", href: "/courses?cat=skills" },
    { name: "Language", icon: <Globe size={32} />, count: "50+ Courses", href: "/courses?cat=language" },
  ];

  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <HomeHeroSlider />

      {/* Course Categories */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Top Exam Categories</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Choose your goal and start learning from India's top educators specialized in these domains.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat, i) => (
              <Link key={i} href={cat.href} className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-primary hover:shadow-xl transition-all text-center">
                <div className="w-16 h-16 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-primary group-hover:text-white transition-all">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{cat.name}</h3>
                <p className="text-[10px] font-medium text-slate-400">{cat.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Slider */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionSlider
            title="Featured Courses"
            subtitle="Most loved courses by students across India"
            className="text-slate-900"
          >
            {TOP_COURSES.map((course) => (
              <div key={course.id} className="h-full px-2">
                <CourseCard course={course} />
              </div>
            ))}
          </SectionSlider>
        </div>
      </section>

      {/* Live Classes Section */}
      <section className="py-24 bg-slate-900 text-white rounded-[3rem] mx-4 overflow-hidden relative">
        <div className="container mx-auto px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                Live Now
              </div>
              <h2 className="text-3xl md:text-5xl font-bold">Interactive Live Sessions</h2>
              <p className="text-slate-400 max-w-xl">Join thousands of students in real-time. Ask doubts, participate in polls, and learn actively.</p>
            </div>
            <Link href="/live-classes">
              <Button variant="outline" className="h-12 border-white/20 text-white hover:bg-white/10 font-bold">View All Live Classes</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mock Live Cards */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all">
                <div className="relative aspect-video">
                  <img src={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80&v=${i}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">LIVE</div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                      <Play fill="white" size={20} className="ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">Mastering Mathematics: Geometry {i}</h3>
                  <div className="flex items-center gap-3 text-slate-400 text-xs">
                    <img src={`https://ui-avatars.com/api/?name=Instructor+${i}&background=random`} className="w-6 h-6 rounded-full" />
                    <span>Prof. Rajesh Kumar</span>
                    <span className="ml-auto flex items-center gap-1 text-slate-500"><Users size={12} /> {(1200 * i).toLocaleString()} watching</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Stats */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">Start Your Preparation <br /><span className="text-primary italic">Today</span></h2>
            <p className="text-slate-600 text-lg mb-12">Join over 1 million aspirants who are already ahead of their game. Success doesn't wait, neither should you.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="h-16 px-12 rounded-xl text-md font-bold shadow-2xl shadow-primary/20">Create Free Account</Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" variant="outline" className="h-16 px-12 rounded-xl text-md font-bold">Explore All Courses</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
