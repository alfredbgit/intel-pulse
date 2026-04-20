const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const htmlPath = '/Users/alfredbutler/Projects/alfreds-apps/intel-pulse/reports/midtown-auto-repair.html';
  const pdfPath = path.join('/Users/alfredbutler/Projects/alfreds-apps/intel-pulse/reports', 'midtown-auto-repair.pdf');

  console.log('Loading HTML...');
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });

  console.log('Generating PDF...');
  await page.pdf({
    path: pdfPath,
    format: 'Letter',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });

  const stats = fs.statSync(pdfPath);
  console.log(`PDF generated: ${pdfPath} (${(stats.size / 1024).toFixed(1)} KB)`);

  await browser.close();
}

generatePDF().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
