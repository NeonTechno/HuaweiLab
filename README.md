# LabGuard — Smart Laboratory Access

A responsive static website prototype for an IoT laboratory access system. It is ready to publish with GitHub Pages.

## Publish with GitHub Pages
1. Create a GitHub repository (for example, `labguard-iot`).
2. Upload the contents of this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then Save.
6. GitHub will show the published URL after deployment.

A GitHub Actions workflow is also included to deploy the static site automatically when you push to `main`. If using the workflow, set Pages source to **GitHub Actions** in Settings → Pages.

## Important prototype limitations
- The status and activity shown are sample/demo data.
- This website does not unlock a real door and is not connected to a fingerprint reader.
- Replace demo data with a secure backend API before deployment for operational use.
- Do not store or send raw fingerprint images/templates from the Android app. Prefer a fingerprint module that performs matching locally and returns a user/reference ID plus match result.
- Use authenticated, encrypted API requests; role-based access; audit logs; rate limiting; and a manual emergency override.
- Door status should come from a door-position sensor, not merely from the unlock command. A successful unlock pulse does not prove that the door physically opened.

## Suggested IoT architecture
Fingerprint sensor/module → microcontroller or access controller → secure backend/API → Android app + website dashboard.

The controller should:
1. Receive a fingerprint match result from the biometric module.
2. Check the user's authorization and access schedule.
3. Trigger the electric lock only when authorized.
4. Read a magnetic/reed door sensor to determine actual open/closed state.
5. Send signed/authenticated access and door-state events to the backend.

## Suggested API contract
- `GET /api/labs/{labId}/status` — actual door state, device online state, last update.
- `GET /api/labs/{labId}/events` — recent access events.
- `POST /api/access/verify` — submit a module-generated match event, not fingerprint data.
- `POST /api/devices/heartbeat` — controller health/status.

Do not put API secrets in this static website. GitHub Pages serves public client-side files only.