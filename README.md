# <img src="instagram.icon.png" alt="" height="32" align="top"> Instagram-Images-URL

**Right-click Instagram photos again.** This userscript brings back your browser's "Copy image link", "Open image in new tab" and "Save image as".

[![License: GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.5-E1306C.svg)](https://raw.githubusercontent.com/KuchiSofts/Instagram-Images-URL/main/Instagram-PhotoURL.user.js)
[![Tampermonkey](https://img.shields.io/badge/Tampermonkey-supported-00485B.svg)](https://www.tampermonkey.net/)
[![Violentmonkey](https://img.shields.io/badge/Violentmonkey-supported-1E88E5.svg)](https://violentmonkey.github.io/)

## Features

- **Native image menu.** Instagram covers every photo with an invisible layer, so a right-click hits that layer instead of the image. The script lets clicks pass through it, and the browser's image menu works again.
- **Works in any language.** Photos are found by Instagram's image servers, not by English alt text.
- **Lightweight.** The script changes nothing on the page except that invisible layer. It reacts to page changes (with a short delay) instead of polling, and handles each image only once.
- **Keeps Instagram working.** Double-tap to like, carousel arrows and tags keep working.

## Install

1. Install a userscript manager: [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/).
2. Click **[Install Get Instagram Photo URL](https://raw.githubusercontent.com/KuchiSofts/Instagram-Images-URL/main/Instagram-PhotoURL.user.js)** and confirm.

Updates install automatically through your userscript manager.

## Usage

| Action | Where | Result |
| --- | --- | --- |
| Right-click | On a photo (feed, post, profile grid, post dialog) | Browser image menu: copy link, open in new tab, save |

There are no settings.

## Compatibility

- Chrome, Edge, Brave, Opera and Firefox (desktop) with Tampermonkey or Violentmonkey
- `www.instagram.com` (photos only, not videos or Reels)

## Troubleshooting

**I still get the normal page menu.** Reload the page once after installing. If it still happens, Instagram may have changed its layout, so please open an [issue](https://github.com/KuchiSofts/Instagram-Images-URL/issues) with the page URL type (feed, post or profile).

**The copied link is a small image.** The browser copies the image size it's currently showing. Open the post in its own page, or make the window larger, to get a bigger version.

**The link stopped working after a while.** Instagram image links are signed and expire after some time. This is how Instagram works, not something the script can change.

## Changelog

**1.5**
- Replaces the 100 ms image-swapping loop with a lightweight pass-through for the overlay, so images are no longer replaced over and over.
- Works in every Instagram language, not only English.
- Moved to the `Instagram-Images-URL` repository and cleaned up the script header.

## Contributing

Issues and pull requests are welcome. Please keep the existing code style and bump `@version` in the script.

## License

[GPL-3.0](LICENSE) © KuchiSofts
