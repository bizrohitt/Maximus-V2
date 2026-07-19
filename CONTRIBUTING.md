# Contributing to Maximus

Thank you for your interest in contributing to **Maximus**!

## How to Contribute

1. **Fork** the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a **Pull Request**

## GitHub Setup

### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `maximus`
3. Description: `Maximus - Modern CMS + SaaS + SEO Tools Ecosystem Platform`
4. Visibility: Choose **Public** or **Private**
5. **Do NOT** initialize with README, .gitignore, or license
6. Click **Create repository**

### Step 2: Connect from Your Local Machine

After creating the repository, run these commands from your computer:

```bash
# 1. Clone the empty repository
git clone https://github.com/YOUR_USERNAME/maximus.git

# 2. Copy all files from this workspace into the cloned folder
# (Replace the contents of the cloned maximus folder with the files from here)

# 3. Commit and push
cd maximus
git add .
git commit -m "Initial commit - Production ready v2.0"
git push -u origin main
```

### Step 3: Future Updates

Since this AI environment **cannot push directly to GitHub**, follow this workflow:

#### When AI makes new changes:
1. **Download** the updated `maximus` folder from this workspace.
2. Replace the files in your local repository.
3. Run the following commands:
```bash
git add .
git commit -m "feat: describe your changes here"
git push
```

#### Recommended Workflow
- **GitHub** = Single source of truth
- **Your local machine** = Where you commit and push
- **This AI** = Used for planning and code generation

### CI/CD Pipeline

The repository includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:
- Runs on every push to main and pull requests
- Installs dependencies
- Runs linting (flake8, eslint, prettier)
- Runs tests (pytest, jest)
- Builds Docker images
- Performs security checks

### Release Process

1. Update version in `pyproject.toml` or `package.json` (if applicable)
2. Update `CHANGELOG.md` with changes
3. Update `PROJECT_STATE.md` if needed
4. Commit changes: `git commit -m "chore: release vX.Y.Z"`
5. Tag release: `git tag vX.Y.Z`
6. Push tags: `git push --tags`
7. GitHub Actions will automatically build and publish Docker images

### Troubleshooting

#### Permission Denied (publickey)
- Ensure your SSH key is added to your GitHub account
- Or use HTTPS instead of SSH

#### Repository Not Found
- Verify the repository name and your username
- Check repository visibility (private vs public)

#### Push Rejected
- Pull latest changes first: `git pull`
- Resolve any merge conflicts
- Try pushing again

## Current Development Focus

As of 2026-07-02, the primary development focus is:
- **Custom Admin Dashboard** (Phase 5) - Unifying Wagtail CMS + Django Admin + custom features
- Production polish (Stripe webhooks, email marketing, onboarding)

Please prioritize contributions that align with these goals.

## Development Guidelines

### Architecture
- Follow the existing architecture (**services.py** for business logic)
- All models must inherit from `BaseModel` (UUID, timestamps)
- Keep views thin - move business logic to services
- Use Django's ORM properly (select_related/prefetch_related to avoid N+1)

### Frontend
- Use design tokens instead of hardcoded colors (`var(--token-name)`)
- Follow the 8pt grid system for spacing
- Mobile-first responsive design
- Next.js App Router with route groups
- TypeScript strict mode enforced
- React Server Components by default (use 'use client' only when needed)
- Tailwind CSS with `@apply` for component styling
- **Alpine.js only** in Wagtail/CMS templates (`templates/`)
- **React only** in Next.js app (`frontend/app/`)
- **Never** mix Alpine.js and React on the same interactive element

### Styling & Design System
- **All styling must use design tokens** - never hardcode colors, spacing, or fonts
- Refer to [docs/design-system.md](docs/design-system.md) for complete specifications
- Use CSS custom properties (`var(--token)`) in global styles
- Use Tailwind utility classes that map to design tokens in components
- Dark mode support required for all UI components
- Accessibility (WCAG AA) mandatory

### Backend Specifics
- **API Response Envelopes** - Use standard format:
  ```json
  // Success: {"success":true,"data":{},"message":"...","errors":null,"meta":{"page":1,"per_page":20,"total":100}}
  // Error:   {"success":false,"data":null,"message":"Human-readable","errors":{"field":["detail"]},"code":"ERROR_CODE"}
  ```
- **Service Layer** - All business logic in `services.py`, never in views or models
- **Validators** - Put complex validation in `validators.py` or as field validators
- **Choices** - Define choices as `Choices` enums in models
- **Managers** - Use custom managers for common querysets
- **Signals** - Use sparingly and document clearly

### Database
- Migrations: `python manage.py makemigrations` and `python manage.py migrate`
- Indexes: Add `db_index=True` to frequently queried/filtered fields
- Constraints: Use `CheckConstraint`, `UniqueConstraint` where appropriate
- Testing: Use `pytest-django` with transactional tests

### Testing
- Write tests for new features and bug fixes
- Unit tests for services and utilities
- Integration tests for API endpoints
- Use factories (factory_boy) for test data
- Aim for 80%+ coverage on new code

## Code Style

### Python
- Follow [PEP 8](https://pep8.org/)
- Line length: 88 characters (Black default)
- Use [Black](https://black.readthedocs.io/) for formatting
- Use [isort](https://pycqa.github.io/isort/) for imports
- Type hints encouraged for new code
- Docstrings: Use Google or NumPy style

### TypeScript/JavaScript
- Use `eslint` and `prettier` configurations in repo
- Strict mode: `"strict": true` in tsconfig.json
- Prefer interfaces over types for object shapes
- Named exports preferred over default exports
- Async/await over .then() chains
- Proper error handling with try/catch

### Commit Messages
Use conventional commits format:
```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

Examples:
- `feat(auth): add password reset functionality`
- `fix(api): resolve 500 error in tool execution endpoint`
- `docs(design-system): add button component guidelines`
- `refactor(services): extract user validation logic`
- `test(leads): add unit tests for lead scoring`

## Reporting Issues

Please use the GitHub Issues template with:
- Clear, descriptive title
- Steps to reproduce (if applicable)
- Expected vs actual behavior
- Screenshots or screen recordings (if UI)
- Environment details (browser, OS, etc.)
- Relevant logs or error messages

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Community

- Be respectful and inclusive
- Welcome constructive feedback
- Help others in discussions and issues
- Credit contributors appropriately

---

*Last updated: 2026-07-02*