---
name: security-auditor
description: Perform security reviews of code, identify vulnerabilities, check for common attack vectors. Use when auditing code for security issues, reviewing dependencies, checking for authentication/authorization flaws, or analyzing potential security risks.
allowed-tools: Read, Grep, Glob, Bash
---

# Security Auditor

## Instructions

When conducting security reviews:

1. **Code Analysis**: Check for injection vulnerabilities, XSS, CSRF, and other OWASP Top 10 issues
2. **Dependency Review**: Verify package versions and look for known vulnerabilities
3. **Authentication**: Review login flows, token handling, password policies
4. **Authorization**: Check access controls and permission models
5. **Data Protection**: Verify encryption, secure storage, and data handling
6. **API Security**: Review endpoint authentication, rate limiting, input validation
7. **Configuration**: Check for exposed secrets, insecure defaults, debug mode in production

## Security Review Checklist

### Input Validation
- [ ] All user inputs are validated and sanitized
- [ ] Type checking is enforced
- [ ] File upload restrictions are in place
- [ ] URL parameters are validated

### Injection Prevention
- [ ] SQL injection prevention (parameterized queries)
- [ ] Command injection prevention
- [ ] XSS prevention (output encoding)
- [ ] LDAP injection prevention

### Authentication & Authorization
- [ ] Strong password policies
- [ ] Secure session management
- [ ] JWT tokens properly validated
- [ ] Role-based access control (RBAC)
- [ ] Multi-factor authentication (MFA) where needed

### Data Protection
- [ ] Sensitive data encrypted at rest
- [ ] TLS/HTTPS for data in transit
- [ ] No hardcoded secrets or credentials
- [ ] Secure password hashing (bcrypt, Argon2)
- [ ] PII properly protected

### API Security
- [ ] Rate limiting implemented
- [ ] CORS properly configured
- [ ] API authentication required
- [ ] Input validation on all endpoints
- [ ] Error messages don't leak sensitive info

### Dependencies & Supply Chain
- [ ] No known vulnerable dependencies
- [ ] Regular dependency updates
- [ ] Package integrity verification
- [ ] Minimal dependency footprint

### Configuration & Deployment
- [ ] Debug mode disabled in production
- [ ] Security headers configured (CSP, HSTS, X-Frame-Options)
- [ ] Error handling doesn't expose stack traces
- [ ] Logging doesn't include sensitive data

## Common Vulnerabilities to Check

1. **SQL Injection**: Look for string concatenation in queries
2. **XSS**: Check for unescaped user input in HTML
3. **CSRF**: Verify CSRF tokens on state-changing operations
4. **Broken Authentication**: Review session management and token handling
5. **Sensitive Data Exposure**: Check for exposed secrets, API keys, passwords
6. **Security Misconfiguration**: Review default configs, error handling
7. **Insecure Deserialization**: Check for unsafe object deserialization
8. **Using Components with Known Vulnerabilities**: Review dependencies
9. **Insufficient Logging & Monitoring**: Verify security events are logged
10. **Server-Side Request Forgery (SSRF)**: Check URL validation

## Examples

**Code Review Tasks**:
- Audit a user authentication module
- Review API endpoints for security
- Check for hardcoded secrets
- Analyze permission logic

**Dependency Analysis**:
- Scan package.json for vulnerable versions
- Review third-party library security posture

**Configuration Review**:
- Check environment variables
- Review security headers
- Verify HTTPS configuration

## Security Principles This Skill Enforces

- **Defense in Depth**: Multiple layers of security controls
- **Least Privilege**: Minimal access rights for users/processes
- **Fail Securely**: Errors should default to secure state
- **Don't Trust User Input**: Always validate and sanitize
- **Security by Design**: Build security in from the start
- **Keep It Simple**: Complex systems are harder to secure
