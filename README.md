# LabGuard — Smart Laboratory Access

**Live website:** https://neontechno.github.io/HuaweiLab/  
**GitHub repository:** https://github.com/NeonTechno/HuaweiLab

LabGuard is a responsive website prototype for an IoT-powered laboratory access system. It is designed to work alongside a fingerprint module, an access controller, an electric door lock, and a magnetic door-position sensor. The website is published through GitHub Pages.

## Website deployment

This repository is configured to deploy the static website automatically through GitHub Actions.

- **Published URL:** https://neontechno.github.io/HuaweiLab/
- **Source branch:** `main`
- **Deployment workflow:** `.github/workflows/pages.yml`

To manage deployment:
1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, keep **Source** set to **GitHub Actions**.
3. Open the **Actions** tab to view deployment runs and logs.
4. After a successful deployment, visit the website URL above.

Updates pushed to `main` trigger the deployment workflow.

## Important prototype limitations

- The status and activity currently shown are sample/demo data.
- This website does not unlock a real door and is not yet connected to the physical fingerprint reader or controller.
- Connect a secure backend API before using the dashboard for real laboratory access.
- Do not store or send raw fingerprint images/templates from the Android app. Prefer a fingerprint module that performs matching locally and returns a user/reference ID plus match result.
- Use authenticated, encrypted API requests; role-based access; audit logs; rate limiting; and a manual emergency override.
- Door status should come from a door-position sensor, not merely from the unlock command. A successful unlock pulse does not prove that the door physically opened.

## Suggested IoT architecture

Fingerprint sensor/module → ESP32 or access controller → secure backend/API → Android app + website dashboard.

The controller should:
1. Receive a fingerprint match result from the biometric module.
2. Check the user's authorization and access schedule.
3. Trigger the electric lock only when authorized.
4. Read the magnetic/reed door sensor to determine the actual open/closed state.
5. Send authenticated access and door-state events to the backend.

Emergency egress and manual override must remain available independently of the app, network, and cloud service.

## Suggested API contract

- `GET /api/labs/{labId}/status` — actual door state, device online state, and last update.
- `GET /api/labs/{labId}/events` — recent access events.
- `POST /api/access/verify` — submit a module-generated match event, not fingerprint data.
- `POST /api/devices/heartbeat` — controller health/status.

Do not put API secrets in this static website. GitHub Pages serves public client-side files only.
