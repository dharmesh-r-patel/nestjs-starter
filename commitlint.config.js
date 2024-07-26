// module.exports = { extends: ['@commitlint/config-conventional'] };

module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'body-leading-blank': [2, 'always'],
        'footer-leading-blank': [2, 'always'],
        'header-max-length': [2, 'always', 72],
        'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
        'subject-empty': [2, 'never'],
        'subject-full-stop': [2, 'never', '.'],
        'type-case': [2, 'always', 'lower-case'],
        'type-empty': [2, 'never'],
        'type-enum': [
            2,
            'always',
            [
                'build', // Changes that affect the build system or external dependencies
                'chore', // Other changes that don't modify src or test files
                'ci', // Changes to our CI configuration files and scripts
                'docs', // Documentation only changes
                'feat', // A new feature
                'fix', // A bug fix
                'perf', // A code change that improves performance
                'refactor', // A code change that neither fixes a bug nor adds a feature
                'revert', // Reverts a previous commit
                'style', // Changes that do not affect the meaning of the code (white-space, formatting, etc)
                'test', // Adding missing tests or correcting existing tests
            ],
        ],
    },
};

// 1. feat
// Description: A new feature for the user.
// Example: feat(auth): add user login endpoint
// Use Case: Adding a new endpoint, new component, or any feature that provides new functionality.

// 2. fix
// Description: A bug fix.
// Example: fix(auth): correct token expiration issue
// Use Case: Fixing a bug in the code, such as correcting a function, fixing a UI issue, or resolving an error.

// 3. docs
// Description: Documentation changes only.
// Example: docs(readme): update installation instructions
// Use Case: Updating README files, inline documentation, or any other project documentation.

// 4. style
// Description: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
// Example: style(auth): format code according to style guide
// Use Case: Reformatting code, adding missing semicolons, correcting indentation, etc.

// 5. refactor
// Description: A code change that neither fixes a bug nor adds a feature.
// Example: refactor(auth): optimize authentication middleware
// Use Case: Refactoring code to improve performance, readability, or maintainability without changing its external behavior.

// 6. test
// Description: Adding missing tests or correcting existing tests.
// Example: test(auth): add unit tests for login service
// Use Case: Writing new test cases, updating existing tests, or fixing broken tests.

// 7. chore
// Description: Changes to the build process or auxiliary tools and libraries such as documentation generation.
// Example: chore(deps): update dependency versions
// Use Case: Updating build scripts, package management, configurations, or other maintenance tasks that do not modify the actual source code.

// 8. build
// Description: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
// Example: build(deps): update webpack to version 5
// Use Case: Changes in build tools, dependency upgrades, or configuration files related to the build process.

// 9. ci
// Description: Changes to your CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs).
// Example: ci(github-actions): add new workflow for testing
// Use Case: Updating or adding continuous integration configurations and scripts.

// 10. perf
// Description: A code change that improves performance.
// Example: perf(auth): improve login response time
// Use Case: Enhancing performance in the application, such as optimizing algorithms or queries.

// 11. revert
// Description: Reverts a previous commit.
// Example: revert: revert "feat(auth): add user login endpoint"
// Use Case: Undoing a previous commit that introduced a bug or unwanted feature.

// feat(api): add user authentication endpoint

// This adds a new endpoint for user authentication, including JWT token generation and validation.

// Closes #42

// feat(api): add user authentication endpoint

// This adds a new endpoint for user authentication, including JWT token generation and validation.

// Closes #42

// git commit -m "feat(api): change authentication method to OAuth2" -m "BREAKING CHANGE: The authentication method has been changed from JWT to OAuth2, which is not backward-compatible."
