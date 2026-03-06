"use client";

import { useRef, useState } from "react";
import { Sheet, SheetRef } from "react-edge-sheet";
import {
	floatStyle,
	useIsMobile,
	DemoCard,
	BottomContent,
	TopContent,
	LeftContent,
	RightContent,
	FilterContent,
	ShareContent,
	CartContent,
	GlassContent,
	NotificationsContent,
	FeedbackContent,
	PlayerQueueContent,
	DynamicContent,
	DynamicFAQContent,
	DynamicNotesContent,
	ControlledContent,
} from "./demo";

const DEMO_CARDS = [
	{ refKey: "bottom", icon: "↑", title: "Bottom Sheet", sub: "Action menu", accent: "var(--color-atmos-purple)" },
	{ refKey: "top", icon: "↓", title: "Top Sheet", sub: "Command palette", accent: "var(--color-atmos-blue)" },
	{ refKey: "left", icon: "◀", title: "Left Drawer", sub: "Navigation", accent: "var(--color-atmos-indigo)" },
	{ refKey: "right", icon: "▶", title: "Right Panel", sub: "Settings", accent: "oklch(60% 0.18 200)" },
	{ refKey: "filter", icon: "⊞", title: "Filters", sub: "Refine results", accent: "oklch(58% 0.20 200)" },
	{ refKey: "share", icon: "↗", title: "Share", sub: "Share options", accent: "oklch(62% 0.20 145)" },
	{ refKey: "cart", icon: "⊞", title: "Cart", sub: "Mini cart", accent: "oklch(60% 0.22 25)" },
	{ refKey: "notifications", icon: "◉", title: "Notifications", sub: "Top-right", accent: "oklch(62% 0.18 45)" },
	{ refKey: "feedback", icon: "◎", title: "Feedback", sub: "Bottom-right", accent: "oklch(58% 0.20 200)" },
	{ refKey: "queue", icon: "♫", title: "Queue", sub: "Playlist", accent: "oklch(65% 0.22 290)" },
	{ refKey: "glass", icon: "◇", title: "Glass", sub: "Now playing", accent: "oklch(65% 0.22 290)" },
	{ refKey: "dynamic", icon: "☑", title: "Task List", sub: "Add/remove items", accent: "oklch(60% 0.22 145)" },
	{ refKey: "dynamicFaq", icon: "?", title: "FAQ", sub: "Expand to resize", accent: "oklch(58% 0.20 280)" },
	{ refKey: "dynamicNotes", icon: "✎", title: "Quick Notes", sub: "Notes grow sheet", accent: "oklch(62% 0.20 85)" },
	{ refKey: "controlled", icon: "⊙", title: "Controlled", sub: "open + onOpenChange", accent: "oklch(62% 0.22 275)" },
] as const;

