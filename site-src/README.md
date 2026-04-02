# 🌙 moonlightOS Meow v6.0 — Website (Lucyfer's Resurrection)

*Welcome to the official website for the distro that refuses to die. Like a cockroach. But cuter. And with more cat hair.*

---

## 👋 What The Fuck Is This?

This is the landing page for **moonlightOS Meow v6.0 "Lucyfer's Resurrection"** — a Debian-based Linux distro built at 3 AM by someone who clearly has better things to do.

**Features:**
- ✅ Debian Trixie base (stable-ish)
- ✅ Custom branding (Lucyfer approved)
- ✅ Makka Pakka blessings included
- ✅ Zero warranty, zero liability, zero fucks given
- ✅ Built with live-build and suffering
- ✅ Cat-tested, Ash-approved

**Not Features:**
- ❌ Stability (it's a v6, what did you expect?)
- ❌ Support (we're struggling too)
- ❌ Your sanity (gone since v1)

---

## 🛠️ So You Want To Work On This Website?

Fine. Here's how. Don't mess it up.

### Prerequisites (No, You Can't Skip These)

- **Node.js** — If you don't have this, what are you even doing here?
- **npm** — Comes with Node. Yes, you need both. No, I don't want to hear about yarn/pnpm.
- **A brain** — Optional but recommended

### Install Dependencies (The Boring Part)

```bash
npm install
```

*Wait for it. Go make coffee. Pet Lucyfer. Come back when it's done.*

### Run Dev Server (The Fun Part)

```bash
npm run dev
```

The website will appear at `http://localhost:5173` or whatever port Vite feels like using today.

**Hot reload enabled.** Change something, watch it update. It's basically magic but with more JavaScript.

---

## 📦 Build For Production (When You're Done Breaking Things)

```bash
npm run build
```

This creates optimized static files in `dist/`. 

**What happens next?**
- GitHub Actions picks it up
- Deploys to GitHub Pages
- The world sees your chaos
- You question all your life choices

---

## 🚀 Deployment (Automated Suffering)

### For Me (The Repo Owner)

This site auto-deploys to **GitHub Pages** when I push to the right branch.

**CI/CD is handled by:** `.github/workflows/` (go read those files, they're educational)

**Manual deploy?** Don't. Let the robots do it. They're faster and they don't complain.

### For You (If You Fork/Clone)

**Bad news:** The GitHub Actions in this repo only work for MY deployment to MY GitHub Pages.

**Good news:** You can still run this locally or deploy it yourself!

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Deploy the `dist/` folder wherever you want
# Netlify, Vercel, your own server, a USB stick, whatever
```

**Want auto-deploy?** Set up your own GitHub Pages or use Netlify/Vercel. They're free and honestly probably better than GitHub Pages anyway.

---

## 📁 Project Structure (For People Who Care)

```
site-src/
├── src/           # Your actual website code (the important bit)
├── public/        # Static files that don't need processing
├── index.html     # The entry point. Don't delete this.
├── package.json   # Dependencies and scripts. Touch at your own risk.
├── vite.config.js # Vite configuration. Yes, you can customize it.
└── README.md      # This file. The one you're reading. How's it going?
```

---

## ⚠️ Warnings (Read These Or Suffer)

1. **Don't commit `node_modules/`** — It's in `.gitignore` for a reason. It's 500MB of pain.

2. **Don't edit `dist/` manually** — It gets regenerated. Your changes will be lost. Like hope.

3. **Test before you push** — GitHub Actions will judge you. We will judge you harder.

4. **Lucyfer has been in this folder** — If config files are knocked over, you know who to blame.

---

## 🎨 Tech Stack (For Your Resume Or Whatever)

- **React** — Because we like components and suffering
- **Vite** — Fast builds for impatient developers
- **GitHub Pages** — Free hosting, because we're broke
- **Caffeine** — The real MVP

---

## 📞 Support (LOL No)

Got issues? 
- Check the code
- Read the errors
- Google it
- Ask Lucyfer (he won't answer)
- Cry about it

**Actually helpful resources:**
- Vite docs: https://vitejs.dev/
- React docs: https://react.dev/
- Your tears: https://doesnotexist.com

---

## 🌙 Final Words

*This website, like the distro, is a work in progress. It will break. It will be fixed. It will break again. This is the way.*

*Build date: Whenever you run the command. Probably 3 AM.*

*License: See LICENSE.md. TL;DR: Do what you want, don't blame us, pet cats.*

---

**moonlightOS Meow v6.0 — Because Windows Update Wasn't Traumatic Enough** ☠️
