import { useEffect, useState } from 'react';

// WCAG relative luminance of an sRGB channel triple (0–255)
const relativeLuminance = (r, g, b) => {
    const lin = (c) => {
        const v = c / 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};

// Brand blue (#2a328f) — the title colour used on light backgrounds
const BLUE_LUMINANCE = relativeLuminance(0x2a, 0x32, 0x8f);

// Background luminance at which white and blue text have equal contrast;
// anything brighter reads better in blue
const LIGHT_THRESHOLD = Math.sqrt(1.05 * (BLUE_LUMINANCE + 0.05)) - 0.05;

const parsePosition = (value, free) => {
    if (!value) return free / 2;
    if (value.endsWith('%')) return (free * parseFloat(value)) / 100;
    if (value.endsWith('px')) return parseFloat(value);
    return free / 2;
};

// Where the image is drawn inside the banner, matching the banner's CSS background settings
const getImageLayout = (banner, img) => {
    const style = getComputedStyle(banner);
    const bw = banner.clientWidth;
    const bh = banner.clientHeight;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    let scale = 1;
    if (style.backgroundSize === 'cover') scale = Math.max(bw / iw, bh / ih);
    else if (style.backgroundSize === 'contain') scale = Math.min(bw / iw, bh / ih);

    const dw = iw * scale;
    const dh = ih * scale;
    return {
        scale,
        dw,
        dh,
        x: parsePosition(style.backgroundPositionX, bw - dw),
        y: parsePosition(style.backgroundPositionY, bh - dh),
        repeat: style.backgroundRepeat !== 'no-repeat',
    };
};

// Median luminance of the image area sitting behind the title text
const measureLuminance = (banner, title, img, canvas) => {
    const text = title.querySelector('h1') || title;
    const range = document.createRange();
    range.selectNodeContents(text);
    const textRect = range.getBoundingClientRect();
    const bannerRect = banner.getBoundingClientRect();
    if (!textRect.width || !textRect.height) return null;

    const { scale, dw, dh, x, y, repeat } = getImageLayout(banner, img);
    const wrap = (v, size) => (repeat ? ((v % size) + size) % size : v);

    let sx = wrap(textRect.left - bannerRect.left - x, dw) / scale;
    let sy = wrap(textRect.top - bannerRect.top - y, dh) / scale;
    let sw = textRect.width / scale;
    let sh = textRect.height / scale;

    // Clamp to the image bounds
    sx = Math.max(0, Math.min(sx, img.naturalWidth - 1));
    sy = Math.max(0, Math.min(sy, img.naturalHeight - 1));
    sw = Math.max(1, Math.min(sw, img.naturalWidth - sx));
    sh = Math.max(1, Math.min(sh, img.naturalHeight - sy));

    const size = 32;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, size, size);
    const { data } = ctx.getImageData(0, 0, size, size);

    // Median, so a few very bright or dark spots don't decide the colour
    const values = [];
    for (let i = 0; i < data.length; i += 4) {
        values.push(relativeLuminance(data[i], data[i + 1], data[i + 2]));
    }
    values.sort((a, b) => a - b);
    return values[Math.floor(values.length / 2)];
};

/**
 * Returns true when the banner image behind the title is light,
 * so the title should switch from white to the brand blue.
 */
const useBannerTitleContrast = (bannerRef, titleRef, imageUrl) => {
    const [isLight, setIsLight] = useState(false);

    useEffect(() => {
        if (!imageUrl) return;
        let cancelled = false;
        let observer;
        const canvas = document.createElement('canvas');
        const img = new Image();
        img.crossOrigin = 'anonymous';

        const update = () => {
            if (cancelled || !bannerRef.current || !titleRef.current) return;
            try {
                const luminance = measureLuminance(bannerRef.current, titleRef.current, img, canvas);
                if (luminance !== null) setIsLight(luminance > LIGHT_THRESHOLD);
            } catch (error) {
                // Canvas can't be read (e.g. image without CORS headers) — keep the white title
                console.error('Could not measure banner brightness:', error);
            }
        };

        img.onload = () => {
            update();
            if (bannerRef.current && 'ResizeObserver' in window) {
                observer = new ResizeObserver(update);
                observer.observe(bannerRef.current);
            }
        };
        img.src = imageUrl;

        return () => {
            cancelled = true;
            observer?.disconnect();
        };
    }, [bannerRef, titleRef, imageUrl]);

    return isLight;
};

export default useBannerTitleContrast;
