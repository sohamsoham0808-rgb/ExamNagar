export const EXAM_CATEGORIES = [
    {
        label: "SSC",
        exams: [
            "SSC CGL",
            "SSC CHSL",
            "SSC MTS",
            "SSC GD Constable",
            "SSC CPO",
            "SSC JE",
            "SSC Stenographer",
            "SSC Selection Post",
        ],
    },
    {
        label: "Banking",
        exams: [
            "IBPS PO",
            "IBPS Clerk",
            "IBPS SO",
            "IBPS RRB PO",
            "IBPS RRB Clerk",
            "SBI PO",
            "SBI Clerk",
            "SBI SO",
            "RBI Grade B",
            "RBI Assistant",
        ],
    },
    {
        label: "Railway",
        exams: [
            "RRB NTPC",
            "RRB Group D",
            "RRB ALP",
            "RRB JE",
            "RRB Technician",
        ],
    },
    {
        label: "Teaching",
        exams: [
            "CTET",
            "UPTET",
            "REET",
            "HTET",
            "BTET",
            "KVS PRT/TGT/PGT",
            "NVS PRT/TGT/PGT",
        ],
    },
    {
        label: "DSSSB",
        exams: [
            "DSSSB PRT",
            "DSSSB TGT",
            "DSSSB PGT",
            "DSSSB Assistant Teacher",
        ],
    },
    {
        label: "IB",
        exams: [
            "IB ACIO",
            "IB Security Assistant",
        ],
    },
    {
        label: "State Exams",
        exams: [
            "UPPSC",
            "BPSC",
            "MPPSC",
            "RAS",
            "HPSC",
            "UKPSC",
        ],
    },
] as const;

export type ExamCategory = typeof EXAM_CATEGORIES[number];
export type ExamCategoryLabel = ExamCategory["label"];
export type Exam = ExamCategory["exams"][number];

export const ALL_EXAMS = EXAM_CATEGORIES.flatMap((c) => c.exams);
