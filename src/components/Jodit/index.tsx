import { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const Jodit = ({ content, setContent }: any) => {
  const editor = useRef(null);
  const config2 = {
    useSearch: false,
    minHeight: 100,
    spellcheck: false,
    toolbarAdaptive: false,
    toolbarSticky: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    minWidth: null,
    buttons: "bold,italic,underline,eraser,ul,ol,font,fontsize,lineHeight,hr,indent,outdent,left",
    placeHolder: "",
  };
  return (
    <JoditEditor
      ref={editor}
      config={config2}
      value={content}
      onBlur={(newContent) => setContent(newContent)}
      onChange={(newContent) => setContent(newContent)}
    />
  );
};
export default Jodit;
