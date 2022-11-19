import type { GatewayActivity, GatewayActivityTimestamps } from "discord-api-types/v10";
import { useState } from "react";

export const useUser = () => {
	return useState<LanyardUser>(() => ({
		spotify: null,
		listening_to_spotify: false,
		kv: {},
		discord_user: {
			username: "Niskii",
			public_flags: 0,
			id: "847865068657836033",
			discriminator: "8956",
			bot: false,
			avatar: "c70269bfcbfb509b698914e37846efaa",
		},
		discord_status: "offline",
		activities: [],
		active_on_discord_web: false,
		active_on_discord_mobile: false,
		active_on_discord_desktop: false,
	}));
};

export class Lanyard {
	ws!: WebSocket;
	heartbeat!: NodeJS.Timer;
	user_id: string;

	constructor(userId: string) {
		this.user_id = userId;
	}

	connect(setUser: React.Dispatch<React.SetStateAction<LanyardUser>>) {
		this.ws = new WebSocket("wss://api.lanyard.rest/socket");

		this.ws.onopen = () => {
			console.info("[WS]: Successfully connected");
		};

		this.ws.onmessage = ({ data }) => {
			if (this.ws.readyState !== this.ws.OPEN) return;
			const { d, op } = JSON.parse(data) as LanyardIncomingPayload;

			switch (op) {
				case LanyardOpcode.Hello: {
					this.heartbeat = setInterval(
						() => this.ws.send(JSON.stringify({ op: LanyardOpcode.Heartbeat })),
						d.heartbeat_interval,
					);
					this.ws.send(JSON.stringify({ op: LanyardOpcode.Initialize, d: { subscribe_to_id: this.user_id } }));
					break;
				}

				case LanyardOpcode.Event:
					setUser(d);
					break;

				default:
					console.info(`[WS]: Unknown message: ${data}`);
			}
		};

		this.ws.onclose = ({ code }) => {
			clearInterval(this.heartbeat);
			console.info(`[WS]: Connection closed with code ${code}. Retrying in 1 second.`);

			setTimeout(() => {
				this.connect(setUser);
			}, 1000);
		};
	}
}

export interface LanyardUser {
	spotify: null;
	listening_to_spotify: boolean;
	kv: object;
	discord_user: DiscordUser;
	discord_status: Status;
	activities: GatewayActivity[];
	active_on_discord_web: boolean;
	active_on_discord_mobile: boolean;
	active_on_discord_desktop: boolean;
}

export type Status = "online" | "idle" | "dnd" | "offline";

export interface DiscordUser {
	username: string;
	public_flags: number;
	id: string;
	discriminator: string;
	bot: boolean;
	avatar: string;
}

export interface Spotify {
	track_id: string;
	timestamps: GatewayActivityTimestamps;
	song: string;
	artist: string;
	album_art_url: string;
	album: string;
}

export enum LanyardOpcode {
	Event,
	Hello,
	Initialize,
	Heartbeat,
}

export type LanyardIncomingPayload =
	| LanyardEventInitStatePayload
	| LanyardEventPresenceUpdatePayload
	| LanyardHelloPayload;

interface LanyardEventInitStatePayload {
	op: LanyardOpcode.Event;
	seq: number;
	t: "INIT_STATE";
	d: LanyardUser;
}

interface LanyardEventPresenceUpdatePayload {
	op: LanyardOpcode.Event;
	seq: number;
	t: "INIT_STATE";
	d: LanyardUser;
}

interface LanyardHelloPayload {
	op: LanyardOpcode.Hello;
	d: { heartbeat_interval: number };
}
