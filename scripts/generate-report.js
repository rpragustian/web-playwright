#!/usr/bin/env node

/**
 * Test Report Generator
 * Parses Playwright JSON test results and generates comprehensive reports
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class TestReportGenerator {
  constructor(jsonFilePath) {
    this.jsonFilePath = jsonFilePath;
    this.results = null;
  }

  /**
   * Load and parse JSON test results
   */
  loadResults() {
    try {
      if (!fs.existsSync(this.jsonFilePath)) {
        throw new Error(`Test results file not found: ${this.jsonFilePath}`);
      }
      
      const jsonContent = fs.readFileSync(this.jsonFilePath, 'utf8');
      this.results = JSON.parse(jsonContent);
      console.log('✅ Test results loaded successfully');
    } catch (error) {
      console.error('❌ Error loading test results:', error.message);
      process.exit(1);
    }
  }

  /**
   * Generate comprehensive test summary
   */
  generateSummary() {
    if (!this.results) {
      throw new Error('No test results loaded');
    }

    const stats = this.results.stats;
    const config = this.results.config;
    
    console.log('\n📊 TEST EXECUTION SUMMARY');
    console.log('='.repeat(50));
    console.log(`🕐 Start Time: ${new Date(stats.startTime).toLocaleString()}`);
    console.log(`⏱️  Duration: ${(stats.duration / 1000).toFixed(2)} seconds`);
    console.log(`🔧 Playwright Version: ${config.version}`);
    console.log(`👥 Workers: ${config.workers}`);
    console.log(`📁 Test Directory: ${path.basename(config.rootDir)}`);
    
    console.log('\n📈 TEST RESULTS');
    console.log('-'.repeat(30));
    console.log(`✅ Expected (Passed): ${stats.expected}`);
    console.log(`❌ Unexpected (Failed): ${stats.unexpected}`);
    console.log(`⏭️  Skipped: ${stats.skipped}`);
    console.log(`🔄 Flaky: ${stats.flaky}`);
    
    const totalTests = stats.expected + stats.unexpected + stats.skipped;
    const passRate = totalTests > 0 ? ((stats.expected / totalTests) * 100).toFixed(1) : 0;
    console.log(`📊 Pass Rate: ${passRate}%`);
    
    return {
      totalTests,
      passed: stats.expected,
      failed: stats.unexpected,
      skipped: stats.skipped,
      flaky: stats.flaky,
      passRate: parseFloat(passRate),
      duration: stats.duration
    };
  }

  /**
   * Generate detailed test breakdown by browser
   */
  generateBrowserBreakdown() {
    if (!this.results) {
      throw new Error('No test results loaded');
    }

    console.log('\n🌐 BROWSER-SPECIFIC RESULTS');
    console.log('='.repeat(50));

    const browserStats = {};
    const projects = this.results.config.projects;

    // Initialize browser stats
    projects.forEach(project => {
      browserStats[project.name] = {
        passed: 0,
        failed: 0,
        skipped: 0,
        flaky: 0,
        total: 0,
        duration: 0
      };
    });

    // Process test results
    this.results.suites.forEach(suite => {
      this.processSuite(suite, browserStats);
    });

    // Display browser breakdown
    Object.entries(browserStats).forEach(([browser, stats]) => {
      if (stats.total > 0) {
        const passRate = ((stats.passed / stats.total) * 100).toFixed(1);
        console.log(`\n🔍 ${browser.toUpperCase()}`);
        console.log(`   ✅ Passed: ${stats.passed}`);
        console.log(`   ❌ Failed: ${stats.failed}`);
        console.log(`   ⏭️  Skipped: ${stats.skipped}`);
        console.log(`   🔄 Flaky: ${stats.flaky}`);
        console.log(`   📊 Pass Rate: ${passRate}%`);
        console.log(`   ⏱️  Duration: ${(stats.duration / 1000).toFixed(2)}s`);
      }
    });

    return browserStats;
  }

  /**
   * Process test suite recursively
   */
  processSuite(suite, browserStats) {
    // Process specs in current suite
    if (suite.specs) {
      suite.specs.forEach(spec => {
        this.processSpec(spec, browserStats);
      });
    }

    // Process nested suites
    if (suite.suites) {
      suite.suites.forEach(nestedSuite => {
        this.processSuite(nestedSuite, browserStats);
      });
    }
  }

  /**
   * Process individual test spec
   */
  processSpec(spec, browserStats) {
    if (spec.tests) {
      spec.tests.forEach(test => {
        const browser = test.projectName;
        if (browserStats[browser]) {
          browserStats[browser].total++;
          
          // Calculate duration from all results
          let totalDuration = 0;
          test.results.forEach(result => {
            totalDuration += result.duration;
          });
          browserStats[browser].duration += totalDuration;

          // Count status
          const status = test.status;
          switch (status) {
            case 'expected':
              browserStats[browser].passed++;
              break;
            case 'unexpected':
              browserStats[browser].failed++;
              break;
            case 'skipped':
              browserStats[browser].skipped++;
              break;
            case 'flaky':
              browserStats[browser].flaky++;
              break;
          }
        }
      });
    }
  }

  /**
   * Generate detailed test list
   */
  generateDetailedTestList() {
    if (!this.results) {
      throw new Error('No test results loaded');
    }

    console.log('\n📋 DETAILED TEST RESULTS');
    console.log('='.repeat(50));

    this.results.suites.forEach(suite => {
      this.displaySuite(suite, '');
    });
  }

  /**
   * Display test suite with proper indentation
   */
  displaySuite(suite, indent) {
    console.log(`${indent}📁 ${suite.title}`);
    
    if (suite.specs) {
      suite.specs.forEach(spec => {
        this.displaySpec(spec, indent + '  ');
      });
    }

    if (suite.suites) {
      suite.suites.forEach(nestedSuite => {
        this.displaySuite(nestedSuite, indent + '  ');
      });
    }
  }

  /**
   * Display individual test spec
   */
  displaySpec(spec, indent) {
    const status = spec.ok ? '✅' : '❌';
    console.log(`${indent}${status} ${spec.title}`);
    
    if (spec.tests) {
      spec.tests.forEach(test => {
        const browser = test.projectName;
        const testStatus = test.status === 'expected' ? '✅' : 
                          test.status === 'unexpected' ? '❌' : 
                          test.status === 'skipped' ? '⏭️' : '🔄';
        
        const duration = test.results.reduce((sum, result) => sum + result.duration, 0);
        console.log(`${indent}  ${testStatus} ${browser}: ${(duration / 1000).toFixed(2)}s`);
        
        // Show errors if any
        test.results.forEach(result => {
          if (result.errors && result.errors.length > 0) {
            result.errors.forEach(error => {
              console.log(`${indent}    ❌ Error: ${error.message}`);
            });
          }
        });
      });
    }
  }

  /**
   * Generate performance insights
   */
  generatePerformanceInsights() {
    if (!this.results) {
      throw new Error('No test results loaded');
    }

    console.log('\n⚡ PERFORMANCE INSIGHTS');
    console.log('='.repeat(50));

    const allDurations = [];
    let slowTests = [];

    this.results.suites.forEach(suite => {
      this.collectDurations(suite, allDurations, slowTests);
    });

    if (allDurations.length > 0) {
      const avgDuration = allDurations.reduce((sum, d) => sum + d, 0) / allDurations.length;
      const maxDuration = Math.max(...allDurations);
      const minDuration = Math.min(...allDurations);

      console.log(`📊 Average Test Duration: ${(avgDuration / 1000).toFixed(2)}s`);
      console.log(`🐌 Slowest Test: ${(maxDuration / 1000).toFixed(2)}s`);
      console.log(`🚀 Fastest Test: ${(minDuration / 1000).toFixed(2)}s`);

      // Show slowest tests
      if (slowTests.length > 0) {
        console.log('\n🐌 SLOWEST TESTS:');
        slowTests
          .sort((a, b) => b.duration - a.duration)
          .slice(0, 5)
          .forEach((test, index) => {
            console.log(`${index + 1}. ${test.title} (${test.browser}): ${(test.duration / 1000).toFixed(2)}s`);
          });
      }
    }
  }

  /**
   * Collect test durations for performance analysis
   */
  collectDurations(suite, allDurations, slowTests) {
    if (suite.specs) {
      suite.specs.forEach(spec => {
        if (spec.tests) {
          spec.tests.forEach(test => {
            test.results.forEach(result => {
              allDurations.push(result.duration);
              if (result.duration > 5000) { // Tests taking more than 5 seconds
                slowTests.push({
                  title: spec.title,
                  browser: test.projectName,
                  duration: result.duration
                });
              }
            });
          });
        }
      });
    }

    if (suite.suites) {
      suite.suites.forEach(nestedSuite => {
        this.collectDurations(nestedSuite, allDurations, slowTests);
      });
    }
  }

  /**
   * Generate HTML report
   */
  generateHTMLReport() {
    if (!this.results) {
      throw new Error('No test results loaded');
    }

    const summary = this.generateSummary();
    const browserStats = this.generateBrowserBreakdown();

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Playwright Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .card { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; }
        .card h3 { margin: 0 0 10px 0; color: #333; }
        .card .number { font-size: 2em; font-weight: bold; }
        .passed { color: #28a745; }
        .failed { color: #dc3545; }
        .skipped { color: #ffc107; }
        .flaky { color: #fd7e14; }
        .browser-stats { margin-bottom: 30px; }
        .browser-card { background: #e9ecef; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .progress-bar { background: #e9ecef; height: 20px; border-radius: 10px; overflow: hidden; margin: 10px 0; }
        .progress-fill { height: 100%; background: #28a745; transition: width 0.3s ease; }
        .test-list { margin-top: 30px; }
        .test-item { padding: 10px; margin: 5px 0; border-radius: 5px; background: #f8f9fa; }
        .test-passed { border-left: 4px solid #28a745; }
        .test-failed { border-left: 4px solid #dc3545; }
        .test-skipped { border-left: 4px solid #ffc107; }
        .test-flaky { border-left: 4px solid #fd7e14; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧪 Playwright Test Report</h1>
            <p>Generated on ${new Date().toLocaleString()}</p>
        </div>

        <div class="summary">
            <div class="card">
                <h3>Total Tests</h3>
                <div class="number">${summary.totalTests}</div>
            </div>
            <div class="card">
                <h3>Passed</h3>
                <div class="number passed">${summary.passed}</div>
            </div>
            <div class="card">
                <h3>Failed</h3>
                <div class="number failed">${summary.failed}</div>
            </div>
            <div class="card">
                <h3>Skipped</h3>
                <div class="number skipped">${summary.skipped}</div>
            </div>
            <div class="card">
                <h3>Flaky</h3>
                <div class="number flaky">${summary.flaky}</div>
            </div>
            <div class="card">
                <h3>Pass Rate</h3>
                <div class="number">${summary.passRate}%</div>
            </div>
        </div>

        <div class="browser-stats">
            <h2>🌐 Browser Results</h2>
            ${Object.entries(browserStats).map(([browser, stats]) => `
                <div class="browser-card">
                    <h3>${browser.toUpperCase()}</h3>
                    <p>Passed: ${stats.passed} | Failed: ${stats.failed} | Skipped: ${stats.skipped} | Flaky: ${stats.flaky}</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${stats.total > 0 ? (stats.passed / stats.total) * 100 : 0}%"></div>
                    </div>
                    <p>Pass Rate: ${stats.total > 0 ? ((stats.passed / stats.total) * 100).toFixed(1) : 0}%</p>
                </div>
            `).join('')}
        </div>

        <div class="test-list">
            <h2>📋 Test Details</h2>
            <p>Duration: ${(summary.duration / 1000).toFixed(2)} seconds</p>
            <p>Playwright Version: ${this.results.config.version}</p>
        </div>
    </div>
</body>
</html>`;

    const htmlPath = path.join(__dirname, '..', 'test-results', 'custom-report.html');
    fs.writeFileSync(htmlPath, htmlContent);
    console.log(`\n📄 HTML report generated: ${htmlPath}`);
  }

  /**
   * Generate complete report
   */
  generateReport() {
    console.log('🚀 Generating Test Report...\n');
    
    this.loadResults();
    this.generateSummary();
    this.generateBrowserBreakdown();
    this.generateDetailedTestList();
    this.generatePerformanceInsights();
    this.generateHTMLReport();
    
    console.log('\n✅ Report generation completed!');
    console.log('\n📁 Generated Files:');
    console.log('   • Console report (above)');
    console.log('   • HTML report: test-results/custom-report.html');
  }
}

// Main execution
const jsonFilePath = process.argv[2] || path.join(__dirname, '..', 'test-results', 'results.json');
const generator = new TestReportGenerator(jsonFilePath);
generator.generateReport();
