"use client";

import { pill, label, heading } from "../styles";

const notifications = [
	{ id: 1, title: "New comment", body: "Sarah replied to your post", time: "2m ago", unread: true },
	{ id: 2, title: "Deploy complete", body: "Production build v2.1.0", time: "15m ago", unread: true },
	{ id: 3, title: "Team invite", body: "You were added to Project Alpha", time: "1h ago", unread: false },
];

export function NotificationsContent({ onClose }: { onClose: () => void }) {
	return (
		<div style={{ padding: "1.25rem 1.5rem 1.5rem", maxHeight: "60vh", overflowY: "auto" }}>
			<div style={pill} />
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: "1rem",
				}}
			>
				<div>
					<div style={label}>Notifications</div>
					<div style={heading}>3 unread</div>
				</div>
				<button
					onClick={onClose}
					style={{
						border: "none",
						background: "color-mix(in oklch, var(--glass-border) 40%, transparent)",
						borderRadius: "0.5rem",
						width: 32,
						height: 32,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						cursor: "pointer",
						fontSize: "0.875rem",
						color: "var(--foreground-muted)",
					}}
				>
					✕
				</button>
			</div>
			<div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
				{notifications.map((n) => (
					<button
						key={n.id}
						onClick={onClose}
						style={{
							display: "flex",
							alignItems: "flex-start",
							gap: "0.75rem",
							padding: "0.875rem 1rem",
							borderRadius: "0.75rem",
							border: "1px solid color-mix(in oklch, var(--glass-border) 40%, transparent)",
							background: n.unread
								? "color-mix(in oklch, var(--color-atmos-purple) 8%, transparent)"
								: "color-mix(in oklch, var(--glass-surface) 55%, transparent)",
							cursor: "pointer",
							fontFamily: "inherit",
							textAlign: "left",
							width: "100%",
						}}
					>
						<div
							style={{
								width: 8,
								height: 8,
								borderRadius: 9999,
								background: n.unread ? "var(--color-atmos-purple)" : "transparent",
								flexShrink: 0,
								marginTop: 6,
							}}
						/>
						<div style={{ flex: 1, minWidth: 0 }}>
							<div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.25rem" }}>
								{n.title}
							</div>
							<div style={{ fontSize: "0.8125rem", color: "var(--foreground-muted)", lineHeight: 1.4 }}>
								{n.body}
							</div>
							<div style={{ fontSize: "0.7rem", color: "var(--foreground-muted)", marginTop: "0.25rem" }}>
								{n.time}
							</div>
						</div>
					</button>
				))}
			</div>
		</div>
	);
}
