import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

export const CoursesIcon = ({ size = 24, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4 19V5C4 3.89543 4.89543 3 6 3H19C19.5523 3 20 3.44772 20 4V18C20 18.5523 19.5523 19 19 19H6C4.89543 19 4 18.1046 4 17V19Z" fill="currentColor" fillOpacity="0.2" />
        <path d="M4 17C4 18.1046 4.89543 19 6 19H19M4 17V5C4 3.89543 4.89543 3 6 3H19V17H6C4.89543 17 4 17.4477 4 18.5V17ZM8 7H15M8 11H15M8 15H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const LiveClassesIcon = ({ size = 24, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.2" />
        <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
);

export const TestsIcon = ({ size = 24, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="4" y="4" width="16" height="16" rx="2" fill="currentColor" fillOpacity="0.2" />
        <path d="M9 11L11 13L15 9M4 6H20M4 18H20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const DoubtsIcon = ({ size = 24, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M21 11.5C21 16.1944 16.9706 20 12 20C10.5187 20 9.12563 19.6601 7.89679 19.0605L3 20L4.5 15.5C3.55182 14.3433 3 12.9806 3 11.5C3 6.80558 7.02944 3 12 3C16.9706 3 21 6.80558 21 11.5Z" fill="currentColor" fillOpacity="0.2" />
        <path d="M12 8V12M12 15H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 11.5C21 16.1944 16.9706 20 12 20C10.5187 20 9.12563 19.6601 7.89679 19.0605L3 20L4.5 15.5C3.55182 14.3433 3 12.9806 3 11.5C3 6.80558 7.02944 3 12 3C16.9706 3 21 6.80558 21 11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const TeachersIcon = ({ size = 24, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 11L20 8L12 5L4 8L12 11Z" fill="currentColor" fillOpacity="0.2" />
        <path d="M12 11L20 8L12 5L4 8L12 11ZM12 11V17M12 17C9.33333 17 4 18.3333 4 21M12 17C14.6667 17 20 18.3333 20 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 8V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const ProgressIcon = ({ size = 24, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4 20L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4" />
        <path d="M4 20C4 20 8 18 12 12C16 6 20 4 20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
        <circle cx="20" cy="4" r="2" fill="currentColor" />
        <path d="M4 20H8M4 20V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const ProfileIcon = ({ size = 24, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="8" r="4" fill="currentColor" fillOpacity="0.2" />
        <path d="M12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8C16 10.2091 14.2091 12 12 12Z" stroke="currentColor" strokeWidth="2" />
        <path d="M4 21C4 17.134 7.13401 14 11 14H13C16.866 14 20 17.134 20 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

export const WalletIcon = ({ size = 24, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="3" y="6" width="18" height="12" rx="2" fill="currentColor" fillOpacity="0.2" />
        <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 14H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
    </svg>
);
