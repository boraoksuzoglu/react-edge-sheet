"use client";

import { Divider } from "../styles";

const navItems = [
	{ icon: "⌂", label: "Home", href: "/" },
	{ icon: "§", label: "Docs", href: "/docs/getting-started" },
	{ icon: "⁜", label: "API", href: "/docs/api" },
	{ icon: "◇", label: "Examples", href: "/docs/examples" },
];

export function LeftContent({ onClose }: { onClose: () => void }) {
	return (
		<div
			style={{
				padding: "1.5rem",
				display: "flex",
				flexDirection: "column",
				height: "100%",
				minHeight: 360,
			}}
		>
			<div style={{ marginBottom: "2rem" }}>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "0.625rem",
						marginBottom: "0.25rem",
					}}
				>
					<span
						style={{
							width: 28,
							height: 28,
							borderRadius: "0.5rem",
							background:
								"linear-gradient(135deg, var(--color-atmos-purple), var(--color-atmos-blue))",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "0.8rem",
						}}
					>
						◈
					</span>
					<span
						style={{
							fontWeight: 700,
							fontSize: "0.95rem",
							color: "var(--foreground)",
							letterSpacing: "-0.01em",
						}}
					>
						react-edge-sheet
					</span>
				</div>
				<div
					style={{
						fontSize: "0.75rem",
						color: "var(--foreground-muted)",
						paddingLeft: "0.25rem",
					}}
				>
					v0.1.0
				</div>
			</div>

			<nav
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "0.25rem",
					flex: 1,
				}}
			>
				{navItems.map((item) => (
					<a
						key={item.label}
						href={item.href}
						style={{
							display: "flex",
							alignItems: "center",
							gap: "0.75rem",
							padding: "0.625rem 0.75rem",
							borderRadius: "0.625rem",
							textDecoration: "none",
							color: "var(--foreground)",
							fontSize: "0.9rem",
							fontWeight: 450,
							transition: "background 0.15s",
						}}
						onMouseEnter={(e) =>
							(e.currentTarget.style.background =
								"color-mix(in oklch, var(--glass-border) 30%, transparent)")
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.background = "transparent")
						}
					>
						<span
							style={{
								width: 20,
								textAlign: "center",
								fontSize: "0.875rem",
							}}
						>
							{item.icon}
						</span>
						{item.label}
					</a>
				))}
			</nav>

			<Divider />
			<button
				onClick={onClose}
				style={{
					display: "flex",
					alignItems: "center",
					gap: "0.75rem",
					padding: "0.625rem 0.75rem",
					borderRadius: "0.625rem",
					border: "none",
					background: "transparent",
					cursor: "pointer",
					width: "100%",
					textAlign: "left",
					fontSize: "0.875rem",
					color: "var(--foreground-muted)",
					fontFamily: "inherit",
					transition: "background 0.15s",
				}}
				onMouseEnter={(e) =>
					(e.currentTarget.style.background =
						"color-mix(in oklch, var(--glass-border) 30%, transparent)")
				}
				onMouseLeave={(e) =>
					(e.currentTarget.style.background = "transparent")
				}
			>
				<span style={{ width: 20, textAlign: "center" }}>✕</span> Close
			</button>
		</div>
	);
}
