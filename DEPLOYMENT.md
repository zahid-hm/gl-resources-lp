# Deployment

`gl-resources-lp` deploys as a single Docker container to your EC2 instance via
`.github/workflows/deploy.yml`. On every push to `main`:

1. GitHub Actions builds the Next.js standalone image and pushes it to
   `ghcr.io/<your-org>/<repo>:latest` (and `:<commit-sha>`).
2. It then SSHes into your EC2 host, writes a fresh `.env` from GitHub
   Secrets, and runs `docker compose pull && docker compose up -d`.

## One-time EC2 host setup

1. Install Docker + the Compose plugin:
   ```bash
   curl -fsSL https://get.docker.com | sh
   sudo usermod -aG docker $USER   # log out/in after this
   docker compose version          # confirm the plugin is present
   ```
2. Create the app directory and drop in `docker-compose.yml` from this repo
   (only that one file is needed on the host — the image itself comes from
   GHCR):
   ```bash
   mkdir -p ~/gl-resources-lp && cd ~/gl-resources-lp
   # copy this repo's docker-compose.yml here (scp, or paste it in)
   ```
3. Install & configure Nginx as a reverse proxy in front of the container's
   published port (3000), and terminate TLS there (e.g. via Certbot). This
   repo does not manage Nginx/TLS — it's a one-time host concern, not part of
   the per-deploy workflow. Example server block:
   ```nginx
   server {
     listen 80;
     server_name getlevrg.com;
     location / {
       proxy_pass http://127.0.0.1:3000;
       proxy_set_header Host $host;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
     }
   }
   ```

## GitHub Secrets to configure (repo Settings → Secrets and variables → Actions)

| Secret | Purpose |
|---|---|
| `EC2_HOST` | EC2 public IP or hostname |
| `EC2_USER` | SSH user (e.g. `ubuntu`) |
| `EC2_SSH_KEY` | Private key (PEM) matching a key authorized on the instance |
| `EC2_SSH_PORT` | Optional, defaults to `22` |
| `EC2_APP_DIR` | Optional, defaults to `~/gl-resources-lp` — where `docker-compose.yml` lives on the host |
| `IPGEO_API_KEY` | ipgeolocation.io key, written into the host's `.env` on every deploy, read by `/api/geolocate` |
| `NEXT_PUBLIC_SITE_URL` | e.g. `https://getlevrg.com` — used at both build time (baked into the client bundle) and runtime |

`GITHUB_TOKEN` (built-in, no setup needed) authenticates both the image push
to GHCR and the `docker login` the workflow runs on the EC2 host to pull it.
If you'd rather not have the workflow log the host in on every deploy, make
the GHCR package public instead (repo → Packages → package settings) and
drop the `docker login` line from the workflow.

## First deploy

Push to `main` once the secrets above are set, then watch the run under the
repo's Actions tab. If it fails at the SSH step, confirm the EC2 security
group allows inbound SSH from GitHub's runner IP ranges (or from `0.0.0.0/0`
if you're relying on the SSH key alone for access control).
