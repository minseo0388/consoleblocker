// Console Blocker Configuration
(function (window) {
    'use strict';

    window.ConsoleBlocker = window.ConsoleBlocker || {};

    window.ConsoleBlocker.config = {
        // Detection settings
        detectionThreshold: 100,        // ms delay threshold for debugger detection
        maxDetectionAttempts: 3,        // number of attempts before triggering action
        detectionInterval: 2000,        // ms between periodic checks
        throttleInterval: 500,          // ms throttle for event-based checks

        // Feature toggles
        enableContextMenu: false,       // allow right-click context menu
        enableTextSelection: false,     // allow text selection
        enableKeyboardShortcuts: true,  // block keyboard shortcuts
        enableDevToolsDetection: true,  // enable active dev tools detection

        // Advanced settings
        enablePersistence: true,        // remember detection state across reloads
        enableBlur: true,               // blur page content when detected
        enableWarningOverlay: true,     // show warning overlay when detected

        // Debug mode
        debug: window.location.search.includes('debug=true')
    };
})(window);
