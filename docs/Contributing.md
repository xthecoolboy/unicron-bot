# Contributing Guidelines

When contributing to this repository, please first discuss the change you wish
to make via issue, discord, or any other method with the owners of this repository
before making a change.

Please note we have a [code of conduct](Code_of_Conduct.md), please follow it in all your interactions
with the project.

## Pull Request Process

If you'd like to contribute to Unicron, start by forking the repository on GitHub:

https://github.com/oadpoaw/unicron-bot

 The best way to get your changes merged back into core is as follows:

- If you are about to add a larger feature, open an issue on the GitHub issue
  tracker to discuss your ideas first. If whatever you're about to implement is
  already in the issue tracker, please let us know that you picked it up.

- Clone down your fork.

- Create a thoughtfully named topic branch to contain your change.

- Write some code.

- Add tests and make sure everything still passes by running bundle exec rake.
  This is mandatory for pull requests to be accepted.

- If you are adding new functionality, document it!

- Do not change the version number.

- If necessary, rebase your commits into logical chunks, without errors.

- Push the branch up to GitHub.

- Send a pull request to the oadpoaw/unicron-bot project.

Also see [Installation](Installation.md)

## Contributions welcome!

**Before spending lots of time on something, ask for feedback on your idea first!**

Please search [issues](../../../issues/) and [pull requests](../../../pulls/) before adding something new! This helps avoid duplicating efforts and conversations.

This project welcomes any kind of contribution! Here are a few suggestions:

- **Ideas**: participate in an issue thread or start your own to have your voice heard.
- **Writing**: contribute your expertise in an area by helping expand the included content.
- **Copy editing**: fix typos, clarify language, and generally improve the quality of the content.
- **Formatting**: help keep content easy to read with consistent formatting.
- **Code**: help maintain and improve the project codebase.

## Code Style

[![standard][standard-image]][standard-url]

This repository uses [`standard`][standard-url] to maintain code style and consistency, and to avoid style arguments.

[standard-image]: https://cdn.rawgit.com/feross/standard/master/badge.svg
[standard-url]: https://github.com/feross/standard
[semistandard-image]: https://cdn.rawgit.com/flet/semistandard/master/badge.svg
[semistandard-url]: https://github.com/Flet/semistandard

## Project Governance

**This is an [OPEN Open Source Project](http://openopensource.org/).**

Individuals making significant and valuable contributions are given commit access to the project to contribute as they see fit. This project is more like an open wiki than a standard guarded open source project.

### Rules

There are a few basic ground rules for collaborators:

1. **No `--force` pushes** or modifying the Git history in any way.
2. **Non-master branches** ought to be used for ongoing work.
3. **External API changes and significant modifications** ought to be subject to an **internal pull request** to solicit feedback from other contributors.
4. Internal pull requests to solicit feedback are *encouraged* for any other non-trivial contribution but left to the discretion of the contributor.
5. Contributors should attempt to adhere to the prevailing code style.

### Releases

Declaring formal releases remains the prerogative of the project maintainer.

### Changes to this arrangement

This is an experiment and feedback is welcome! This document may also be subject to pull requests or changes by contributors where you believe you have something valuable to add or change.
