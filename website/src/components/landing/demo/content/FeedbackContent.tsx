"use client";

import { useState } from "react";
import { pill, label, heading } from "../styles";

export function FeedbackContent({ onClose }: { onClose: () => void }) {
	const [feedback, setFeedback] = useState("");

	return (
		<div style={{ padding: "1.5rem 1.75rem 1.75rem" }}>
			<div style={pill} />
			<div style={label}>Feedback</div>
			<div style={{ ...heading, marginBottom: "0.5rem" }}>Send us your thoughts</div>
			<p style={{ fontSize: "0.8125rem", color: "var(--foreground-muted)", marginBottom: "1rem", lineHeight: 1.5 }}>
				We&apos;d love to hear what you think.
			</p>
			<textarea
				value={feedback}
				onChange={(e) => setFeedback(e.target.value)}
				placeholder="Tell us what's on your mind..."
				style={{
					width: "100%",
					minHeight: 100,
					padding: "0.875rem 1rem",
					borderRadius: "0.75rem",
					border: "1px solid color-mix(in oklch, var(--glass-border) 50%, transparent)",
					background: "color-mix(in oklch, var(--glass-surface) 55%, transparent)",
					fontSize: "0.875rem",
					fontFamily: "inherit",
					color: "var(--foreground)",
					resize: "vertical",
					outline: "none",
					marginBottom: "1rem",
				}}
			/>
			<div style={{ display: "flex", gap: "0.5rem" }}>
				<button
					onClick={onClose}
					style={{
						flex: 1,
						padding: "0.75rem 1rem",
						borderRadius: "0.75rem",
						border: "1px solid color-mix(in oklch, var(--glass-border) 50%, transparent)",
						background: "transparent",
						fontSize: "0.875rem",
						fontWeight: 500,
						color: "var(--foreground-muted)",
						cursor: "pointer",
						fontFamily: "inherit",
					}}
				>
					Cancel
				</button>
				<button
					onClick={onClose}
					style={{
						flex: 1,
						padding: "0.75rem 1rem",
						borderRadius: "0.75rem",
						border: "none",
						background: "linear-gradient(135deg, var(--color-atmos-purple), var(--color-atmos-blue))",
						color: "white",
						fontWeight: 600,
						fontSize: "0.875rem",
						cursor: "pointer",
						fontFamily: "inherit",
					}}
				>
					Send feedback
				</button>
			</div>
		</div>
	);
}
