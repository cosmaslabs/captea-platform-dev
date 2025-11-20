# Cloudflare Tunnel Setup for Captea Platform

## Overview

Configure `captea.cosmaslabs.com` subdomain to serve the Captea Platform web app via the existing `cloudflared-openproject` tunnel.

---

## Prerequisites

✅ Existing Cloudflare tunnel: `cloudflared-openproject`
✅ Domain: `cosmaslabs.com` (managed in Cloudflare)
✅ Expo web build deployed (port 8081 or static export)

---

## Step 1: Build Expo Web App

### Option A: Static Export (Recommended)

```bash
# Navigate to project
cd ~/projects/captea-platform-dev

# Build static web app
npx expo export -p web

# Output will be in: dist/
```

**Serve static files**:

```bash
# Install serve globally
npm install -g serve

# Serve on port 8082
serve dist -l 8082
```

### Option B: Development Server

```bash
# Start Expo web dev server
npx expo start --web --port 8082
```

---

## Step 2: Update Cloudflare Tunnel Configuration

### Locate Tunnel Config

```bash
# Typical locations:
# /etc/cloudflared/config.yml
# ~/.cloudflared/config.yml
# /home/cosmaslabs/.cloudflared/config.yml

# Find the config
sudo find / -name "config.yml" -path "*cloudflared*" 2>/dev/null
```

### Edit Tunnel Config

```bash
# Edit config file (adjust path as needed)
sudo nano /etc/cloudflared/config.yml
```

**Add ingress rule**:

```yaml
tunnel: cloudflared-openproject
credentials-file: /path/to/credentials.json

ingress:
  # Add Captea Platform subdomain
  - hostname: captea.cosmaslabs.com
    service: http://localhost:8082
    originRequest:
      noTLSVerify: true

  # Existing OpenProject rule
  - hostname: openproject.cosmaslabs.com
    service: http://localhost:8080

  # Catch-all rule (must be last)
  - service: http_status:404
```

### Restart Cloudflare Tunnel

```bash
# If running as systemd service
sudo systemctl restart cloudflared

# Or manually restart
sudo cloudflared tunnel restart cloudflared-openproject
```

---

## Step 3: Configure DNS in Cloudflare Dashboard

1. **Login to Cloudflare**: [dash.cloudflare.com](https://dash.cloudflare.com)
2. **Select Domain**: `cosmaslabs.com`
3. **Navigate to**: DNS → Records
4. **Add CNAME Record**:
   - **Type**: CNAME
   - **Name**: `captea`
   - **Target**: `cloudflared-openproject.cfargotunnel.com` (or your tunnel's hostname)
   - **Proxy status**: Proxied (orange cloud)
   - **TTL**: Auto

5. **Save**

---

## Step 4: Test Access

```bash
# Test DNS resolution
nslookup captea.cosmaslabs.com

# Test HTTP access
curl -I https://captea.cosmaslabs.com

# Open in browser
xdg-open https://captea.cosmaslabs.com
```

**Expected Result**: Captea Platform loads successfully at `https://captea.cosmaslabs.com`

---

## Step 5: Verify Tunnel Health

```bash
# Check tunnel status
sudo cloudflared tunnel info cloudflared-openproject

# View tunnel logs
sudo journalctl -u cloudflared -f
```

---

## Troubleshooting

### Issue: 502 Bad Gateway

**Cause**: Service not running on port 8082

**Fix**:

```bash
# Check if port 8082 is listening
sudo netstat -tuln | grep 8082

# Start the web server
cd ~/projects/captea-platform-dev
serve dist -l 8082
```

### Issue: DNS not resolving

**Cause**: CNAME record not configured

**Fix**: Verify CNAME record in Cloudflare dashboard points to tunnel hostname

### Issue: Tunnel not running

**Fix**:

```bash
# Check service status
sudo systemctl status cloudflared

# Restart service
sudo systemctl restart cloudflared
```

---

## Production Deployment Checklist

- [ ] Build Expo web app: `npx expo export -p web`
- [ ] Deploy to production server (or serve locally)
- [ ] Update Cloudflare tunnel config with captea subdomain
- [ ] Restart cloudflared service
- [ ] Add CNAME DNS record in Cloudflare
- [ ] Test HTTPS access: `https://captea.cosmaslabs.com`
- [ ] Configure auto-start for web server (systemd service)
- [ ] Set up SSL certificate renewal (handled by Cloudflare)
- [ ] Monitor tunnel logs for errors

---

## Auto-Start Web Server (Optional)

Create systemd service to auto-start Expo web server:

```bash
# Create service file
sudo nano /etc/systemd/system/captea-web.service
```

**Service configuration**:

```ini
[Unit]
Description=Captea Platform Web Server
After=network.target

[Service]
Type=simple
User=cosmaslabs
WorkingDirectory=/home/cosmaslabs/projects/captea-platform-dev/dist
ExecStart=/usr/bin/serve -l 8082
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

**Enable and start**:

```bash
sudo systemctl daemon-reload
sudo systemctl enable captea-web
sudo systemctl start captea-web
sudo systemctl status captea-web
```

---

## Quick Reference Commands

```bash
# Build web app
npx expo export -p web

# Serve static files
serve dist -l 8082

# Restart tunnel
sudo systemctl restart cloudflared

# Check tunnel logs
sudo journalctl -u cloudflared -f

# Test subdomain
curl -I https://captea.cosmaslabs.com
```

---

**Last Updated**: November 20, 2025
**Tunnel**: cloudflared-openproject
**Subdomain**: captea.cosmaslabs.com
**Port**: 8082
