# Deployment Guide — Maximus

This guide explains how to deploy **Maximus** in a production environment.

## Recommended Platforms

- **Coolify** (Recommended)
- **Dokploy**
- **CapRover**
- Any VPS with Docker
- Bare metal with Docker

## Prerequisites

- Docker & Docker Compose installed
- Domain name (optional but recommended)
- PostgreSQL 16+, Redis 7+, MinIO (can be self-hosted)
- GPU server recommended for Ollama (optional but recommended for AI)

## Step-by-Step Deployment

### 1. Clone the project

```bash
git clone https://github.com/yourusername/maximus.git
cd maximus
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and set production values:

```env
DEBUG=False
SECRET_KEY=your-very-secure-secret-key
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
# Database
DATABASE_URL=postgres://user:password@host:5432/dbname
# Redis
REDIS_URL=redis://:password@host:6379/0
# MinIO
MINIO_ENDPOINT=https://your-minio-domain.com
MINIO_ACCESS_KEY=your-access-key
MINIO_SECRET_KEY=your-secret-key
MINIO_BUCKET=maximus-storage
# Email (optional)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.yourprovider.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@domain.com
EMAIL_HOST_PASSWORD=your-email-password
EMAIL_USE_TLS=True
DEFAULT_FROM_EMAIL="Maximus <noreply@yourdomain.com>"
# Ollama (if using remote)
OLLAMA_BASE_URL=http://your-ollama-host:11434
```

### 3. Build and Run

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

### 4. Run Migrations

```bash
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py collectstatic --noinput
```

### 5. Create Superuser

```bash
docker-compose exec backend python manage.py createsuperuser
```

### 6. Configure Platform

After deployment:
1. Login to **Custom Admin Dashboard** at `https://yourdomain.com/admin/`
2. Configure Stripe keys in Settings → Payments
3. Configure email backend in Settings → Email
4. Configure AI provider in Settings → AI (Ollama default, or set custom)
5. Set up site branding in Settings → General
6. Configure tenants if using multi-tenancy in Tenants section

## Production Recommendations

- Use **Nginx** or **Traefik** as reverse proxy (included in docker-compose)
- Enable **SSL** (Let's Encrypt via proxy or cert-manager)
- Set up **regular database backups** (pg_dump + cron)
- Monitor with **Grafana + Prometheus** (pre-configured)
- Use **Coolify** or **Dokploy** for one-click deployments and updates
- Enable **automated security updates** for host OS
- Configure **fail2ban** or similar for brute force protection
- Set up **log rotation** for application logs

## Environment Variables (Production)

```env
DEBUG=False
SECRET_KEY=CHANGE_ME_TO_A_LONG_RANDOM_STRING
DATABASE_URL=postgres://maximus:securepassword@postgres:5432/maximus
REDIS_URL=redis://:redispassword@redis:6379/0
MINIO_ENDPOINT=https://minio.yourdomain.com
MINIO_ACCESS_KEY=YOURMINIOACCESSKEY
MINIO_SECRET_KEY=YOURMINIOSECRETKEY
MINIO_BUCKET=maximus-storage
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
# Email
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_HOST_USER=apikey
EMAIL_HOST_PASSWORD=YOUR_SENDGRID_API_KEY
EMAIL_USE_TLS=True
DEFAULT_FROM_EMAIL="Maximus <noreply@yourdomain.com>"
# Ollama (local by default)
OLLAMA_BASE_URL=http://host.docker.internal:11434
# Optional: Proprietary API keys (via LiteLLM)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
```

## Post-Deployment Checklist

- [ ] Configure Stripe keys (test mode first, then live)
- [ ] Set up email backend (SendGrid, Mailgun, or SMTP)
- [ ] Configure Ollama on GPU server for best AI performance (optional)
- [ ] Set up custom domain and SSL
- [ ] Configure backup schedule (daily DB + weekly storage)
- [ ] Set up monitoring alerts (CPU, memory, disk, error rates)
- [ ] Test user registration, password reset, email verification
- [ ] Test purchase flow with Stripe (test mode)
- [ ] Test AI tool execution
- [ ] Test webhook delivery (if configured)

## Custom Admin Dashboard Notes

As of 2026-06-21, Maximus is transitioning to a **single unified Custom Admin Dashboard** at `/admin/` that combines:
- Wagtail CMS management
- Django Admin for all 19 apps
- Custom features (Tools, Downloads, AI, Marketing, etc.)
- WordPress-like experience
- Built with Django + Tailwind + Alpine.js

The legacy `/admin/` (Django) and `/cms` (Wagtail) paths will be redirected to the new unified dashboard.

## Scaling Recommendations

### Vertical Scaling
- Increase CPU/RAM for AI workloads (Ollama benefits from GPU)
- Add more Redis memory for caching
- Scale PostgreSQL with better storage (SSD) and connection pooling

### Horizontal Scaling
- Multiple Next.js frontend containers behind load balancer
- Multiple Django workers (Celery) for task processing
- Redis cluster for cache and broker
- PostgreSQL read replicas for analytics/reporting
- MinIO distributed mode for object storage

## Maintenance

### Regular Tasks
- Daily: Database backup
- Weekly: Storage backup (MinIO)
- Monthly: Security updates, log review
- Quarterly: Performance review, capacity planning

### Update Process
```bash
# Pull latest code
git pull origin main

# Rebuild containers
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

# Run migrations
docker-compose exec backend python manage.py migrate

# Clear cache if needed
docker-compose exec backend python manage.py clear_cache
```

## Troubleshooting

### Common Issues
1. **Container fails to start**: Check logs with `docker-compose logs backend/frontend`
2. **Database connection errors**: Verify DATABASE_URL and that PostgreSQL is accessible
3. **MinIO connection errors**: Check credentials and network connectivity
4. **AI slow or unavailable**: Verify OLLAMA_BASE_URL and that Ollama service is running
5. **Email not sending**: Verify email credentials and that port 587 is open
6. **Stripe webhooks not working**: Verify webhook endpoint is publicly accessible and secret matches

### Logs
- Backend: `docker-compose logs -f backend`
- Frontend: `docker-compose logs -f frontend`
- Nginx: `docker-compose logs -f nginx`
- Redis: `docker-compose logs -f redis`
- MinIO: `docker-compose logs -f minio`

---

**Last Updated:** 2026-07-02  
**Reflects:** 19-app architecture with Custom Admin Dashboard priority