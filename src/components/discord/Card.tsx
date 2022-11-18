import { useEffect } from "react";
import { Lanyard, useUser } from "~/composables/use-user";
import { GameCard } from "./activity/GameCard";
import { SpotifyCard } from "./activity/SpotifyCard";
import CardAvatar from "./CardAvatar";
import CardBadges from "./CardBadges";
import CardDates from "./CardDates";
import CardInfo from "./CardInfo";

export default function Card() {
	const lanyard = new Lanyard("847865068657836033");

	const [user, setUser] = useUser();

	useEffect(() => lanyard.connect(setUser), []);

	const game = user.activities.find((x) => x.type === 0);
	const { spotify } = user;

	return (
		<div className="w-[300px] dark:text-slate-200 drop-shadow-xl">
			<div className="h-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-zinc-900">
				<div className="relative">
					<picture>
						<source type="image/webp" srcSet="/images/banner.webp" />
						<source type="image/gif" srcSet="/images/banner.gif" />
						<img
							src="/images/banner.gif"
							alt="niskii-discord-banner"
							width="300"
							height="120"
							aria-hidden="true"
							draggable="false"
							className="block select-none"
						/>
					</picture>

					<div className="absolute top-[76px] left-[16px]">
						<div className="rounded-full select-none">
							<CardAvatar status={user.discord_status} />
						</div>
					</div>

					<div className="pt-16 pb-3 px-4">
						<div className="text-xl font-semibold leading-6">
							<span className="text-zinc-900 dark:text-slate-50">Niskii</span>
							<span className="dark:text-slate-300">#8956</span>
						</div>

						<CardBadges />
					</div>

					<div className="px-4 pb-3.5 flex-initial text-sm">
						{/* <div className="pb-2.5">
							<img
								src="https://cdn.discordapp.com/emojis/1037061490664022127.webp?size=44&quality=lossless"
								iara-label=":twice:"
								alt="twice"
								draggable="false"
								className="w-[48px] h-[48px] -my-px mr-1 select-none"
							/>
						</div> */}

						<div className="w-full h-[1px] bg-zinc-800 mb-3"></div>
						<CardInfo />
						<CardDates />

						{game && <GameCard activity={game} />}
						{spotify && !game && <SpotifyCard spotify={spotify} />}
					</div>
				</div>
			</div>
		</div>
	);
}
