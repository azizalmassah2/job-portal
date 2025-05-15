'use client';
import React from "react";
import clsx from "clsx";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx("animate-pulse bg-gray-300 dark:bg-gray-700 rounded", className)}
    />
  );
}
