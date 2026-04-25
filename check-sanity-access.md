# Fix Sanity Access Issue

## The Problem
Your blog pages can't read data because the dataset isn't configured for public access.

## Solution: Make Dataset Public

### Option 1: Via Sanity Dashboard (Recommended)

1. Go to https://sanity.io/manage
2. Select your project (ID: **9wzqrt32**)
3. Click **API** in the left sidebar
4. Under **Datasets**, find your **production** dataset
5. Click on it
6. Look for **"Public access"** or **"Access control"**
7. Set it to **Public** (allow unauthenticated reads)
8. Click **Save**

### Option 2: Via CLI

Run this command:
```bash
npx sanity dataset visibility set production public
```

## After Making Dataset Public

1. **Restart your dev server:**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. **Visit your blog:**
   - http://localhost:3000/blog
   - http://localhost:3000/blog/testblog

## Why This Is Needed

- The **Studio** (`/studio`) requires authentication to edit content
- The **Blog pages** (`/blog`) need public read access to display content
- Making the dataset public allows anyone to READ data (but not write/edit)
- Only authenticated users in Studio can create/edit content

This is the standard setup for public-facing blogs with Sanity CMS.
