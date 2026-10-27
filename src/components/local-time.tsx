"use client";

import { useSyncExternalStore } from "react";

const format = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

function subscribe(onChange: () => void) {
  const timer = setInterval(onChange, 1000);
  return () => clearInterval(timer);
}

// Live clock in Ahmedabad. Renders a placeholder on the server so hydration matches.
export function LocalTime() {
  const time = useSyncExternalStore(
    subscribe,
    () => format.format(new Date()).toUpperCase(),
    () => null,
  );

  return (
    <time suppressHydrationWarning className="tabular-nums">
      {time ?? "--:--:--"}
    </time>
  );
}
