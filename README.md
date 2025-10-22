# Semantic Trusted Release GitHub Action

> Trusted publishing via Semantic Release in a simple action

## Example

```yaml
name: Publish

on: [push]

permissions:
  id-token: write # for publishing releases
  contents: write # for making github release
  pull-requests: write # for commenting release version
  issues: write # for commenting release version

jobs:
  build:
    runs-on: ubuntu-latest
    environment: npm
    steps:
      # For security please pin this to the SHA of the latest release
      #  - https://github.com/actions/checkout/releases/latest
      - uses: actions/checkout@{sha}
        with:
          # This is key, ensure that you set this on your checkout
          persist-credentials: false
      # For security please pin this to the SHA of the latest release
      #  - https://github.com/electron/semantic-trusted-release/releases/latest
      - uses: electron/semantic-trusted-release@{sha}
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```
