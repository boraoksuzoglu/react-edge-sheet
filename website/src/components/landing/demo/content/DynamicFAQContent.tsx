"use client";

import { useState } from "react";
import { pill, label, heading } from "../styles";

const FAQ_ITEMS = [
	{
		q: "What is animateSize?",
		a: "When enabled, the sheet smoothly animates its height or width when the content changes—no jarring jumps.",
	},
	{
		q: "Does it work with any content?",
		a: "Yes. Add items, expand accordions, or toggle sections. The sheet resizes fluidly.",
	},
	{
		q: "What about performance?",
		a: "ResizeObserver tracks content. Animations use CSS transforms for 60fps smoothness.",
	},
];

export function DynamicFAQContent({ onClose }: { onClose: () => void }) {
	const [openId, setOpenId] = useState<number | null>(0);

	return (
		<div style={{ padding: "1.5rem 1.75rem 1.75rem", minWidth: 0, maxWidth: "100%" }}>
			<div style={pill} />
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: "0.25rem",
				}}
			>
				<div style={label}>Dynamic Height</div>
				<span
					style={{
						fontSize: "0.7rem",
						fontWeight: 600,
						color: "var(--color-atmos-purple)",
						background:
							"color-mix(in oklch, var(--color-atmos-purple) 12%, transparent)",
						border: "1px solid color-mix(in oklch, var(--color-atmos-purple) 25%, transparent)",
						padding: "2px 8px",
						borderRadius: 9999,
					}}
				>
					animateSize ✓
				</span>
			</div>
			<div style={{ ...heading, marginBottom: "1.25rem" }}>FAQ</div>
			<p
				style={{
					fontSize: "0.8125rem",
					color: "var(--foreground-muted)",
					marginBottom: "1rem",
					lineHeight: 1.5,
				}}
			>
				Tap a question to expand. The sheet height animates.
			</p>
			<div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
				{FAQ_ITEMS.map((item, i) => {
					const isOpen = openId === i;
					return (
						<div
							key={i}
							style={{
								borderRadius: "0.875rem",
								border: "1px solid color-mix(in oklch, var(--glass-border) 45%, transparent)",
								background: "color-mix(in oklch, var(--glass-surface) 55%, transparent)",
								overflow: "hidden",
							}}
						>
							<button
								onClick={() => setOpenId(isOpen ? null : i)}
								style={{
									width: "100%",
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									gap: "0.75rem",
									padding: "1rem 1.25rem",
									border: "none",
									background: "transparent",
									cursor: "pointer",
									fontFamily: "inherit",
									textAlign: "left",
								}}
							>
								<span
									style={{
										fontSize: "0.9375rem",
										fontWeight: 600,
										color: "var(--foreground)",
									}}
								>
									{item.q}
								</span>
								<span
									style={{
										fontSize: "1rem",
										color: "var(--foreground-muted)",
										transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
										transition: "transform 0.2s",
									}}
								>
									▼
								</span>
							</button>
							{isOpen && (
								<div
									style={{
										padding: "0 1.25rem 1rem",
										fontSize: "0.875rem",
										color: "var(--foreground-muted)",
										lineHeight: 1.6,
										borderTop: "1px solid color-mix(in oklch, var(--glass-border) 35%, transparent)",
									}}
								>
									{item.a}
								</div>
							)}
						</div>
					);
				})}
			</div>
			<button
				onClick={onClose}
				style={{
					marginTop: "1rem",
					padding: "0.5rem 1rem",
					borderRadius: "0.75rem",
					border: "none",
					background: "color-mix(in oklch, var(--glass-border) 50%, transparent)",
					color: "var(--foreground-muted)",
					fontSize: "0.8125rem",
					cursor: "pointer",
					fontFamily: "inherit",
				}}
			>
				Close
			</button>
		</div>
	);
}
