# Custom Test Report Generator

This directory contains the custom test report generator that parses Playwright JSON test results and provides comprehensive analysis.

## Files

- `generate-report.js` - Main report generator script

## Usage

### Basic Usage
```bash
# Generate report from existing JSON results
npm run report:generate

# Run tests and generate custom report
npm run report:custom
```

### Advanced Usage
```bash
# Generate report from specific JSON file
node scripts/generate-report.js path/to/custom-results.json

# Generate report from different test results
node scripts/generate-report.js test-results/results.json
```

## Features

### 📊 Executive Summary
- Total test count and pass/fail statistics
- Overall pass rate percentage
- Test execution duration
- Playwright version and configuration details

### 🌐 Browser-Specific Analysis
- Individual browser performance (Chromium, Firefox, WebKit)
- Pass rates per browser
- Duration comparisons across browsers
- Browser-specific error analysis

### 📋 Detailed Test Breakdown
- Individual test results with status indicators
- Test execution times for each browser
- Error details for failed tests
- Test hierarchy and organization

### ⚡ Performance Insights
- Average test duration across all tests
- Slowest and fastest test identification
- Performance bottlenecks identification
- Test execution trends

### 📄 Visual HTML Report
- Interactive charts and graphs
- Responsive design for all devices
- Easy sharing and collaboration
- Professional presentation format

## Output Files

The report generator creates:
- **Console Output**: Detailed text-based report with emojis and formatting
- **HTML Report**: `test-results/custom-report.html` - Visual web-based report

## Integration

The report generator integrates seamlessly with:
- **CI/CD Pipelines**: Generate reports after test execution
- **Development Workflow**: Quick insights during development
- **Team Collaboration**: Share visual reports with stakeholders
- **Performance Monitoring**: Track test execution trends over time

## Customization

The report generator can be customized by modifying:
- **Styling**: Update CSS in the HTML template
- **Metrics**: Add new performance calculations
- **Format**: Modify output format and structure
- **Integration**: Add new data sources or export formats
