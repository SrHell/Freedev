import { defineConfig, presetIcons, presetUno, presetWebFonts } from "unocss";

export default defineConfig({
	theme: {
		colors: {
			banner: "rgb(169, 141, 126)"
		}
	},
	presets: [
		presetUno({ dark: "class" }),
		presetWebFonts({
			provider: "bunny",
			fonts: {
				"Whitney": ['400', '500', '600', '700'],
			}
		}),
		presetIcons(),
	],
});