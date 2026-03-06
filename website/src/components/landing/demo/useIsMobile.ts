"use client";

import { useState, useEffect } from "react";

/** Returns true when viewport width < 640px (Tailwind sm breakpoint) */
export function useIsMobile(): boolean {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia("(max-width: 639px)");
		const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
		setIsMobile(mq.matches);
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	return isMobile;
}
