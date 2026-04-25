# 🚀 Sanity CMS Quick Start Checklist

## ✅ Step-by-Step Setup (5 minutes)

### 1️⃣ Create Sanity Account & Project
```bash
npx sanity login
```
This opens your browser to create/login to your Sanity account.

### 2️⃣ Get Your Project ID
Two options:

**Option A: Create via CLI**
```bash
npx sanity init --project-id --dataset production
```

**Option B: Create via Dashboard**
1. Go to https://sanity.io/manage
2. Click "Create Project"
3. Copy your Project ID

### 3️⃣ Update .env.local
Replace `your_project_id_here` with your actual Project ID:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 4️⃣ Configure CORS (Important!)
1. Go to https://sanity.io/manage
2. Select your project
3. Click "API" → "CORS Origins"
4. Add these origins:
   - `http://localhost:3000` (with credentials)
   - Your production URL when ready

### 5️⃣ Start Your Dev Server
```bash
npm run dev
```

### 6️⃣ Access Sanity Studio
Open: **http://localhost:3000/studio**

### 7️⃣ Create Your First Content
In the Studio:
1. Create an **Author** (yourself)
2. Create a **Category** (e.g., "Technology")
3. Create a **Blog Post**
   - Add title
   - Generate slug
   - Select author
   - Add category
   - Upload main image
   - Write content
   - Set publish date
   - Click "Publish"

### 8️⃣ View Your Blog
- Blog listing: **http://localhost:3000/blog**
- Your post: **http://localhost:3000/blog/your-slug**

## 🎉 Done!

You now have a fully functional blog with:
- ✅ Content management system
- ✅ Blog listing page
- ✅ Individual post pages
- ✅ Image optimization
- ✅ SEO-ready structure
- ✅ Author profiles
- ✅ Category organization

## 📝 Next Steps

1. **Customize the design** in `app/blog/page.tsx` and `app/blog/[slug]/page.tsx`
2. **Add more fields** to schemas in `sanity/schemas/`
3. **Create more queries** in `sanity/queries.ts`
4. **Deploy your Studio** with `npm run sanity:deploy`

## 🆘 Having Issues?

**Studio won't load?**
- Check your Project ID in `.env.local`
- Verify CORS settings

**Can't see blog posts?**
- Make sure posts are published in Studio
- Check dataset name matches `.env.local`

**Images not showing?**
- Upload images in Studio
- Check image fields are filled

---

For detailed documentation, see **SANITY_SETUP.md**
