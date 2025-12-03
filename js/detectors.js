// Console Blocker Detectors
(function (window) {
    'use strict';

    window.ConsoleBlocker = window.ConsoleBlocker || {};
    const config = window.ConsoleBlocker.config;

    window.ConsoleBlocker.detectors = {
        // Method 1: Debugger timing
        timing: function () {
            const start = performance.now();
            debugger;
            const end = performance.now();
            return (end - start) > config.detectionThreshold;
        },

        // Method 2: Console access detection
        console: function () {
            let detected = false;
            const image = new Image();

            Object.defineProperty(image, 'id', {
                get: function () {
                    detected = true;
                    return 'detected';
                }
            });

            try {
                console.log('%c', image);
                console.clear();
            } catch (e) {
                // Ignore errors
            }

            return detected;
        },

        // Method 3: Function debugger detection
        function: function () {
            const debugFunc = new Function('debugger');
            const start = performance.now();

            try {
                debugFunc();
            } catch (e) {
                return false;
            }

            const end = performance.now();
            return (end - start) > config.detectionThreshold;
        },

        // Method 4: Window size detection (less reliable)
        windowSize: function () {
            const widthDiff = window.outerWidth - window.innerWidth;
            const heightDiff = window.outerHeight - window.innerHeight;
            return widthDiff > 160 || heightDiff > 160;
        },

        // Method 5: Console log redirection detection
        consoleRedirect: function () {
            let detected = false;
            const originalLog = console.log;

            try {
                console.log = function () {
                    detected = true;
                    originalLog.apply(console, arguments);
                };

                console.log('');
                console.log = originalLog; // Restore original
            } catch (e) {
                console.log = originalLog;
            }

            return detected;
        },

        // Method 6: Element inspection detection
        elementInspection: function () {
            let detected = false;
            const element = document.createElement('div');
            element.style.display = 'none';

            Object.defineProperty(element, 'innerHTML', {
                get: function () {
                    detected = true;
                    return '';
                },
                set: function () {
                    detected = true;
                }
            });

            try {
                document.body.appendChild(element);
                // Trigger potential inspection
                element.innerHTML;
                document.body.removeChild(element);
            } catch (e) {
                // Ignore errors
            }

            return detected;
        },

        // Method 7: Network monitoring detection
        networkMonitoring: function () {
            let detected = false;

            try {
                const xhr = new XMLHttpRequest();
                const originalOpen = xhr.open;

                xhr.open = function () {
                    detected = true;
                    originalOpen.apply(this, arguments);
                };

                // Test if monitoring is active
                xhr.open('GET', '#', true);
            } catch (e) {
                // Ignore errors
            }

            return detected;
        },

        // Method 8: Source code access detection
        sourceAccess: function () {
            let detected = false;

            try {
                const script = document.createElement('script');
                Object.defineProperty(script, 'src', {
                    get: function () {
                        detected = true;
                        return '';
                    }
                });

                // Trigger potential source access
                script.src;
            } catch (e) {
                // Ignore errors
            }

            return detected;
        }
    };
})(window);
