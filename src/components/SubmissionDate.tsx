'use client'
import React from 'react'

const SubmissionDate = ({timestamp} : {timestamp : string}) => {
    function formatTimestamp(timestamp: string): string {
    const parsedTimestamp: number = parseInt(timestamp, 10);
    if (isNaN(parsedTimestamp)) {
      return "Invalid timestamp";
    }

    const now: number = Math.floor(Date.now() / 1000);

    const difference: number = now - parsedTimestamp;

    if (difference < 60) {
      return "just now";
    } else if (difference < 3600) {
      // Less than 1 hour
      const minutes: number = Math.floor(difference / 60);
      return `${minutes}m ago`;
    } else if (difference < 86400) {
      // Less than 1 day
      const hours: number = Math.floor(difference / 3600);
      return `${hours}h ago`;
    } else {
      // 1 day or more
      const days: number = Math.floor(difference / 86400);
      return days === 1 ? "1 day ago" : `${days} days ago`;
    }
  }
  return (
    <p className="text-xs text-muted-foreground pl-2 pt-1 truncate max-w-[80px] sm:max-w-[100px]">
        {formatTimestamp(timestamp)}
      </p>
  )
}

export default SubmissionDate