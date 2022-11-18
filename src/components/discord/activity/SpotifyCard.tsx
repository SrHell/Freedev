import { ProgressBar } from "@components/ProgressBar";
import type { Spotify } from "@composables/use-user";
import { useTime } from "@hooks/useTime";

interface CardProps {
	spotify: Spotify;
}

export function SpotifyCard({ spotify }: CardProps) {
	const time = useTime(spotify.timestamps, true);

	return (
		<div className="mb-3">
			<div className="justify-between flex flex-row items-center select-none">
				<div className="text-center">
					<h2 className="font-bold text-xs text-slate-300 leading-4 mb-2 uppercase">Listening to Spotify</h2>
				</div>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path
						xmlns="http://www.w3.org/2000/svg"
						d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2ZM16.5625 16.4375C16.3791 16.7161 16.0145 16.8107 15.7188 16.6562C13.375 15.2188 10.4062 14.9062 6.9375 15.6875C6.71979 15.7377 6.49182 15.668 6.33945 15.5046C6.18709 15.3412 6.13348 15.1089 6.19883 14.8952C6.26417 14.6816 6.43854 14.519 6.65625 14.4688C10.4688 13.5938 13.7188 13.9688 16.375 15.5938C16.5149 15.6781 16.6141 15.816 16.6495 15.9755C16.685 16.1349 16.6535 16.3019 16.5625 16.4375ZM17.8125 13.6875C17.7053 13.8622 17.5328 13.9869 17.3333 14.0338C17.1338 14.0807 16.9238 14.0461 16.75 13.9375C14.0625 12.2812 9.96875 11.8125 6.78125 12.7812C6.5133 12.8594 6.22401 12.7887 6.02236 12.5957C5.8207 12.4027 5.73731 12.1168 5.80361 11.8457C5.8699 11.5746 6.0758 11.3594 6.34375 11.2812C9.96875 10.1875 14.5 10.7188 17.5625 12.625C17.9134 12.8575 18.0229 13.3229 17.8125 13.6875ZM17.9062 10.875C14.6875 8.96875 9.375 8.78125 6.28125 9.71875C5.81691 9.79284 5.36952 9.5115 5.23513 9.0609C5.10074 8.61031 5.32093 8.12986 5.75 7.9375C9.28125 6.875 15.1562 7.0625 18.875 9.28125C19.0893 9.40709 19.2434 9.61436 19.3023 9.85577C19.3612 10.0972 19.3198 10.3521 19.1875 10.5625C18.9054 10.9822 18.3499 11.1177 17.9062 10.875Z"
						fill="#1ED760"
					/>
				</svg>
			</div>

			{/* Image */}
			<div className="items-center flex flex-row">
				<img
					src={spotify.album_art_url}
					alt={spotify.album}
					width="60"
					height="60"
					className="select-none self-start"
				/>

				<div className="ml-2.5 overflow-hidden">
					<a
						href={`https://open.spotify.com/track/${spotify.track_id}`}
						rel="noopener noreferrer"
						target="_blank"
						className="
            block whitespace-nowrap text-ellipsis overflow-hidden text-sm font-semibold hover:underline underline-offset-2 text-slate-300 select-none"
					>
						{spotify.song}
					</a>

					<div className="text-slate-300 block whitespace-nowrap text-ellipsis overflow-hidden select-none">
						by {spotify.artist.replaceAll("; ", ", ")}
					</div>
					<div className="text-slate-300 block whitespace-nowrap text-ellipsis overflow-hidden select-none">
						on {spotify.album}
					</div>
				</div>
			</div>

			{/* Progress */}
			<div className="mt-3">
				{spotify.timestamps && (
					<div>
						<ProgressBar time={time} />
						<div className="flex flex-row items-center gap-3 justify-between">
							{time && time.start && <span className="text-xs font-normal select-none">{time.start}</span>}
							{time && time.end && <span className="text-xs font-normal select-none">{time.end}</span>}
						</div>
					</div>
				)}
			</div>

			{/* Button */}
			<div className="mt-1">
				<div className="flex mt-3 flex-col flex-wrap justify-center items-stretch select-none">
					<a href={`https://open.spotify.com/track/${spotify.track_id}`} rel="noopener noreferrer" target="_blank">
						<button className="h-8 text-sm w-full space-x-2 relative flex items-center justify-center text-white bg-zinc-600 hover:bg-zinc-500 rounded transition-colors">
							<svg aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 16 16">
								<g fill="none" fillRule="evenodd">
									<path
										fill="currentColor"
										d="M12.7609503,7.08043507 C10.1796226,5.54647845 5.92178025,5.40543597 3.45759439,6.15380317 C3.06179846,6.27398591 2.64333918,6.05046133 2.5234242,5.65450895 C2.40350922,5.25826952 2.62670026,4.83983073 3.02268744,4.71945662 C5.85139953,3.86028398 10.5538071,4.02620506 13.52548,5.79134121 C13.8813999,6.00280925 13.9981592,6.46277616 13.7872083,6.81834866 C13.5760661,7.17449528 13.1160095,7.2919031 12.7609503,7.08043507 Z M12.7456938,9.37785148 C12.5639139,9.67256952 12.1782795,9.76502256 11.883727,9.58404861 C9.72377106,8.25738585 6.4301382,7.87299604 3.87475822,8.64810544 C3.54335063,8.74813503 3.19341953,8.56150265 3.09273996,8.2309159 C2.99292418,7.89984962 3.17979084,7.55075308 3.51062257,7.45005215 C6.42975429,6.56484307 10.0587298,6.99354129 12.5395359,8.51700243 C12.8340884,8.69826409 12.9268019,9.08380478 12.7456938,9.37785148 Z M11.7108365,11.5428368 C11.566471,11.780912 11.2582675,11.8554793 11.0223905,11.7103962 C9.13604653,10.5509855 6.76173752,10.28918 3.96555508,10.9314428 C3.69610478,10.9935661 3.42751778,10.823788 3.36603055,10.5528184 C3.30435146,10.2819451 3.47260203,10.0118436 3.74262788,9.95000969 C6.80260111,9.2465882 9.42736749,9.54929481 11.5446963,10.8504123 C11.7807651,10.995399 11.8551061,11.3055334 11.7108365,11.5428368 Z M0,7.99990447 C0,12.4185663 3.58181579,16 8,16 C12.4183753,16 16,12.4185663 16,7.99990447 C16,3.58172026 12.4183753,0 8,0 C3.58181579,0 0,3.58172026 0,7.99990447 Z"
									/>
									<rect width="16" height="16" />
								</g>
							</svg>
							<div className="block whitespace-nowrap text-ellipsis overflow-hidden">Play on Spotify</div>
						</button>
					</a>
				</div>
			</div>
		</div>
	);
}
