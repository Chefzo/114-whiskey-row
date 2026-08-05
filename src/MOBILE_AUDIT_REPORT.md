# Mobile Responsiveness Audit Report
**Date:** August 5, 2026  
**Status:** CRITICAL ISSUES FOUND

---

## Executive Summary
The site has **MAJOR mobile responsiveness issues** that explain the discrepancy between preview and actual phone display. The primary issues are:

1. **Missing viewport meta tag in Astro layout** - The most critical issue
2. **Inconsistent padding/spacing across breakpoints**
3. **Fixed header height not accounting for mobile safe areas**
4. **Images not properly constrained on mobile**
5. **Grid layouts not responsive enough on small screens**
6. **Horizontal overflow on some sections**

---

## Critical Issues

### 1. ⚠️ VIEWPORT META TAG (HIGHEST PRIORITY)
**File:** `/src/pages/[...slug].astro`  
**Line:** 15

**Current:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
```

**Issue:** The viewport meta tag exists but may not be properly recognized by all browsers if the HTML/body elements don't have proper width constraints.

**Current HTML/Body:**
```html
<html lang="en" class="w-full h-full">
<body class="w-full h-full">
```

**Problem:** While `w-full` is applied, there's no explicit `max-width` constraint, and the root div also needs proper sizing.

---

### 2. ⚠️ HEADER FIXED POSITIONING
**File:** `/src/components/Header.tsx`  
**Line:** 22

**Current:**
```tsx
<header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-foreground/10" role="banner">
```

**Issues:**
- Fixed header doesn't account for mobile safe areas (notches, dynamic island)
- No `safe-area-inset` consideration
- Padding doesn't scale properly on mobile

**Recommendation:**
```tsx
<header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-foreground/10 safe-area-inset-top" role="banner">
```

---

### 3. ⚠️ PADDING INCONSISTENCIES
**File:** Multiple pages  
**Examples:** HomePage.tsx, MenuPage.tsx, EventsPage.tsx

**Issues Found:**
- `px-3 sm:px-6 md:px-16` - Good, but `px-16` (64px) is too large for tablets
- `px-4 sm:px-6 lg:px-8` - Missing `md:` breakpoint
- Some sections use `px-3` while others use `px-4` - inconsistent

**Recommendation:** Standardize to:
```
px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12
```

---

### 4. ⚠️ HERO SECTION PADDING
**File:** `/src/components/pages/HomePage.tsx`  
**Line:** 106

**Current:**
```tsx
<div className="relative z-10 w-full max-w-[120rem] mx-auto px-3 sm:px-6 md:px-16 py-8 sm:py-12 md:py-20">
```

**Issue:** `md:px-16` (64px) is excessive for tablets. Creates unbalanced spacing.

---

### 5. ⚠️ BUTTON SIZING ON MOBILE
**File:** `/src/components/pages/HomePage.tsx`  
**Lines:** 124, 311, 381, 422

**Current:**
```tsx
className="bg-neon-red-orange hover:bg-neon-red-orange/90 text-black font-paragraph text-sm sm:text-base px-4 sm:px-8 py-4 sm:py-6 h-auto w-full sm:w-auto"
```

**Issue:** `w-full sm:w-auto` means buttons are full-width on mobile, which is good, but the padding `px-4 sm:px-8` creates inconsistent touch targets.

**Recommendation:**
```tsx
className="... px-4 sm:px-6 py-3 sm:py-4 min-h-[44px] w-full sm:w-auto"
```

---

### 6. ⚠️ GRID LAYOUTS NOT RESPONSIVE ENOUGH
**File:** `/src/components/pages/HomePage.tsx`  
**Line:** 186

**Current:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-14">
```

**Issue:** Jumps from 1 column to 3 columns at `md:` breakpoint. No `sm:` breakpoint for tablets.