export function LiveDemo() {
	const isMobile = useIsMobile();

	const bottomRef = useRef<SheetRef>(null);
	const topRef = useRef<SheetRef>(null);
	const leftRef = useRef<SheetRef>(null);
	const rightRef = useRef<SheetRef>(null);
	const filterRef = useRef<SheetRef>(null);
	const shareRef = useRef<SheetRef>(null);
	const cartRef = useRef<SheetRef>(null);
	const notificationsRef = useRef<SheetRef>(null);
	const feedbackRef = useRef<SheetRef>(null);
	const queueRef = useRef<SheetRef>(null);
	const glassRef = useRef<SheetRef>(null);
	const dynRef = useRef<SheetRef>(null);
	const dynFaqRef = useRef<SheetRef>(null);
	const dynNotesRef = useRef<SheetRef>(null);
	const [controlled, setControlled] = useState(false);

	const openByKey = (key: string) => {
		if (key === "bottom") bottomRef.current?.open();
		else if (key === "top") topRef.current?.open();
		else if (key === "left") leftRef.current?.open();
		else if (key === "right") rightRef.current?.open();
		else if (key === "filter") filterRef.current?.open();
		else if (key === "share") shareRef.current?.open();
		else if (key === "cart") cartRef.current?.open();
		else if (key === "notifications") notificationsRef.current?.open();
		else if (key === "feedback") feedbackRef.current?.open();
		else if (key === "queue") queueRef.current?.open();
		else if (key === "glass") glassRef.current?.open();
		else if (key === "dynamic") dynRef.current?.open();
		else if (key === "dynamicFaq") dynFaqRef.current?.open();
		else if (key === "dynamicNotes") dynNotesRef.current?.open();
		else if (key === "controlled") setControlled(true);
	};

	return (
		<section className="py-20 px-4 sm:px-6">
			<div className="max-w-5xl mx-auto">
				<div className="text-center mb-14">
					<h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)] mb-3">
						Try it live
					</h2>
					<p className="text-[var(--foreground-muted)] text-[0.95rem] max-w-xl mx-auto">
						Real-world UI patterns — floating, rounded, ready to ship.
					</p>
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
					{DEMO_CARDS.map((card, i) => (
						<DemoCard
							key={card.refKey}
							onClick={() => openByKey(card.refKey)}
							icon={card.icon}
							title={card.title}
							sub={card.sub}
							accent={card.accent}
							delay={i * 40}
						/>
					))}
				</div>

				{/* Bottom: Quick Actions — Mobilde tam genişlik edge-to-edge */}
				<Sheet
					ref={bottomRef}
					edge="bottom"
					style={floatStyle(isMobile ? { width: "100%" } : {}, { isMobile, edge: "bottom" })}
					className="mb-0 sm:mb-5"
					maxWidth={isMobile ? "100%" : "500px"}
				>
					<BottomContent onClose={() => bottomRef.current?.close()} />
				</Sheet>

				{/* Top: Command Palette — Mobilde tam genişlik edge-to-edge */}
				<Sheet
					ref={topRef}
					edge="top"
					style={floatStyle(
						isMobile ? { padding: 0, width: "100%" } : { padding: 0 },
						{ isMobile, edge: "top" }
					)}
					maxWidth={isMobile ? "100%" : "500px"}
					className="mt-0 sm:mt-5"
				>
					<TopContent onClose={() => topRef.current?.close()} />
				</Sheet>

				{/* Left: Navigation — Mobilde fullscreen drawer */}
				<Sheet
					ref={leftRef}
					edge="left"
					style={floatStyle(
						isMobile ? { width: "100%", borderRadius: 0 } : { width: 260 }
					)}
				>
					<LeftContent onClose={() => leftRef.current?.close()} />
				</Sheet>

				{/* Right: Settings — Desktop 360px, Mobil tam genişlik */}
				<Sheet
					ref={rightRef}
					edge="right"
					style={floatStyle(isMobile ? { width: "100%" } : { width: 360 })}
					maxHeight="98vh"
					maxWidth={isMobile ? "100%" : "360px"}
					className="mr-0 sm:mr-3 p-4"
				>
					<RightContent onClose={() => rightRef.current?.close()} />
				</Sheet>

				{/* Bottom: Filter */}
				<Sheet
					ref={filterRef}
					edge="bottom"
					style={floatStyle(isMobile ? { width: "100%" } : {}, { isMobile, edge: "bottom" })}
					maxWidth={isMobile ? "100%" : "460px"}
					className="mb-0 sm:mb-5"
				>
					<FilterContent onClose={() => filterRef.current?.close()} />
				</Sheet>

				{/* Bottom: Share */}
				<Sheet
					ref={shareRef}
					edge="bottom"
					style={floatStyle(isMobile ? { width: "100%" } : {}, { isMobile, edge: "bottom" })}
					maxWidth={isMobile ? "100%" : "520px"}
					className="mb-0 sm:mb-5"
				>
					<ShareContent onClose={() => shareRef.current?.close()} />
				</Sheet>

				{/* Right: Cart — Desktop 420px, Mobil tam genişlik */}
				<Sheet
					ref={cartRef}
					edge="right"
					style={floatStyle({
						width: isMobile ? "100%" : 420,
						minWidth: isMobile ? undefined : 380,
					})}
					maxHeight="98vh"
					maxWidth={isMobile ? "100%" : "420px"}
					className="mr-0 sm:mr-3"
				>
					<CartContent onClose={() => cartRef.current?.close()} />
				</Sheet>

				{/* Notifications: Desktop sağ üst 420px, Mobil tam genişlik */}
				<Sheet
					ref={notificationsRef}
					edge="top"
					align={isMobile ? undefined : "end"}
					style={floatStyle(
						isMobile ? { padding: 0, width: "100%" } : { padding: 0 },
						{ isMobile, edge: "top" }
					)}
					maxWidth={isMobile ? "100%" : "420px"}
					className="mt-0 sm:mt-5 mr-0 sm:mr-4"
				>
					<NotificationsContent onClose={() => notificationsRef.current?.close()} />
				</Sheet>

				{/* Feedback: Desktop sağ alt 460px, Mobil tam genişlik */}
				<Sheet
					ref={feedbackRef}
					edge="bottom"
					align={isMobile ? undefined : "end"}
					style={floatStyle(isMobile ? { width: "100%" } : {}, { isMobile, edge: "bottom" })}
					maxWidth={isMobile ? "100%" : "460px"}
					className="mb-0 sm:mb-5 mr-0 sm:mr-4"
				>
					<FeedbackContent onClose={() => feedbackRef.current?.close()} />
				</Sheet>

				{/* Bottom: Player Queue */}
				<Sheet
					ref={queueRef}
					edge="bottom"
					style={floatStyle(isMobile ? { width: "100%" } : {}, { isMobile, edge: "bottom" })}
					maxWidth={isMobile ? "100%" : "420px"}
					className="mb-0 sm:mb-5"
				>
					<PlayerQueueContent onClose={() => queueRef.current?.close()} />
				</Sheet>

				{/* Glass: Now Playing — Mobilde tam genişlik, desktop'ta floating */}
				<Sheet
					ref={glassRef}
					edge="bottom"
					backdropStyle={{
						backdropFilter: "blur(24px)",
						background:
							"linear-gradient(to top, oklch(68% 0.22 290 / 0.2) 0%, oklch(65% 0.20 255 / 0.08) 50%, transparent 100%)",
					}}
					style={{
						...(isMobile && { width: "100%" }),
						borderRadius: isMobile ? "1.25rem 1.25rem 0 0" : "1.25rem",
						background:
							"linear-gradient(145deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.10) 100%)",
						border: "1px solid rgba(255,255,255,0.55)",
						backdropFilter: "blur(32px)",
						WebkitBackdropFilter: "blur(32px)",
						boxShadow:
							"0 32px 80px -16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.6)",
					}}
					maxWidth={isMobile ? "100%" : "720px"}
				>
					<GlassContent onClose={() => glassRef.current?.close()} />
				</Sheet>

				{/* Dynamic Height: Task List */}
				<Sheet
					ref={dynRef}
					edge="bottom"
					animateSize
					style={floatStyle(isMobile ? { width: "100%" } : {}, { isMobile, edge: "bottom" })}
					maxWidth={isMobile ? "100%" : "720px"}
					className="mb-0 sm:mb-4"
				>
					<DynamicContent onClose={() => dynRef.current?.close()} />
				</Sheet>

				{/* Dynamic Height: FAQ Accordion */}
				<Sheet
					ref={dynFaqRef}
					edge="bottom"
					animateSize
					style={floatStyle(isMobile ? { width: "100%" } : {}, { isMobile, edge: "bottom" })}
					maxWidth={isMobile ? "100%" : "480px"}
					className="mb-0 sm:mb-4"
				>
					<DynamicFAQContent onClose={() => dynFaqRef.current?.close()} />
				</Sheet>

				{/* Dynamic Height: Quick Notes */}
				<Sheet
					ref={dynNotesRef}
					edge="bottom"
					animateSize
					style={floatStyle(isMobile ? { width: "100%" } : {}, { isMobile, edge: "bottom" })}
					maxWidth={isMobile ? "100%" : "480px"}
					className="mb-0 sm:mb-4"
				>
					<DynamicNotesContent onClose={() => dynNotesRef.current?.close()} />
				</Sheet>

				{/* Controlled — Desktop orta floating 560px, Mobil tam genişlik */}
				<Sheet
					open={controlled}
					onOpenChange={setControlled}
					edge="bottom"
					style={floatStyle(
						{
							padding: isMobile ? "1.5rem" : "1.5rem 1.5rem 6rem 1.5rem",
							...(isMobile && { width: "100%" }),
						},
						{ isMobile, edge: "bottom" }
					)}
					maxWidth={isMobile ? "100%" : "560px"}
				>
					<ControlledContent onClose={() => setControlled(false)} />
				</Sheet>
			</div>
		</section>
	);
}
