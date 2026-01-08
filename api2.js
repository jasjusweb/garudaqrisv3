// QRIS Lightweight Loader
if(window.location.pathname.includes('index.html')){
    // Load the three components in sequence
    const loadQrisComponents = () => {
        // Load core functions first
        const coreScript = document.createElement('script');
        coreScript.src = 'https://cdn.jsdelivr.net/gh/jasjusweb/garudaqrisv3@latest/qris-core.js';
        document.head.appendChild(coreScript);

        // Then load styles and HTML template
        coreScript.onload = () => {
            const stylesScript = document.createElement('script');
            stylesScript.src = 'https://cdn.jsdelivr.net/gh/jasjusweb/garudaqrisv3@latest/qris-styles.js';
            document.head.appendChild(stylesScript);

            // Finally load main functionality
            stylesScript.onload = () => {
                const mainScript = document.createElement('script');
                mainScript.src = 'https://cdn.jsdelivr.net/gh/jasjusweb/garudaqrisv3@latest/qris-main.js';
                document.head.appendChild(mainScript);
            };
        };
    };

    // Check if jQuery is loaded before proceeding
    const checkJQuery = setInterval(() => {
        if(typeof jQuery !== 'undefined') {
            clearInterval(checkJQuery);
            loadQrisComponents();
        }
    }, 100);
} else {
    // For other pages, you can load a minimal version or nothing at all
    console.log('QRIS module not loaded on this page');
}
