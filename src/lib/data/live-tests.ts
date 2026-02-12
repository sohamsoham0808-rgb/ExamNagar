export const LIVE_SESSIONS = [
    {
        id: "live-1",
        title: "SSC CGL 2026: Algebra & Geometry Marathon",
        instructor: "Gagan Pratap",
        instructorImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&q=80",
        subject: "Maths",
        startTime: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // Started 15 mins ago
        attendees: "25k+",
        viewerCount: "12,450",
        thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
        isLive: true,
        videoId: "jfKfPfyJRdk",
        tags: ["Most Popular", "Live Doubts"],
        description: "Complete revision of Algebra and Geometry with previous year questions and short tricks."
    },
    {
        id: "live-2",
        title: "DSSSB 2026: General English 100 Most Expected Qs",
        instructor: "Meenakshi Madam",
        instructorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80",
        subject: "English",
        startTime: new Date(Date.now() + 1000 * 60 * 45).toISOString(), // 45 mins from now
        attendees: "15k+",
        viewerCount: "0",
        thumbnail: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
        isLive: false,
        tags: ["New Batch", "Free"],
        description: "Join Meenakshi Madam for a intensive session on DSSSB General English. Covering all vital topics."
    },
    {
        id: "live-3",
        title: "UPSC: Weekly Current Affairs (Feb 1st-7th)",
        instructor: "Ankit Awasthi",
        instructorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&q=80",
        subject: "Current Affairs",
        startTime: new Date(Date.now() + 1000 * 60 * 180).toISOString(), // 3 hours from now
        attendees: "40k+",
        viewerCount: "0",
        thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
        isLive: false,
        tags: ["Important", "In Depth"],
        description: "Stay updated with the latest national and international news. Essential for UPSC and State PCS."
    },
    {
        id: "live-4",
        title: "Foundation Physics: Newton's Laws of Motion",
        instructor: "Alakh Sir",
        instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&q=80",
        subject: "Physics",
        startTime: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // Ended 2 hours ago
        attendees: "100k+",
        viewerCount: "0",
        thumbnail: "https://images.unsplash.com/photo-1636466483764-180b84ecb510?w=800&q=80",
        isLive: false,
        isEnded: true,
        tags: ["Recorded", "Concept Clear"],
        description: "Master the fundamentals of Physics with this detailed session on Newton's Laws."
    }
];

export const MOCK_TESTS = [
    {
        id: "test-1",
        title: "SSC CGL 2026: Tier-1 All India Mock 45",
        questions: 100,
        duration: "60 mins",
        difficulty: "Hard",
        attempts: "120k+",
        type: "All India Mock",
    },
    {
        id: "test-2",
        title: "DSSSB TGT/PGT: Section A General Paper Mock",
        questions: 100,
        duration: "120 mins",
        difficulty: "Medium",
        attempts: "85k+",
        type: "Weekly Practice",
    },
    {
        id: "test-3",
        title: "UPPSC Prelims: GS Paper 1 Full Length Mock",
        questions: 150,
        duration: "120 mins",
        difficulty: "Very Hard",
        attempts: "65k+",
        type: "Sectional Test",
    }
];
