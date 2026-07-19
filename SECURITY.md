# Security Policy

## Supported Versions

We actively support the latest version of Maximus with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| 1.0.x   | :x:                |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Email us** at: security@maximus.dev
2. **Do not** create a public GitHub issue for security vulnerabilities.
3. We will respond within **48 hours** and work with you to resolve the issue.

Please include as much detail as possible:
- Steps to reproduce the issue
- Potential impact
- Any suggested fixes
- Version affected
- Environment details

We appreciate responsible disclosure and will credit reporters (unless they prefer to remain anonymous) in our security advisories.

## Security Best Practices

When self-hosting Maximus:

### Authentication & Authorization
- Always use strong, unique `SECRET_KEY` (minimum 64 characters)
- Enable HTTPS in production (Let's Encrypt recommended)
- Use strong passwords for all accounts (database, admin, MinIO, etc.)
- Regularly rotate API keys and tokens
- Implement rate limiting on public endpoints
- Use HTTPS for all internal service communication
- Enable account lockout after failed attempts
- Require email verification for new accounts

### Data Protection
- Encrypt sensitive data at rest (database fields, backups)
- Use parameterized queries or ORM to prevent SQL injection
- Implement proper input validation and sanitization
- Encrypt backups and store them securely
- Use environment variables for secrets (never hardcode)
- Regularly audit data access logs
- Implement data retention and deletion policies

### Infrastructure Security
- Keep all dependencies updated (use `dependabot` or similar)
- Use minimal base images (distroless when possible)
- Run containers as non-root users
- Implement network segmentation between services
- Use secrets management (HashiCorp Vault, AWS Secrets Manager, etc.)
- Scan container images for vulnerabilities
- Implement intrusion detection and prevention systems
- Regular security audits and penetration testing
- Use Web Application Firewall (WAF) for public endpoints

### Monitoring & Logging
- Implement centralized logging (ELK stack, Loki, etc.)
- Monitor for suspicious activities (brute force, unusual access patterns)
- Set up alerts for security events
- Log authentication attempts (success and failure)
- Track privileged access and changes
- Regularly review logs for anomalies
- Implement file integrity monitoring for critical systems

### Application Security
- Conduct regular security testing (SAST, DAST)
- Keep frontend dependencies updated
- Implement Content Security Policy (CSP)
- Use HTTP security headers (HSTS, X-Frame-Options, X-Content-Type-Options, etc.)
- Sanitize user-generated content to prevent XSS
- Protect against CSRF attacks
- Secure file uploads (validate type, scan for malware, store outside web root)
- Implement proper error handling (don't leak stack traces)
- Use secure cookies (HttpOnly, Secure, SameSite attributes)

## Security Features in Maximus

### Built-in Protections
- **JWT Authentication**: Access token (15min) + Refresh token (7d, httpOnly, Secure, SameSite)
- **Password Handling**: bcrypt hashing with configurable work factor
- **Rate Limiting**: Per-endpoint and per-user throttling
- **Input Validation**: Server-side validation on all endpoints
- **Output Encoding**: Automatic escaping in templates
- **CSRF Protection**: Double-submit cookie and header verification
- **SQL Injection Prevention**: ORM usage and parameterized queries
- **XSS Protection**: Context-aware escaping in templates
- **Directory Traversal Prevention**: Path validation on file operations
- **Secure Headers**: Helmet-like middleware for HTTP headers
- **Audit Logging**: Immutable logs for security-relevant events
- **Data Encryption**: Optional field-level encryption for sensitive data
- **Secrets Management**: Environment variable based configuration
- **CORS Protection**: Properly configured origins and methods
- **Clickjacking Protection**: X-Frame-Options and frame-busting scripts
- **MIME Type Sniffing Protection**: X-Content-Type-Options header
- **Referrer Policy**: Strict control over referrer information

### Infrastructure Security
- **Container Security**: Non-root users, read-only filesystems where possible
- **Network Security**: Service-to-service encryption, network policies
- **Secrets Injection**: Environment variables and secrets mounts
- **Image Scanning**: Automated vulnerability scanning in CI/CD
- **Runtime Protection**: Read-only root filesystem, dropped capabilities
- **Backup Encryption**: AES-256 encryption for backups
- **Disaster Recovery**: Regularly tested restore procedures
- **Infrastructure as Code**: Terraform/Ansible for reproducible deployments
- **Zero Trust**: Mutual TLS between services where applicable

## Security Updates

Security patches are released as:
- **Patch releases** (x.y.Z) for critical vulnerabilities
- **Minor releases** (x.Y.z) for important security improvements
- **Major releases** (x.y.z) may include security enhancements

Update notifications are posted to:
- GitHub Security Advisories
- Project mailing list
- Release notes

## Compliance

Maximus is designed to help organizations comply with:
- **GDPR**: Data subject rights, consent management, data portability
- **CCPA**: Consumer privacy rights, opt-out mechanisms
- **HIPAA**: With proper configuration and BAA (Business Associate Agreement)
- **SOC 2**: Security, availability, processing integrity principles
- **ISO 27001**: Information security management system framework
- **PCI DSS**: For payment processing (when using Stripe as directed)

## Resources

- [OWASP Top Ten](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/archive.html)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [SANS Top 20 Critical Security Controls](https://www.sans.org/critical-security-controls/)

## Security Team

The security team can be reached at security@maximus.dev for:
- Vulnerability reports
- Security questions
- Compliance inquiries
- Security architecture review requests

**Remember**: Security is a shared responsibility. While we strive to make Maximus secure by default, the final security posture depends on proper configuration, maintenance, and operational practices by the deploying organization.