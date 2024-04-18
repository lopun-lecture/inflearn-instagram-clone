"use client";

export default function Spacer({ height }: { height: number }) {
  return <div style={{ height: `${height * 0.25}rem` }} />;
}
