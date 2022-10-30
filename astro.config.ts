import image from "@astrojs/image";
import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";
import compress from "astro-compress";
import critters from "astro-critters";
import { defineConfig } from "astro/config";
import unocss from "unocss/astro";

// https://astro.build/config
export default defineConfig({
	integrations: [
		react(),
		image({
			serviceEntryPoint: "@astrojs/image/sharp",
		}),
		prefetch({
			throttle: 3,
		}),
		critters(),
		compress(),
		unocss(),
	],
	site: "https://niskii.dev",
});
