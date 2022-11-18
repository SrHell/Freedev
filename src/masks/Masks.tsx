export function AvatarMask() {
	return (
		<mask id="avatar-mask">
			<circle cx="40" cy="40" r="40" fill="white" />
			<circle cx="68" cy="68" r="14" fill="black" />
		</mask>
	);
}

export function StatusIdle() {
	return (
		<mask id="svg-mask-status-idle" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
			<circle fill="white" cx="0.5" cy="0.5" r="0.5" />
			<circle fill="black" cx="0.25" cy="0.25" r="0.375" />
		</mask>
	);
}

export function StatusDnd() {
	return (
		<mask id="svg-mask-status-dnd" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
			<circle fill="white" cx="0.5" cy="0.5" r="0.5" />
			<rect fill="black" x="0.125" y="0.375" width="0.75" height="0.25" rx="0.125" ry="0.125" />
		</mask>
	);
}

export function StatusOffline() {
	return (
		<mask id="svg-mask-status-offline" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
			<circle fill="white" cx="0.5" cy="0.5" r="0.5" />
			<circle fill="black" cx="0.5" cy="0.5" r="0.25" />
		</mask>
	);
}
