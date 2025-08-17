const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

const axiosDir = path.join(projectRoot, 'node_modules', 'axios');
const formDataDir = path.join(projectRoot, 'node_modules', 'form-data');
const destDir = path.join(axiosDir, 'node_modules', 'form-data');
const destParentDir = path.join(axiosDir, 'node_modules');

console.log('Running postinstall script for n8n-nodes-zalo-an...');

if (!fs.existsSync(axiosDir) || !fs.existsSync(formDataDir)) {
  console.log('axios or form-data directory not found. Skipping copy operation.');
  process.exit(0);
}

try {
  if (fs.existsSync(destDir)) {
    console.log('Nested form-data directory already exists. Skipping.');
    process.exit(0);
  }

  console.log(`Ensuring destination directory exists: ${destParentDir}`);
  fs.mkdirSync(destParentDir, { recursive: true });

  console.log(`Copying from ${formDataDir} to ${destDir}`);
  fs.cpSync(formDataDir, destDir, { recursive: true });

  console.log('Successfully created nested form-data directory for axios compatibility.');
} catch (error) {
  console.error('Error during postinstall script:', error);
  process.exit(0);
}
