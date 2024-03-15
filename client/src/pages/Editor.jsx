import { useState } from "react";
import EditorComp from "../components/EditorComp";

const Editor = () => {

    const [data, setData] = useState({
        html: "<h1 id='h1'>Hello World</h1>",
        css: "h1 {\n\tcolor: green\n}",
        js: "console.log('Hello World')",
    });

    return (
        <>
           <EditorComp data={data} setData={setData} />
        </>
    )
}

export default Editor;