"use client";

import { useState } from "react";
import { pill } from "../styles";

export function GlassContent({ onClose }: { onClose: () => void }) {
	const [playing, setPlaying] = useState(false);
	const [progress, setProgress] = useState(38);

	return (
		<div style={{ padding: "1.25rem 1.5rem 1.75rem" }}>
			<div style={pill} />
			<div
				style={{
					display: "flex",
					gap: "1rem",
					marginBottom: "1.25rem",
				}}
			>
				<div
					style={{
						width: 60,
						height: 60,
						borderRadius: "0.875rem",
						flexShrink: 0,
						background:
							"linear-gradient(135deg, oklch(68% 0.22 290), oklch(65% 0.20 255), oklch(60% 0.18 200))",
						boxShadow: "0 8px 24px -4px oklch(68% 0.22 290 / 0.5)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "1.5rem",
					}}
				>
					♫
				</div>
				<div style={{ flex: 1, minWidth: 0 }}>
					<div
						style={{
							fontWeight: 700,
							fontSize: "1rem",
							color: "var(--foreground)",
							marginBottom: "0.125rem",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
						}}
					>
						Midnight Cascade
					</div>
					<div
						style={{
							fontSize: "0.8rem",
							color: "var(--foreground-muted)",
						}}
					>
						Atmos Collective · Lo-fi Drift
					</div>
					<div
						style={{
							marginTop: "0.5rem",
							fontSize: "0.7rem",
							color: "var(--foreground-muted)",
							letterSpacing: "0.05em",
							background:
								"color-mix(in oklch, var(--color-atmos-purple) 15%, transparent)",
							display: "inline-block",
							padding: "2px 8px",
							borderRadius: 9999,
							border: "1px solid color-mix(in oklch, var(--color-atmos-purple) 25%, transparent)",
						}}
					>
						LOSSLESS
					</div>
				</div>
			</div>

			<div style={{ marginBottom: "1.25rem" }}>
				<div
					style={{
						height: 4,
						borderRadius: 9999,
						background:
							"color-mix(in oklch, var(--glass-border) 50%, transparent)",
						cursor: "pointer",
						position: "relative",
						marginBottom: "0.5rem",
					}}
					onClick={(e) => {
						const rect = e.currentTarget.getBoundingClientRect();
						setProgress(
							Math.round(
								((e.clientX - rect.left) / rect.width) * 100
							)
						);
					}}
				>
					<div
						style={{
							height: "100%",
							borderRadius: 9999,
							background:
								"linear-gradient(90deg, var(--color-atmos-purple), var(--color-atmos-blue))",
							width: `${progress}%`,
							transition: "width 0.1s",
						}}
					/>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						fontSize: "0.7rem",
						color: "var(--foreground-muted)",
					}}
				>
					<span>
						1:{String(Math.floor(progress * 0.73)).padStart(2, "0")}
					</span>
					<span>3:14</span>
				</div>
			</div>

			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: "1.5rem",
				}}
			>
				{[
					{ icon: "⟨⟨", size: "1rem" },
					{
						icon: playing ? "⏸" : "▶",
						size: "1.25rem",
						primary: true,
						action: () => setPlaying((v) => !v),
					},
					{ icon: "⟩⟩", size: "1rem" },
				].map((btn, i) => (
					<button
						key={i}
						onClick={btn.action ?? onClose}
						style={{
							border: "none",
							cursor: "pointer",
							fontFamily: "inherit",
							width: btn.primary ? 48 : 36,
							height: btn.primary ? 48 : 36,
							borderRadius: 9999,
							background: btn.primary
								? "linear-gradient(135deg, var(--color-atmos-purple), var(--color-atmos-blue))"
								: "color-mix(in oklch, var(--glass-border) 40%, transparent)",
							color: "var(--foreground)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: btn.size,
							boxShadow: btn.primary
								? "0 8px 20px -4px oklch(68% 0.22 290 / 0.4)"
								: "none",
							transition: "transform 0.1s",
						}}
					>
						{btn.icon}
					</button>
				))}
			</div>
		</div>
	);
}