**Recommendation:**
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
```

---

### 7. ⚠️ GALLERY GRID LAYOUT
**File:** `/src/components/pages/HomePage.tsx`  
**Line:** 335

**Current:**
```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12" style={{ minHeight: '250px' }}>
```

**Issue:** 
- Jumps from 2 to 4 columns (too aggressive)
- Fixed `minHeight: '250px'` doesn't scale on mobile
- Gap changes don't align with column changes

**Recommendation:**
```tsx
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-8 sm:mb-10 lg:mb-12" style={{ minHeight: 'auto' }}>
```

---

### 8. ⚠️ MENU PAGE STICKY NAVIGATION
**File:** `/src/components/pages/MenuPage.tsx`  
**Line:** 153

**Current:**
```tsx
<section className="w-full bg-background/50 sticky top-16 z-40 border-b border-foreground/10 backdrop-blur-sm">
```

**Issue:** `top-16` (64px) assumes header is always 64px, but it's responsive. Should be dynamic.

---

### 9. ⚠️ FOOTER PADDING
**File:** `/src/components/Footer.tsx`  
**Line:** 7

**Current:**
```tsx
<div className="w-full px-4 py-12 sm:py-16">
```

**Issue:** Only `px-4` on mobile, but other sections use `px-3`. Inconsistent.

---

### 10. ⚠️ TAILWIND CONFIG MAX-WIDTH
**File:** `/src/tailwind.config.mjs`  
**Line:** 26

**Current:**
```javascript
// No explicit mobile-first max-width constraint
```

**Issue:** The `max-w-[120rem]` is correct for desktop, but there's no mobile-first approach.

---

## Secondary Issues

### Image Sizing
- Images use `width={1920}`, `width={500}`, `width={400}` - inconsistent
- No `sizes` attribute for responsive images
- `object-cover` without aspect ratio can cause distortion

### Typography Scaling
- H1: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl` - Good
- But some sections have different scales - inconsistent

### Spacing Inconsistencies
- `gap-6 md:gap-8` vs `gap-4 sm:gap-6 lg:gap-8` - Different patterns
- `mb-10 sm:mb-12 md:mb-14` vs `mb-8 sm:mb-10 md:mb-12` - Inconsistent

---

## Root Cause Analysis

**Why the preview looks different from the phone:**

1. **Preview uses desktop viewport** - The browser preview is likely at a wider breakpoint
2. **Mobile browser applies different rendering** - Real phones may have:
   - Different pixel density
   - Safe area insets (notches, dynamic island)
   - Different default font scaling
   - Viewport width interpretation differences

3. **Missing responsive breakpoints** - Gaps between `sm:` and `md:` cause layout shifts
4. **Fixed positioning issues** - Header doesn't account for mobile safe areas

---

## Recommendations (Priority Order)

### 🔴 CRITICAL (Fix Immediately)
1. Add `safe-area-inset` to fixed header
2. Standardize padding across all sections
3. Fix grid layouts with proper `sm:` breakpoints
4. Add `sizes` attribute to images

### 🟠 HIGH (Fix Soon)
5. Update button sizing for better touch targets (min 44px)
6. Fix gallery grid layout
7. Update menu sticky positioning
8. Standardize spacing patterns

### 🟡 MEDIUM (Fix Next)
9. Add explicit max-width constraints to root elements
10. Improve image responsive sizing
11. Add viewport-fit safe area handling

---

## Testing Checklist

- [ ] Test on iPhone 12/13/14/15 (various sizes)
- [ ] Test on Android devices (Samsung, Pixel)
- [ ] Test with notch/dynamic island
- [ ] Test in landscape orientation
- [ ] Test with browser zoom
- [ ] Test with system font scaling
- [ ] Test on 5" and 6.7" screens
- [ ] Test with keyboard open (mobile)

---

## Files Requiring Changes

1. `/src/pages/[...slug].astro` - Root HTML/body
2. `/src/components/Header.tsx` - Fixed positioning
3. `/src/components/Footer.tsx` - Padding consistency
4. `/src/components/pages/HomePage.tsx` - Multiple sections
5. `/src/components/pages/MenuPage.tsx` - Sticky nav
6. `/src/components/pages/EventsPage.tsx` - Grid layouts
7. `/src/components/pages/GalleryPage.tsx` - Gallery grid
8. `/src/tailwind.config.mjs` - Config review
9. `/src/styles/critical.css` - Mobile media queries

---

## Next Steps

1. **Immediate:** Fix header safe area insets
2. **Short-term:** Standardize padding/spacing
3. **Medium-term:** Update all grid layouts
4. **Long-term:** Implement comprehensive mobile testing

