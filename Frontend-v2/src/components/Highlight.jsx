import 'highlight.js/styles/monokai-sublime.css';
import hightlight from 'highlight.js';
import { useEffect, useRef } from 'react';

const CodeHighlight = ({ children }) => {
    const highlightElement = useRef(null);

    useEffect(() => {
        if (highlightElement?.current) {
            hightlight.highlightElement(highlightElement.current.querySelector('pre'));
        }
    }, []);

    return (
        <div ref={highlightElement} className="highlight-el">
            {children}
        </div>
    );
};

export default CodeHighlight;
