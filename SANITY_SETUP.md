# Sanity CMS Setup Guide

## 🎉 Installation Complete!

Your Sanity CMS is now integrated with your Next.js project. Follow these steps to get started:

## 📋 What You Need to Do

### 1. Create a Sanity Project

```bash
# Login to Sanity (creates account if you don't have one)
npx sanity login

# Initialize your project (this will give you a Project ID)
npx sanity init --project-id --dataset production
```

Or create a project manually at [sanity.io/manage](https://sanity.io/manage)

### 2. Update Environment Variables

Edit `.env.local` and add your credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_token_here  # Optional for public reads
```

**To get your API token:**
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to API → Tokens
4. Create a new token with "Editor" permissions

### 3. Configure CORS

Add your local and production URLs to Sanity CORS settings:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to API → CORS Origins
4. Add:
   - `http://localhost:3000` (for development)
   - Your production domain

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Access Sanity Studio

Visit: **http://localhost:3000/studio**

This is your content management interface where you can:
- Create blog posts
- Add authors
- Manage categories
- Upload images

### 6. View Your Blog

- Blog listing: **http://localhost:3000/blog**
- Individual posts: **http://localhost:3000/blog/[slug]**

## 📁 Project Structure

```
├── sanity/
│   ├── client.ts          # Sanity client configuration
│   ├── config.ts          # Environment variables
│   ├── image.ts           # Image URL builder
│   ├── queries.ts         # GROQ queries for fetching data
│   └── schemas/
│       ├── index.ts       # Schema exports
│       ├── post.ts        # Blog post schema
│       ├── author.ts      # Author schema
│       └── category.ts    # Category schema
├── app/
│   ├── blog/
│   │   ├── page.tsx       # Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx   # Individual blog post
│   └── studio/
│       └── [[...tool]]/
│           └── page.tsx   # Sanity Studio
└── sanity.config.ts       # Sanity Studio configuration
```

## 🎨 Features Included

### Content Types
- **Blog Posts**: Title, slug, body, images, SEO fields
- **Authors**: Name, bio, profile image
- **Categories**: Organize your content

### Blog Features
- ✅ Responsive blog listing page
- ✅ Individual post pages with dynamic routing
- ✅ Image optimization with Next.js Image
- ✅ Rich text content with Portable Text
- ✅ Author information and avatars
- ✅ Category tags
- ✅ SEO-friendly metadata
- ✅ Static generation for performance

### Studio Features
- ✅ Embedded Sanity Studio at `/studio`
- ✅ Vision plugin for testing GROQ queries
- ✅ Image hotspot and cropping
- ✅ Real-time preview

## 🚀 Next Steps

1. **Create Your First Content**:
   - Go to `/studio`
   - Create an author (yourself!)
   - Create a category (e.g., "Technology")
   - Create your first blog post

2. **Customize Schemas**: Edit files in `sanity/schemas/` to add custom fields

3. **Add More Queries**: Extend `sanity/queries.ts` for additional data needs

4. **Style Your Blog**: Customize the blog pages in `app/blog/`

5. **Add Metadata**: Implement dynamic metadata for SEO in blog pages

## 📚 Useful Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Deploy Sanity Studio
npx sanity deploy
```

## 🔗 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs-app-router)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Portable Text](https://www.sanity.io/docs/presenting-block-text)

## 🆘 Troubleshooting

**Studio not loading?**
- Check that your Project ID is correct in `.env.local`
- Verify CORS settings in Sanity dashboard

**Images not showing?**
- Ensure images are uploaded in Studio
- Check that `urlFor()` is being used correctly

**Data not fetching?**
- Verify your dataset name matches `.env.local`
- Check API version is current
- Test queries in Studio's Vision plugin

---

Need help? Check the [Sanity Community](https://www.sanity.io/community) or [Slack](https://slack.sanity.io/)
