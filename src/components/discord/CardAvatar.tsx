import { AvatarMask, StatusDnd, StatusIdle, StatusOffline } from "@masks/Masks";
import type { Status } from "~/composables/use-user";

interface CardProps {
	status: Status;
}

const statusClasses = {
	online: "fill-green-600",
	idle: "fill-amber-400",
	dnd: "fill-red-500",
	offline: "fill-slate-500",
};

export default function CardAvatar({ status }: CardProps) {
	return (
		<div
			role="img"
			aria-label="avatar"
			aria-hidden="false"
			className="w-[92px] h-[92px] border-6 relative rounded-full border-white dark:border-zinc-900"
		>
			<svg width="80" height="80" viewBox="0 0 80 80" className="absolute">
				<defs>
					<AvatarMask />
					<StatusDnd />
					<StatusIdle />
					<StatusOffline />
				</defs>
				<foreignObject x="0" y="0" width="80" height="80" mask="url(#avatar-mask)">
					<div className="grid w-full h-full">
						<picture>
							<source
								src-set="/images/avatar-128.webp 1x, /images/avatar-256.webp 2x, /images/avatar-512.webp 4x"
								type="image/webp"
							/>
							<source
								src-set="/images/avatar-128.png 1x, /images/avatar-256.png 2x, /images/avatar-512.png 4x"
								type="image/png"
							/>
							<img
								src="/images/avatar-128.webp"
								alt="discord-avatar"
								width="92"
								height="92"
								aria-hidden="true"
								draggable="false"
								className="block"
							/>
						</picture>
					</div>
				</foreignObject>

				<circle cx="68" cy="68" r="8" className={statusClasses[status]} mask={`url(#svg-mask-status-${status})`} />;
			</svg>
		</div>
	);
}
