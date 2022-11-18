import { AvatarMask, StatusDnd, StatusIdle, StatusOffline } from "@masks/Masks";
import type { Status } from "~/composables/use-user";
import { StatusMask } from "./StatusMask";

interface CardProps {
	status: Status;
}

export default function CardAvatar({ status }: CardProps) {
	return (
		<div
			role="img"
			aria-label="avatar"
			aria-hidden="false"
			className="w-[92px] h-[92px] border-6 relative rounded-full border-white dark:border-zinc-900"
		>
			<svg width="92" height="92" viewBox="0 0 92 92" className="absolute">
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
								width="80"
								height="80"
								aria-hidden="true"
								draggable="false"
								className="block"
							/>
						</picture>
					</div>
				</foreignObject>

				<StatusMask data={status} />
			</svg>
		</div>
	);
}
