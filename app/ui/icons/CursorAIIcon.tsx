import React from "react";

export function CursorAIIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className ? className + " size-4" : "size-4"}
            fill="#5D5FEF"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="3" y="3" width="18" height="18" rx="4" fill="#5D5FEF" />
            <path d="M8 8L16 12L12 16L8 8Z" fill="#fff" />
        </svg>
    );
}
