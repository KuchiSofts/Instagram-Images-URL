// ==UserScript==
// @name         Get Instagram Photo URL
// @namespace    https://kuchi.be/
// @version      1.5
// @description  Allow "Copy image link" / "Open image in new tab" on Instagram Photos
// @author       Kuchi - Soft's
// @license      GPL-3.0
// @defaulticon  https://raw.githubusercontent.com/KuchiSofts/Instagram-Images-URL/main/instagram.icon.png
// @icon         https://raw.githubusercontent.com/KuchiSofts/Instagram-Images-URL/main/instagram.icon.png
// @homepageURL  https://github.com/KuchiSofts/Instagram-Images-URL
// @supportURL   https://github.com/KuchiSofts/Instagram-Images-URL/issues
// @updateURL    https://raw.githubusercontent.com/KuchiSofts/Instagram-Images-URL/main/Instagram-PhotoURL.user.js
// @downloadURL  https://raw.githubusercontent.com/KuchiSofts/Instagram-Images-URL/main/Instagram-PhotoURL.user.js
// @match        https://www.instagram.com/*
// @match        https://instagram.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // Instagram covers post images with an empty <div> that swallows right clicks.
  // This script lets the right click reach the <img> again, so the browser menu
  // shows "Copy image link" / "Open image in new tab" / "Save image as".

  const PROCESSED = 'data-kiu-done';
  const TRIES = 'data-kiu-tries';
  const MAX_TRIES = 5;

  // Images served by Instagram's CDN, in posts, the feed, the post dialog and profiles.
  // Language-independent: matches on the image host, not on the alt text.
  const IMAGE_SELECTOR = [
    'article img',
    'main img',
    'div[role="dialog"] img',
    'div[role="presentation"] img'
  ].map(sel => sel + ':not([' + PROCESSED + '])').join(', ');

  const CDN_RE = /^https?:\/\/[^/]*(cdninstagram\.com|fbcdn\.net)\//;

  // How many ancestor levels to look at for a covering overlay
  const MAX_DEPTH = 3;

  function isCdnImage(img) {
    const src = img.getAttribute('src') || '';
    const srcset = img.getAttribute('srcset') || '';
    return CDN_RE.test(src) || CDN_RE.test(srcset.trim());
  }

  // An overlay is an empty, absolutely positioned element stacked over the image
  function isOverlay(el) {
    if (!(el instanceof HTMLElement)) return false;
    if (el.childElementCount !== 0 || el.textContent.trim() !== '') return false;
    const position = getComputedStyle(el).position;
    return position === 'absolute' || position === 'fixed';
  }

  function unblock(img) {
    // No z-index tricks on the image: raising it would cover carousel arrows and tags.
    // Let clicks pass through empty overlays next to the image or its wrappers.
    // Events still bubble to the same React ancestors, so double-tap like keeps working.
    let found = false;
    let node = img;
    for (let depth = 0; depth < MAX_DEPTH && node && node.parentElement; depth++) {
      for (let sib = node.nextElementSibling; sib; sib = sib.nextElementSibling) {
        if (isOverlay(sib)) {
          sib.style.pointerEvents = 'none';
          found = true;
        }
      }
      node = node.parentElement;
    }

    // Done when an overlay was handled; otherwise retry a few times (it may render later)
    const tries = parseInt(img.getAttribute(TRIES) || '0', 10) + 1;
    if (found || tries >= MAX_TRIES) {
      img.setAttribute(PROCESSED, '');
    } else {
      img.setAttribute(TRIES, String(tries));
    }
  }

  function scan() {
    document.querySelectorAll(IMAGE_SELECTOR).forEach(img => {
      if (isCdnImage(img)) unblock(img);
    });
  }

  // Debounced: Instagram mutates the DOM constantly while scrolling
  let scheduled = null;
  function scheduleScan() {
    if (scheduled) return;
    scheduled = setTimeout(() => {
      scheduled = null;
      scan();
    }, 200);
  }

  new MutationObserver(scheduleScan).observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scan);
  } else {
    scan();
  }
})();
