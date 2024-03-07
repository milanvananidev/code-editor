import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import useDeviceDetection from "../hooks/useDeviceDetection";

const Editor = () => {

    const device = useDeviceDetection();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 's') {
                event.preventDefault();
                // After user press ctrl + s then call saved api.
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleChange = (value) => {
        if (fileName === 'index.html') {
            return setData({ ...data, html: value })
        }

        if (fileName === 'style.css') {
            return setData({ ...data, css: value })
        }

        if (fileName === 'script.js') {
            return setData({ ...data, js: value })
        }
    }

    const [fileName, setFileName] = useState('index.html');

    const [data, setData] = useState({
        html: "<h1 id='h1'>Hello World</h1>",
        css: "h1 {\n\tcolor: green\n}",
        js: "console.log('Hello World')",
    })

    const files = {
        "script.js": {
            name: "script.js",
            language: "javascript",
            value: data.js || '',
        },
        "style.css": {
            name: "style.css",
            language: "css",
            value: data.css || '',
        },
        "index.html": {
            name: "index.html",
            language: "html",
            value: data.html || '',
        },
    };

    const file = files[fileName];

    return (
        <div className="sm:flex-row lg:flex w-full">

            <div className="bg-[#1e1e1e] md:border-r-[1px] border-[#011111]">
                <button onClick={() => setFileName('index.html')} className={`px-8 py-2 bg-[#1e1e1e] border-b-2 mb-5 sm:border-l-0 md:border-l-2 md:border-b-0 ${fileName === 'index.html' ? 'border-orange-600' : 'border-[#1e1e1e]'}`}>
                    <span className="text-white text-xs">HTML</span>
                </button>
                <button onClick={() => setFileName('style.css')} className={`px-8 py-2 bg-[#1e1e1e] border-b-2 mb-5 sm:border-l-0 md:border-l-2 md:border-b-0 ${fileName === 'style.css' ? 'border-orange-600' : 'border-[#1e1e1e]'}`}>
                    <span className="text-white text-xs">CSS</span>
                </button>
                <button onClick={() => setFileName('script.js')} className={`px-8 py-2 bg-[#1e1e1e] border-b-2 mb-5 sm:border-l-0 md:border-l-2 md:border-b-0 ${fileName === 'script.js' ? 'border-orange-600' : 'border-[#1e1e1e]'}`}>
                    <span className="text-white text-xs">JS</span>
                </button>
            </div>

            <div className="w-full">
                <MonacoEditor
                    theme="vs-dark"
                    height={device === 'Mobile' ? '50vh' : '100vh'}
                    width={'100%'}
                    onChange={(e) => { handleChange(e) }}
                    path={file.path}
                    value={file.value}
                    defaultLanguage={file.language}
                    options={{
                        fontSize: "18px",
                        minimap: {
                            enabled: false,
                        },
                        formatOnPaste: true,
                        formatOnType: true,
                        autoIndent: true,
                        autoClosingBrackets: true,
                        autoClosingQuotes: true,
                    }}
                />
            </div>

            <iframe
                className="w-full"
                srcDoc={
                    `
                        <style> ${data.css} </style>
                        <body> ${data.html} </body>
                        <script> ${data.js} </script >
                    `}
            />
        </div>
    )
}

export default Editor;