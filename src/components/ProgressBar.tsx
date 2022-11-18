import type { useTime } from "@hooks/useTime";

interface CardProps {
	time: ReturnType<typeof useTime>;
}

export function ProgressBar({ time }: CardProps) {
	if (!time || !time.completion || !time.start) return null;

	return (
		<div className="w-full rounded-full h-[4px] bg-gray-700">
			<div className="bg-white h-[4px] rounded-full" style={{ width: `${time.completion}%` }} />
		</div>
	);
}
