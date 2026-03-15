# Music Theory Program

A self-study curriculum tracker for music theory — five stages from tonal grammar through extended harmony, with concurrent track navigation, a theory library appendix, and cross-reference search. Built with React + Vite, packaged for Android via Capacitor 6.

---

## Getting the APK via GitHub Actions

### 1. Add GitHub Secrets

Before pushing, add these three secrets to your repository:
**Settings → Secrets and variables → Actions → New repository secret**

| Secret name | Value |
|---|---|
| `KEYSTORE_BASE64` | Base64-encoded `.jks` file (see keystore instructions below) |
| `KEYSTORE_PASSWORD` | `MusicTheory2024!` |
| `KEY_ALIAS` | `music-theory-key` |

The `.jks` keystore file was generated alongside this project. To get its base64 value:
```bash
base64 -w 0 music-theory-release.jks
```
Paste the entire output as the `KEYSTORE_BASE64` secret value.

### 2. Push to GitHub

```bash
git init
git add -A
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/music-theory-program.git
git push -u origin main
```

### 3. Download the APK

Go to the **Actions** tab → click the workflow run → scroll to **Artifacts** → download **music-theory-release-signed**.

The signed APK can be sideloaded directly and will support over-the-air upgrades without uninstalling, because every build uses the same keystore.

---

## Local Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # builds to dist/
```

---

## Icon Notes

The icon uses Android adaptive icon architecture (API 26+):
- **Foreground layer** (`resources/android/ic_launcher/foreground.svg`) — treble clef + quill pen artwork, constrained to the central 66% safe zone
- **Background layer** (`resources/android/ic_launcher/background.svg`) — solid navy `#18253d`

Android clips each layer independently to its icon shape (circle, squircle, etc.) — the artwork is never cropped.
