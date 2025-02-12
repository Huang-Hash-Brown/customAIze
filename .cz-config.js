module.exports = {
  types: [
    { value: 'feat', name: '✨ feat: A new feature' },
    { value: 'fix', name: '🐛 fix: A bug fix' },
    { value: 'docs', name: '📝 docs: Documentation only changes' },
    {
      value: 'style',
      name: '💄 style: Changes that do not affect the meaning of the code (white-space, formatting, etc.)',
    },
    {
      value: 'refactor',
      name: '🔨 refactor: A code change that neither fixes a bug nor adds a feature',
    },
    { value: 'perf', name: '⚡ perf: A code change that improves performance' },
    {
      value: 'test',
      name: '✅ test: Adding missing tests or correcting existing tests',
    },
    {
      value: 'build',
      name: '📦 build: Changes that affect the build system or external dependencies',
    },
    {
      value: 'ci',
      name: '👷 ci: Changes to CI configuration files and scripts',
    },
    {
      value: 'chore',
      name: `🔧 chore: Other changes that don't modify src or test files`,
    },
    { value: 'revert', name: '⏪ revert: Reverts a previous commit' },
  ],
  defaultType: 'feat', // Set default commit type to "feature"
  defaultScope: '', // Leave scope empty by default
  defaultSubject: '', // Leave subject empty by default
  defaultBody: '', // Leave body empty by default
  defaultFooter: '', // Leave footer empty by default
  emojiAlign: 'center', // Optional: Center emojis in the prompt
  useEmoji: true, // Enable emojis in commit messages
  allowBreakingChanges: ['feat', 'fix'], // Allow breaking changes for specific types
  breakingPrefix: 'BREAKING CHANGE: ', // Prefix for breaking changes
  upperCaseSubject: false, // Allow lowercase in subjects
};
