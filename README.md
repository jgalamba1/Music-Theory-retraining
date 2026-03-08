# Music Theory Program

A self-study curriculum tracker for music theory, covering five stages from tonal grammar through extended harmony. Built with React + Vite, packaged for Android via Capacitor.

## Features

- Five-stage curriculum (18–24 months at 10–15 hrs/week)
- Five concurrent tracks: Theory, Score Study, Keyboard, Ear Training, Composition
- Cross-track concurrent task indicators — see what to practice simultaneously
- Collapsible sidebar and header
- Progress tracking persisted to localStorage
- Milestones & self-assessment checkpoints
- Appendix: 80+ annotated theory books and treatises, filterable by topic

---

## Getting the APK (GitHub Actions — no local Android SDK needed)

1. Create a GitHub repository and push this project:
   ```bash
   git init
   git add -A
   git commit -m "initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/music-theory-program.git
   git push -u origin main
   ```

2. Go to the **Actions** tab in your repository.

3. The workflow runs automatically on push. Wait ~5–8 minutes.

4. When complete, click the workflow run → scroll to **Artifacts** → download **music-theory-debug**.

5. Transfer the APK to your Android device and install it (you may need to enable "Install from unknown sources" in Settings → Security).

---

## Local Development

```bash
npm install
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Build web assets to dist/
```

## Local Android Build (requires Android Studio + SDK)

```bash
npm install
npm run build
npx cap add android
npx cap sync android
npx cap open android   # Opens in Android Studio — build from there
```

---

## Signing for Google Play

To sign the release APK for distribution:

```bash
keytool -genkey -v -keystore music-theory.jks -alias music-theory -keyalg RSA -keysize 2048 -validity 10000
```

Then add signing config to `android/app/build.gradle` and add your keystore secrets to GitHub → Settings → Secrets and variables → Actions.
