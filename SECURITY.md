# Security Policy

## Supported Versions

We provide security updates for the following versions of CVAts:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security bugs seriously. We appreciate your efforts to responsibly disclose your findings, and will make every effort to acknowledge your contributions.

### How to Report a Security Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: **renatokhael@gmail.com**

You should receive a response within 48 hours. If for some reason you do not, please ping us again or contact us via other means.

### What to Include

Please include the following information in your report:

- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### What to Expect

After you submit a report, we will:

1. Confirm receipt of your vulnerability report within 48 hours
2. Provide regular updates on our progress
3. Credit you for the discovery (unless you prefer to remain anonymous)
4. Once verified, patch the security vulnerability as quickly as possible
5. Notify users through appropriate channels when applicable

### Security Considerations for CVAts

Since CVAts is a client-side application that runs locally in the browser, there are some important security considerations:

#### Data Privacy

- **Local Storage**: All resume data is stored locally in the browser's localStorage/sessionStorage
- **No Backend Storage**: We intentionally do not store any user data on our servers
- **PDF Generation**: PDFs are generated client-side using react-pdf

#### Browser Security

- **Content Security Policy**: We implement CSP headers to prevent XSS attacks
- **CORS**: Proper CORS policies for any external resources
- **HTTPS**: Always use HTTPS in production to protect data in transit

#### File Handling

- **PDF Upload**: PDF parsing happens client-side using PDF.js
- **Input Validation**: All user inputs are validated and sanitized
- **File Type Validation**: Only PDF files are accepted for resume parsing

### Security Best Practices for Contributors

When contributing to CVAts, please follow these security best practices:

1. **Input Validation**: Always validate and sanitize user inputs
2. **XSS Prevention**: Avoid using `dangerouslySetInnerHTML` unless absolutely necessary
3. **Dependency Security**: Keep dependencies updated and audit them regularly
4. **Environment Variables**: Never commit sensitive data or API keys
5. **Code Review**: All security-related changes should undergo thorough review

### Known Security Considerations

- **PDF Processing**: PDF parsing uses PDF.js which runs client-side. While this is secure, users should only upload trusted PDF files
- **Browser Storage**: Data persistence relies on browser storage mechanisms, which users should be aware of
- **External Links**: All external links are properly marked with `rel="noopener noreferrer"`

### Vulnerability Disclosure Timeline

We follow responsible disclosure practices:

- **0-1 days**: Initial response to vulnerability report
- **1-3 days**: Triage and initial assessment
- **1-7 days**: Development of fix (depending on severity)
- **1-3 days**: Testing and validation of fix
- **Within 24 hours**: Release of fix to production
- **Within 1 week**: Public disclosure (if appropriate)

### Recognition

Security researchers who responsibly disclose vulnerabilities will be:

- Credited in our security advisory (unless anonymity is preferred)
- Listed in our security hall of fame
- Eligible for acknowledgment in release notes

Thank you for helping keep CVAts and its users safe!
