# 🚀 Deploying Smart Goal Breaker Backend to Render

This guide walks you through deploying your FastAPI backend to Render with PostgreSQL database and automatic Alembic migrations.

## 📋 Prerequisites

- GitHub repository with your code pushed
- Render account (sign up at [render.com](https://render.com))
- Gemini API key

---

## Step 1: Create PostgreSQL Database on Render

1. **Log in to Render Dashboard**
   - Go to [dashboard.render.com](https://dashboard.render.com)

2. **Create New PostgreSQL Database**
   - Click **"New +"** button → Select **"PostgreSQL"**
   
3. **Configure Database**
   - **Name**: `smart-goal-breaker-db` (or your preferred name)
   - **Database**: `goalbreaker`
   - **User**: `goalbreaker_user` (auto-generated)
   - **Region**: Choose closest to your users
   - **PostgreSQL Version**: 15 (or latest)
   - **Plan**: Free (or paid based on your needs)
   
4. **Create Database**
   - Click **"Create Database"**
   - Wait for database to be created (takes ~1-2 minutes)
   
5. **Save Database Connection Details**
   - After creation, you'll see the database dashboard
   - Copy the **Internal Database URL** (starts with `postgresql://`)
   - Example: `postgresql://goalbreaker_user:***@dpg-xxx.oregon-postgres.render.com/goalbreaker`
   - ⚠️ **Important**: Use the **Internal Database URL**, not the External one (Internal is faster and free)

---

## Step 2: Create Web Service on Render

1. **Create New Web Service**
   - Click **"New +"** → Select **"Web Service"**

2. **Connect Your Repository**
   - **Option A**: Connect your GitHub/GitLab account
   - **Option B**: Use public Git repository URL
   - Select your `smart-goal-breaker` repository

3. **Configure Web Service**
   Fill in the following settings:

   | Setting | Value |
   |---------|-------|
   | **Name** | `smart-goal-breaker-api` |
   | **Region** | Same as your database |
   | **Branch** | `main` (or your default branch) |
   | **Root Directory** | `backend` |
   | **Runtime** | `Docker` |
   | **Instance Type** | Free (or paid based on needs) |

4. **Advanced Settings**
   
   Scroll down and expand **"Advanced"** section:
   
   **Build Command:**
   ```bash
   ./build.sh
   ```
   
   **Start Command:**
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```
   
   > ℹ️ The build command runs Alembic migrations automatically before each deployment

---

## Step 3: Configure Environment Variables

In the **Environment Variables** section on Render, add the following:

| Key | Value | Notes |
|-----|-------|-------|
| `DATABASE_URL` | `<Your Internal Database URL from Step 1>` | PostgreSQL connection string |
| `POSTGRES_USER` | `goalbreaker_user` | From database details |
| `POSTGRES_PASSWORD` | `<password from DB URL>` | Extract from database URL |
| `POSTGRES_DB` | `goalbreaker` | Database name |
| `POSTGRES_HOST` | `<host from DB URL>` | Example: `dpg-xxx.oregon-postgres.render.com` |
| `POSTGRES_PORT` | `5432` | Default PostgreSQL port |
| `GEMINI_API_KEY` | `<Your Gemini API Key>` | Get from [Google AI Studio](https://makersuite.google.com/app/apikey) |
| `PROJECT_NAME` | `Smart Goal Breaker` | App name |
| `PROJECT_VERSION` | `1.0.0` | Version |
| `API_V1_STR` | `/api/v1` | API prefix |
| `BACKEND_CORS_ORIGINS` | `["*"]` | For now allow all origins (update for production) |

### 💡 How to Extract Database Credentials

From the Internal Database URL format:
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

Example:
```
postgresql://goalbreaker_user:abc123xyz@dpg-abcd1234.oregon-postgres.render.com:5432/goalbreaker
```

- `POSTGRES_USER`: `goalbreaker_user`
- `POSTGRES_PASSWORD`: `abc123xyz`
- `POSTGRES_HOST`: `dpg-abcd1234.oregon-postgres.render.com`
- `POSTGRES_PORT`: `5432`
- `POSTGRES_DB`: `goalbreaker`

---

## Step 4: Deploy!

1. **Click "Create Web Service"**
   - Render will start building your Docker image
   - Watch the build logs in real-time

2. **Monitor the Build Process**
   
   You should see:
   ```
   ==> Running database migrations...
   INFO  [alembic.runtime.migration] Running upgrade  -> 001_initial, Initial migration - create goals table
   ==> Migrations completed successfully!
   ```

3. **Wait for Deployment**
   - First deployment takes 5-10 minutes
   - Status will change to **"Live"** with a green indicator

4. **Get Your API URL**
   - You'll receive a URL like: `https://smart-goal-breaker-api.onrender.com`
   - This is your production API endpoint!

---

## Step 5: Test Your Deployment

### Check Health Endpoint

```bash
curl https://smart-goal-breaker-api.onrender.com/
```

**Expected Response:**
```json
{
  "message": "Smart Goal Breaker API is running!"
}
```

### Test Goal Creation

```bash
curl -X POST https://smart-goal-breaker-api.onrender.com/api/v1/goals/ \
  -H "Content-Type: application/json" \
  -d '{
    "original_goal": "Deploy my app to production"
  }'
```

**Expected Response:**
```json
{
  "id": 1,
  "original_goal": "Deploy my app to production",
  "steps": [
    "Step 1: ...",
    "Step 2: ...",
    "Step 3: ...",
    "Step 4: ...",
    "Step 5: ..."
  ],
  "complexity": 5,
  "created_at": "2025-12-08T12:00:00Z"
}
```

---

## 🔄 Redeployment & Updates

### Automatic Deploys

Render automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Render will:
1. Pull latest code
2. Build new Docker image
3. Run `build.sh` (runs migrations)
4. Deploy new version
5. Zero-downtime deployment

### Manual Deploy

From Render Dashboard:
- Go to your web service
- Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## 🐛 Troubleshooting

### Build Fails with "Permission denied: ./build.sh"

**Solution:** The build script needs execute permissions (already done in your repo)

```bash
chmod +x backend/build.sh
git add backend/build.sh
git commit -m "Make build.sh executable"
git push
```

### Migration Errors

**Check Migration Status:**

Use Render Shell (from dashboard):
```bash
alembic current
alembic history
```

**Manually Run Migrations:**
```bash
alembic upgrade head
```

### Database Connection Issues

1. **Verify environment variables** are set correctly
2. **Use Internal Database URL**, not External
3. **Check database status** in Render dashboard
4. **Ensure database and web service are in the same region**

### App Crashes on Startup

View logs in Render Dashboard:
- Go to **Logs** tab
- Look for Python errors
- Common issues:
  - Missing environment variables
  - Wrong `DATABASE_URL` format
  - Invalid Gemini API key

---

## 📊 Monitoring

### View Logs

Render Dashboard → Your Service → **Logs** tab

### View Metrics

Render Dashboard → Your Service → **Metrics** tab
- CPU usage
- Memory usage
- Request count
- Response times

---

## 🔒 Security Best Practices

### 1. Update CORS Origins

In production, replace `["*"]` with your actual frontend domains:

```bash
BACKEND_CORS_ORIGINS=["https://yourfrontend.com","https://www.yourfrontend.com"]
```

### 2. Use Environment Variables

Never commit sensitive data:
- ✅ Use Render environment variables
- ❌ Don't hardcode API keys in code

### 3. Enable HTTPS

Render provides free SSL certificates automatically - your API is already secure! 🔐

---

## 💰 Cost Optimization

### Free Tier Limits

- **PostgreSQL**: 90 days free, then $7/month
- **Web Service**: 750 hours/month free (always-on requires paid plan)

### Free Tier Behavior

- **Spins down after 15 minutes of inactivity**
- **Cold start on first request (30-60 seconds)**
- Upgrade to paid plan for always-on service

---

## ✅ Deployment Checklist

- [ ] PostgreSQL database created on Render
- [ ] Internal Database URL copied
- [ ] Web service created and connected to repository
- [ ] Root directory set to `backend`
- [ ] Runtime set to `Docker`
- [ ] Build command: `./build.sh`
- [ ] All environment variables configured
- [ ] Service deployed successfully
- [ ] Health endpoint tested
- [ ] Goal creation endpoint tested
- [ ] Logs checked for errors

---

## 🎉 Next Steps

1. **Deploy Frontend**: Deploy your frontend to Vercel/Netlify
2. **Update CORS**: Add frontend URL to `BACKEND_CORS_ORIGINS`
3. **Custom Domain**: Add custom domain in Render settings (optional)
4. **Monitoring**: Set up alerts for downtime (Render Pro)
5. **Backup**: Enable automated database backups (Render settings)

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Alembic Documentation](https://alembic.sqlalchemy.org/)
- [FastAPI Deployment Guide](https://fastapi.tiangolo.com/deployment/)

---

## 🆘 Need Help?

- Check Render Community Forum
- Review application logs in Render dashboard
- Verify all environment variables are set correctly
- Ensure database is in "Available" state

**Your backend is now deployed and ready to power your Smart Goal Breaker app! 🚀**
