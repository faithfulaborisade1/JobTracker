# Deployment Checklist

## Supabase Configuration for Production

### 1. URL Configuration (IMPORTANT!)

Go to **Supabase Dashboard → Authentication → URL Configuration**

- **Site URL**: `https://job-tracker-3zb7tnm31-fathfuls-projects.vercel.app`
  - This is where email confirmation links redirect to
  - MUST be your production URL, NOT localhost

- **Redirect URLs** (add both):
  ```
  https://job-tracker-3zb7tnm31-fathfuls-projects.vercel.app/**
  http://localhost:5173/**
  ```
  - Production URL for live users
  - Localhost for local development

### 2. Email Templates (Optional but Recommended)

Go to **Supabase Dashboard → Authentication → Email Templates**

You can customize:
- Confirmation email
- Password recovery email
- Magic link email

Make sure all template links use `{{ .SiteURL }}` variable, which will use the Site URL you configured.

### 3. Vercel Environment Variables

Already configured:
- ✅ `VITE_SUPABASE_URL`
- ✅ `VITE_SUPABASE_ANON_KEY`

### 4. Update URLs After Getting Custom Domain (Future)

When you add a custom domain to Vercel:
1. Update Supabase Site URL to your custom domain
2. Add custom domain to Redirect URLs
3. Update `index.html` meta tags with new domain
4. Update `robots.txt` sitemap URL

## Common Issues

### Issue: Email links redirect to localhost
**Fix**: Update Supabase Site URL to production URL (see step 1 above)

### Issue: Email confirmation not working
**Fix**:
1. Check Supabase email settings are enabled
2. Verify Site URL is correct
3. Check spam folder for confirmation emails

### Issue: CORS errors
**Fix**: Verify Redirect URLs include your production domain with `/**` wildcard

## Testing Checklist

- [ ] Sign up with new email → Check confirmation email arrives
- [ ] Click confirmation link → Verify redirects to production URL
- [ ] Confirm email → Verify can log in
- [ ] Password reset → Check email arrives with correct redirect URL
- [ ] Test on mobile device
- [ ] Test different browsers

## Current Production URL

**Main URL**: https://job-tracker-3zb7tnm31-fathfuls-projects.vercel.app

**Note**: Vercel also provides a permanent URL at `job-tracker.vercel.app` or similar. Check your Vercel dashboard for the canonical domain.
