# 🛡️ Enhanced Console Blocker

A comprehensive JavaScript-based solution for blocking developer tools access and protecting web content from inspection.

## ✨ Features

### Keyboard Shortcut Blocking
- **Modern Implementation**: Uses `event.key` instead of deprecated `keyCode`
- **Cross-Platform Support**: Works on Windows, Mac, and Linux
- **Comprehensive Coverage**: Blocks all major dev tools shortcuts
  - `F12` - Developer Tools
  - `Ctrl+Shift+I/C/J/K` - Various dev tools (Windows/Linux)
  - `Cmd+Alt+I/C/J/K` - Mac equivalents
  - `Ctrl+U` / `Cmd+U` - View Source

### Developer Tools Detection
- **8 Detection Methods**: Multiple detection approaches for maximum accuracy
  1. **Timing Detection**: Debugger execution time analysis
  2. **Console Access**: Property getter triggers on dev tools access
  3. **Function Debugger**: Dynamic function creation with debugger
  4. **Window Size**: Outer vs inner window dimension comparison
  5. **Console Redirect**: Console method override detection
  6. **Element Inspection**: DOM element property access monitoring
  7. **Network Monitoring**: XMLHttpRequest override detection
  8. **Source Access**: Script source property access detection
- **Smart Filtering**: Requires multiple methods to agree, reducing false positives
- **Performance Optimized**: Throttled checks to prevent performance impact
- **Visual Feedback**: Warning overlay with blur effects when detected
- **Environment Check**: Detects headless browsers and automation tools

### Additional Protections
- **Context Menu Blocking**: Prevents right-click access to dev tools
- **Text Selection Blocking**: Prevents content selection and copying
- **Drag Prevention**: Blocks dragging elements to inspect them
- **Console Method Monitoring**: Detects when console functions are used
- **Eval Disabling**: Prevents code injection via eval()
- **Visual Warning System**: Blur effects and overlay warnings
- **Suspicious Environment Detection**: Identifies automated browsers and tools

## 📁 Files

- `blocker.html` - Improved keyboard shortcut and basic dev tools detection
- `detect.html` - Enhanced multi-method developer tools detection
- `enhanced-blocker.html` - **Recommended** - Complete solution with all features

## 🚀 Usage

### Basic Usage
Include the script in your HTML:

```html
<script src="blocker.html"></script>
```

### Advanced Usage (Recommended)
Use the enhanced version for full protection:

```html
<!-- Copy the script from enhanced-blocker.html -->
```

### Configuration
The enhanced version allows customization:

```javascript
// Access configuration object
window.consoleBlockerConfig.enableContextMenu = true;  // Allow right-click
window.consoleBlockerConfig.detectionInterval = 5000;  // Check every 5 seconds
```

## ⚙️ Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `detectionThreshold` | 100 | Milliseconds delay threshold for debugger detection |
| `maxDetectionAttempts` | 3 | Number of attempts before triggering action |
| `detectionInterval` | 2000 | Milliseconds between periodic checks |
| `throttleInterval` | 500 | Milliseconds throttle for event-based checks |
| `enableContextMenu` | false | Allow right-click context menu |
| `enableTextSelection` | false | Allow text selection |
| `enableKeyboardShortcuts` | true | Block keyboard shortcuts |
| `enableDevToolsDetection` | true | Enable active dev tools detection |

## 🔧 Improvements Made

### Code Quality
- ✅ **Modern JavaScript**: Uses ES6+ features and best practices
- ✅ **Performance**: Optimized with throttling and efficient detection
- ✅ **Maintainability**: Clean, modular code structure
- ✅ **Error Handling**: Comprehensive try-catch blocks
- ✅ **Configuration**: Easy customization options

### Browser Compatibility
- ✅ **Cross-Browser**: Works in all modern browsers
- ✅ **Mobile Support**: Responsive and mobile-friendly
- ✅ **Legacy Support**: Graceful degradation for older browsers

### Security Enhancements
- ✅ **Multiple Detection Methods**: Harder to bypass
- ✅ **Smart Detection**: Reduces false positives
- ✅ **Configurable Actions**: Customizable response to detection

## ⚠️ Important Notes

### Limitations
- **Not Foolproof**: Skilled developers can still bypass these protections
- **Performance Impact**: Active detection may slightly impact page performance
- **User Experience**: May interfere with legitimate user interactions

### Recommendations
- Use as part of a broader security strategy
- Consider server-side protections for sensitive content
- Test thoroughly with your specific use case
- Monitor for false positives and adjust configuration as needed

## 🔒 Security Considerations

These client-side protections should not be relied upon for critical security:

1. **JavaScript can be disabled** by users
2. **Source code is visible** to determined users
3. **Browser extensions** can bypass many restrictions
4. **Mobile browsers** may behave differently

For sensitive content, implement server-side access controls and authentication.

## 📊 Detection Methods

1. **Timing Detection**: Measures debugger statement execution time
2. **Console Access**: Detects when console objects are accessed via property getters
3. **Function Debugger**: Uses Function constructor with debugger statements
4. **Window Size**: Compares outer vs inner window dimensions for dev tools presence
5. **Console Redirect**: Monitors console method overrides and redirection
6. **Element Inspection**: Detects DOM element property access that indicates inspection
7. **Network Monitoring**: Identifies XMLHttpRequest monitoring and modification
8. **Source Access**: Detects attempts to access script source properties

### 🎯 Debug Mode
Add `?debug=true` to your URL to enable debug mode:
- Shows detection method results in console
- Allows console usage without triggering alerts
- Useful for testing and development

## 🛠️ Development

To modify or extend the blocker:

1. Edit the configuration object for simple changes
2. Add new detection methods to the `detectionMethods` object
3. Customize the `handleDevToolsDetection` function for different responses
4. Test across different browsers and scenarios

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please:

1. Test your changes across multiple browsers
2. Maintain backward compatibility when possible
3. Document any new configuration options
4. Consider performance impact of new features

## 📝 Changelog

### Version 2.1 (Latest)
- ✅ Added 8 different detection methods for enhanced accuracy
- ✅ Implemented visual warning overlay system
- ✅ Added suspicious environment detection
- ✅ Enhanced console method monitoring
- ✅ Improved user feedback with detailed detection info
- ✅ Added page blur effect when dev tools detected
- ✅ Implemented additional bypass protection measures

### Version 2.0
- ✅ Replaced deprecated `keyCode` with modern `key` property
- ✅ Added comprehensive Mac support
- ✅ Implemented multiple detection methods
- ✅ Added configuration system
- ✅ Improved performance with throttling
- ✅ Enhanced error handling
- ✅ Added complete HTML example

### Version 1.0 (Original)
- Basic keyboard shortcut blocking
- Simple debugger timing detection
- Event-based detection triggers

## 👨‍💻 Authors & Contributors

### 🏆 Main Developer
- **Choi Minseo** - [minseo0388](https://github.com/minseo0388)
- Department of Chemistry, College of Natural Sciences, Chungnam National University, South Korea

