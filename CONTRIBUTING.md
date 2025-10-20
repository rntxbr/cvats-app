# Contributing to CVAts

First off, thank you for considering contributing to CVAts! It's people like you that make CVAts such a great tool.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Pull Requests](#pull-requests)
- [Style Guidelines](#style-guidelines)
  - [Git Commit Messages](#git-commit-messages)
  - [TypeScript Style Guide](#typescript-style-guide)
  - [React/Next.js Best Practices](#reactnextjs-best-practices)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Additional Notes](#additional-notes)

## Code of Conduct

This project and everyone participating in it is governed by the [CVAts Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [renatokhael@gmail.com](mailto:renatokhael@gmail.com).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps which reproduce the problem** in as many details as possible.
- **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets.
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected to see instead and why.**
- **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem.
- **If the problem is related to performance or memory**, include browser console outputs and performance profiles.
- **Include your browser version and operating system**.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
- **Provide specific examples to demonstrate the steps** or point out the part of CVAts where the suggestion is related to.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
- **Include screenshots and animated GIFs** which help demonstrate the steps or point out the part of CVAts the suggestion is related to.
- **Explain why this enhancement would be useful** to most CVAts users.

### Your First Code Contribution

Unsure where to begin contributing to CVAts? You can start by looking through these `good-first-issue` and `help-wanted` issues:

- **Good first issues** - issues which should only require a few lines of code, and a test or two.
- **Help wanted issues** - issues which should be a bit more involved than `good-first-issue` issues.

### Pull Requests

The process described here has several goals:

- Maintain CVAts's quality
- Fix problems that are important to users
- Engage the community in working toward the best possible CVAts
- Enable a sustainable system for CVAts's maintainers to review contributions

Please follow these steps:

1. **Fork the repository** and create your branch from `main`.
2. **Clone your fork** to your local machine.
3. **Create a new branch** with a descriptive name:
   ```bash
   git checkout -b feature/my-new-feature
   # or
   git checkout -b fix/issue-description
   ```
4. **Make your changes** following the [style guidelines](#style-guidelines).
5. **Test your changes** thoroughly.
6. **Commit your changes** using descriptive commit messages.
7. **Push to your fork** and submit a pull request to the `main` branch.
8. **Wait for review** - maintainers will review your PR and may request changes.

#### Pull Request Guidelines

- Fill in the required template
- Do not include issue numbers in the PR title
- Include screenshots and animated GIFs in your pull request whenever possible
- Follow the [TypeScript](#typescript-style-guide) and [React](#reactnextjs-best-practices) style guides
- Include thoughtfully-worded, well-structured tests
- Document new code based on the Documentation Styleguide
- End all files with a newline
- Avoid platform-dependent code

## Style Guidelines

### Git Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification to create an explicit commit history, which makes it easier to write automated tools on top of.

#### Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Type

Must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

#### Scope (optional)

The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages).

#### Description

The description contains succinct description of the change:

- Use the imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize the first letter
- No dot (.) at the end

#### Examples

```bash
# Basic format
feat: add resume import functionality
fix: resolve PDF parsing issue in Chrome
docs: update installation instructions

# With scope
feat(resume-parser): add support for multiple PDF formats
fix(ui): correct button alignment in mobile view
docs(api): add TypeScript examples

# With body for breaking changes
feat(api)!: remove deprecated resume-v1 endpoint

BREAKING CHANGE: The resume-v1 API endpoint has been removed.
Please use resume-v2 instead.

# With footer for issue references
fix: resolve PDF generation timing issue

Closes #123
Fixes #456
```

#### Breaking Changes

If the commit introduces a breaking change, append `!` to the type/scope (e.g., `feat!:`, `fix!:`) and include a BREAKING CHANGE footer in the commit message body or footer.

#### Best Practices

- Keep the subject line under 50 characters
- Capitalize the subject line
- Do not end the subject line with a period
- Use the imperative mood in the subject line ("Add feature" not "Added feature")
- Use the body to explain what and why vs. how
- Can use multiple lines with `-` for bullet points in body
- Reference issues and pull requests liberally after the first line

### TypeScript Style Guide

- Use TypeScript for all new code
- Follow the existing code style (we use Prettier for formatting)
- Use meaningful variable and function names
- Add types to all function parameters and return values
- Avoid using `any` type - use `unknown` if type is truly unknown
- Use interfaces for object shapes, types for unions/intersections
- Export types and interfaces that might be reused
- Use optional chaining (`?.`) and nullish coalescing (`??`) operators where appropriate

Example:

```typescript
// Good
interface UserProfile {
  name: string;
  email: string;
  age?: number;
}

function formatUserProfile(user: UserProfile): string {
  return `${user.name} (${user.email})`;
}

// Bad
function formatUserProfile(user: any) {
  return user.name + " (" + user.email + ")";
}
```

### React/Next.js Best Practices

- Use functional components with hooks instead of class components
- Follow the React hooks rules (hooks only at top level, only in React functions)
- Keep components small and focused on a single responsibility
- Use meaningful component and prop names
- Extract reusable logic into custom hooks
- Use proper TypeScript types for props and state
- Follow Next.js file-based routing conventions
- Use Next.js `Link` component for internal navigation
- Optimize images using Next.js `Image` component
- Use Tailwind CSS utility classes for styling
- Follow the project's existing component structure

Example:

```typescript
// Good
interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button = ({
  onClick,
  disabled = false,
  children,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-lg border-2 border-black bg-blue-400 px-4 py-2"
    >
      {children}
    </button>
  );
};

// Bad
export const Button = (props: any) => {
  return <button onClick={props.onClick}>{props.children}</button>;
};
```

## Development Setup

1. **Prerequisites**

   - Node.js 18.x or higher
   - npm, yarn, or pnpm package manager
   - Git

2. **Clone the repository**

   ```bash
   git clone https://github.com/rntxbr/cvats-app.git
   cd cvats-app
   ```

3. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   - Navigate to [http://localhost:3000](http://localhost:3000)

6. **Make your changes**
   - The app will automatically reload when you save files

## Project Structure

```
cvats-app/
├── public/              # Static files (images, fonts, etc.)
├── src/app/            # Next.js app directory
│   ├── components/     # Reusable React components
│   ├── lib/           # Utility functions and libraries
│   ├── home/          # Home page components
│   ├── resume-builder/     # Resume builder page
│   ├── resume-import/      # Resume import page
│   └── resume-parser/      # Resume parser page
├── LICENSE            # AGPL-3.0 License
├── README.md          # Project documentation
├── CONTRIBUTING.md    # This file
└── package.json       # Project dependencies and scripts
```

Key directories:

- `src/app/components/Resume/ResumePDF/` - PDF generation components
- `src/app/lib/parse-resume-from-pdf/` - PDF parsing logic
- `src/app/lib/redux/` - Redux state management
- `src/app/components/ResumeForm/` - Resume form components

## Testing

Currently, the project has basic tests. We welcome contributions to improve test coverage!

To run tests:

```bash
npm run test
```

When adding new features, please include tests:

- Unit tests for utility functions
- Component tests for React components
- Integration tests for complex flows

## Additional Notes

### ATS Optimization

CVAts focuses on ATS (Applicant Tracking System) optimization. When contributing features:

- Ensure PDF output remains ATS-friendly (single column, standard fonts, proper structure)
- Avoid features that might confuse ATS systems (images, complex layouts, tables)
- Test with actual ATS systems when possible

### Privacy First

CVAts is committed to privacy:

- All data should be stored locally in the browser
- No backend calls for storing user data
- No registration required
- Clearly document any external API calls

### Accessibility

We strive to make CVAts accessible to everyone:

- Use semantic HTML elements
- Include proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers when possible
- Maintain good color contrast ratios

### Performance

Keep CVAts fast and responsive:

- Optimize images and assets
- Use code splitting where appropriate
- Minimize bundle size
- Profile performance for critical paths
- Use React best practices for performance

## Questions?

Don't hesitate to ask questions! You can:

- Open an issue with your question
- Email the maintainer at [renatokhael@gmail.com](mailto:renatokhael@gmail.com)
- Check existing issues and discussions

## Recognition

Contributors will be recognized in our README and release notes. Thank you for making CVAts better!

---

**Happy Contributing! 🎉**
