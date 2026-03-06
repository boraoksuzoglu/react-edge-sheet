export interface TriggerProps {
	onClick: () => void;
	icon: string;
	title: string;
	sub: string;
	accent?: string;
	delay?: number;
}

export function DemoCard({
	onClick,
	icon,
	title,
	sub,
	accent = "var(--color-atmos-purple)",
	delay = 0,
}: TriggerProps) {
	return (
		<button
			onClick={onClick}
			style={{
				position: "relative",
				overflow: "hidden",
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				gap: "0.5rem",
				padding: "1.25rem 1.25rem 1.25rem 1.5rem",
				borderRadius: "1rem",
				border: "1px solid color-mix(in oklch, var(--glass-border) 45%, transparent)",
				background:
					"color-mix(in oklch, var(--glass-surface) 75%, transparent)",
				backdropFilter: "blur(16px)",
				WebkitBackdropFilter: "blur(16px)",
				cursor: "pointer",
				textAlign: "left",
				width: "100%",
				fontFamily: "inherit",
				transition:
					"transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.28s ease, border-color 0.2s ease",
				boxShadow:
					"0 4px 20px -6px rgba(0,0,0,0.08), 0 0 0 1px color-mix(in oklch, var(--glass-border) 20%, transparent)",
				animation: "demo-card-enter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both",
				animationDelay: `${delay}ms`,
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
				e.currentTarget.style.boxShadow =
					`0 20px 40px -12px rgba(0,0,0,0.18), 0 0 0 1px color-mix(in oklch, ${accent} 30%, transparent)`;
				e.currentTarget.style.borderColor = `color-mix(in oklch, ${accent} 50%, transparent)`;
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.transform = "";
				e.currentTarget.style.boxShadow =
					"0 4px 20px -6px rgba(0,0,0,0.08), 0 0 0 1px color-mix(in oklch, var(--glass-border) 20%, transparent)";
				e.currentTarget.style.borderColor =
					"color-mix(in oklch, var(--glass-border) 45%, transparent)";
			}}
		>
			<div
				style={{
					position: "absolute",
					left: 0,
					top: 0,
					bottom: 0,
					width: 3,
					background: `linear-gradient(180deg, ${accent}, color-mix(in oklch, ${accent} 60%, transparent))`,
					borderRadius: "3px 0 0 3px",
				}}
			/>
			<div
				style={{
					width: 40,
					height: 40,
					borderRadius: "0.75rem",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: "1.125rem",
					background: `color-mix(in oklch, ${accent} 12%, transparent)`,
					color: accent,
					border: "1px solid color-mix(in oklch, var(--glass-border) 40%, transparent)",
					transition: "transform 0.2s",
				}}
			>
				{icon}
			</div>
			<span
				style={{
					fontWeight: 600,
					fontSize: "0.9375rem",
					color: "var(--foreground)",
					letterSpacing: "-0.01em",
					lineHeight: 1.3,
				}}
			>
				{title}
			</span>
			<span
				style={{
					fontSize: "0.75rem",
					color: "var(--foreground-muted)",
					lineHeight: 1.4,
				}}
			>
				{sub}
			</span>
		</button>
	);
}
