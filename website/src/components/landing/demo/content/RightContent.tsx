"use client";

import { useState } from "react";
import { heading, label, Divider } from "../styles";

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
	return (
		<button
			onClick={onChange}
			style={{
				width: 40,
				height: 22,
				borderRadius: 9999,
				border: "none",
				cursor: "pointer",
				background: on
					? "linear-gradient(135deg, var(--color-atmos-purple), var(--color-atmos-blue))"
					: "color-mix(in oklch, var(--glass-border) 60%, transparent)",
				position: "relative",
				transition: "background 0.25s",
				flexShrink: 0,
			}}
		>
			<span
				style={{
					position: "absolute",
					top: 3,
					left: on ? 21 : 3,
					width: 16,
					height: 16,
					borderRadius: 9999,
					background: "white",
					transition: "left 0.25s",
					boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
				}}
			/>
		</button>
	);
}

export function RightContent({ onClose }: { onClose: () => void }) {
	const [notifs, setNotifs] = useState(true);
	const [sounds, setSounds] = useState(false);
	const [animations, setAnimations] = useState(true);

	const row = (
		title: string,
		sub: string,
		on: boolean,
		toggle: () => void
	) => (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: "1rem",
				padding: "0.875rem 0",
			}}
		>
			<div style={{ flex: 1 }}>
				<div
					style={{
						fontSize: "0.9rem",
						fontWeight: 500,
						color: "var(--foreground)",
						marginBottom: "0.125rem",
					}}
				>
					{title}
				</div>
				<div
					style={{
						fontSize: "0.75rem",
						color: "var(--foreground-muted)",
					}}
				>
					{sub}
				</div>
			</div>
			<Toggle on={on} onChange={toggle} />
		</div>
	);

	return (
		<div style={{ padding: "1.5rem" }}>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: "1.5rem",
				}}
			>
				<div style={heading}>Settings</div>
				<button
					onClick={onClose}
					style={{
						border: "none",
						background:
							"color-mix(in oklch, var(--glass-border) 40%, transparent)",
						borderRadius: "0.5rem",
						width: 28,
						height: 28,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						cursor: "pointer",
						fontSize: "0.75rem",
						color: "var(--foreground-muted)",
					}}
				>
					✕
				</button>
			</div>

			<div style={{ ...label, marginBottom: "0" }}>Preferences</div>
			<Divider />

			{row("Notifications", "Push and in-app alerts", notifs, () =>
				setNotifs((v) => !v)
			)}
			<Divider />
			{row("Sound effects", "Play sounds on interactions", sounds, () =>
				setSounds((v) => !v)
			)}
			<Divider />
			{row(
				"Animations",
				"Smooth transitions and motion",
				animations,
				() => setAnimations((v) => !v)
			)}

			<div style={{ marginTop: "1.5rem" }}>
				<button
					onClick={onClose}
					style={{
						width: "100%",
						padding: "0.625rem 1rem",
						borderRadius: "0.75rem",
						border: "none",
						cursor: "pointer",
						fontFamily: "inherit",
						background:
							"linear-gradient(135deg, var(--color-atmos-purple), var(--color-atmos-blue))",
						color: "white",
						fontWeight: 600,
						fontSize: "0.875rem",
					}}
				>
					Save changes
				</button>
			</div>
		</div>
	);
}
