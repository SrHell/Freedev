import { useTime } from "@hooks/useTime";
import type { GatewayActivity } from "discord-api-types/v10";

interface CardProps {
	activity: GatewayActivity;
}

export const getAssetUrl = (appId?: string, asset?: string) => {
	if (!asset && appId) return `https://dcdn.dstn.to/app-icons/${appId}`;
	if (asset && asset.startsWith("mp:external")) return `https://media.discordapp.net/${asset.replace("mp:", "")}`;

	return `https://cdn.discordapp.com/app-assets/${appId}/${asset}.webp`
};

export function GameCard({ activity }: CardProps) {
	const time = useTime(activity.timestamps!, false);

	return (
		<div className="mb-3">
			<h2 className="font-bold text-xs text-slate-300 leading-4 mb-2 uppercase select-none">Playing a game</h2>

			{/* Image */}
			<div className="items-center flex">
				<div className="relative self-start select-none">
					<img
						src={getAssetUrl(activity.application_id, activity.assets?.large_image)}
						width="60"
						height="60"
						className={"block object-cover rounded-lg"}
					/>

					{activity.assets && activity.assets.small_image && activity.assets.large_image && (
						<img
							src={getAssetUrl(activity.application_id, activity.assets.small_image)}
							width="20"
							height="20"
							className="rounded-full absolute -bottom-1 -right-1"
						/>
					)}
				</div>

				{/* Details */}
				<div className="flex-auto overflow-hidden ml-2.5 select-none">
					<div className="font-semibold block whitespace-nowrap text-ellipsis overflow-hidden text-sm text-slate-300">
						{activity.name}
					</div>
					<div className="block whitespace-nowrap text-ellipsis overflow-hidden text-slate-300">{activity.details}</div>
					<div className="text-slate-300 block whitespace-nowrap text-ellipsis overflow-hidden">{activity.state}</div>

					{/* Progress */}
					{activity.timestamps && (
						<div className="block whitespace-nowrap text-ellipsis overflow-hidden text-slate-300">
							{time && time.start && !time.end ? `${time.start} elapsed` : `${time!.end} left`}
						</div>
					)}
				</div>
			</div>

			{/* Buttons */}
			{activity.buttons && (
				<div className="flex mt-3 flex-col flex-wrap space-y-2 justify-center items-stretch select-none">
					{activity.buttons?.map((button) => (
						<button className="h-8 text-sm w-full relative flex items-center justify-center text-white bg-zinc-600 hover:bg-zinc-500 rounded transition-colors">
							<div className="block whitespace-nowrap text-ellipsis overflow-hidden">{button.toString()}</div>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
