# GitHub Pages Setup Guide

This guide will help you set up GitHub Pages deployment for your API documentation.

## 🚀 Quick Setup

### 1. Push to GitHub

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Add GitHub Pages documentation deployment"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** > **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy your documentation

### 3. Update URLs

Once your repository is set up, update the documentation URLs:

1. **In `README.md`**: Replace `YOUR_USERNAME` and `YOUR_REPO` with your actual GitHub username and repository name
2. **In `docs/README.md`**: Update the GitHub Pages URL
3. **In `docs/index.html`**: Update the fallback GitHub raw URL (line with `https://raw.githubusercontent.com/`)

### 4. Test the Deployment

After pushing to GitHub:

1. Go to the **Actions** tab in your repository
2. Watch the "Deploy API Documentation to GitHub Pages" workflow
3. Once complete, your documentation will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## 🔧 Configuration Options

### Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `docs/` directory with your domain
2. Configure DNS settings for your domain
3. Update the GitHub Pages settings

### Workflow Triggers

The documentation deploys automatically when:

- You push changes to `main` or `master` branch
- The `data/openapi.json` file changes
- Files in the `docs/` directory change
- You manually trigger the workflow

### Manual Deployment

To manually trigger deployment:

1. Go to **Actions** tab
2. Select "Deploy API Documentation to GitHub Pages"
3. Click **Run workflow**

## 📁 Generated Files

The following files were created for GitHub Pages deployment:

```
├── .github/
│   └── workflows/
│       └── deploy-docs.yml      # GitHub Actions workflow
├── docs/
│   ├── index.html              # Main documentation page
│   ├── openapi.json            # Copy of API specification
│   └── README.md               # Documentation guide
├── serve-docs.sh               # Local development server
└── GITHUB_PAGES_SETUP.md       # This setup guide
```

## 🛠️ Troubleshooting

### Common Issues

1. **404 Error**: Ensure GitHub Pages is enabled and the workflow completed successfully
2. **Permissions Error**: Check that the repository has Pages write permissions
3. **OpenAPI Not Loading**: Verify the `openapi.json` file is valid JSON

### Checking Workflow Status

1. Go to the **Actions** tab in your repository
2. Look for the latest "Deploy API Documentation" workflow
3. Click on it to see detailed logs
4. Check for any error messages

### Local Testing

Before pushing to GitHub, test locally:

```bash
# Start local documentation server
./serve-docs.sh

# Or manually
cd docs && python3 -m http.server 8080
```

## 🎨 Customization

### Styling

Modify the CSS in `docs/index.html` to customize:

- Colors and themes
- Logo and branding
- Layout and typography

### Content

Update the OpenAPI specification in `data/openapi.json` to:

- Add new endpoints
- Update descriptions
- Modify examples

### Deployment

Modify `.github/workflows/deploy-docs.yml` to:

- Change triggers
- Add additional build steps
- Customize the deployment process

## 📚 Next Steps

1. ✅ Set up GitHub repository
2. ✅ Enable GitHub Pages
3. ✅ Update URLs in documentation
4. ✅ Test the deployment
5. 🔄 Keep your OpenAPI spec updated
6. 🎨 Customize styling if needed
7. 📢 Share your documentation URL!

Your API documentation will now be automatically updated whenever you modify your OpenAPI specification! 🎉
