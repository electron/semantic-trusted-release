const fs = require('fs');
const path = require('path');

async function run() {
  if (!process.env.DIR) {
    console.error('DIR environment variable is not set');
    process.exit(1);
  }

  // semantic-release is installed in DIR, but we run from the user's project
  const semanticReleasePath = path.join(process.env.DIR, 'node_modules', 'semantic-release');

  let semanticRelease;
  try {
    semanticRelease = require(semanticReleasePath);
  } catch (error) {
    console.error(`Failed to load semantic-release from ${semanticReleasePath}:`, error.message);
    process.exit(1);
  }

  try {
    const result = await semanticRelease.default();

    const output = [];

    if (result && result.nextRelease && result.nextRelease.version) {
      output.push('new-release-published=true');
      output.push(`new-release-version=${result.nextRelease.version}`);
      console.log(`Published release ${result.nextRelease.version}`);
    } else {
      output.push('new-release-published=false');
      output.push('new-release-version=');
      console.log('No release published');
    }

    // Write outputs to GITHUB_OUTPUT
    const githubOutput = process.env.GITHUB_OUTPUT;
    if (githubOutput) {
      fs.appendFileSync(githubOutput, output.join('\n') + '\n');
    }

    process.exit(0);
  } catch (error) {
    console.error('semantic-release failed:');
    if (error.stack) {
      console.error(error.stack);
    } else {
      console.error(error.message || error);
    }
    process.exit(1);
  }
}

run();
