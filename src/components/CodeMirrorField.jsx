import CodeMirror from "@uiw/react-codemirror";
import { css as cssLang } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";

export default function CodeMirrorField({ value, onChange }) {
  return (
    <CodeMirror
      value={value}
      height="400px"
      minHeight="400px"
      theme={oneDark}
      extensions={[cssLang()]}
      onChange={onChange}
      basicSetup={{ lineNumbers: true, foldGutter: false, highlightActiveLine: true }}
      aria-label="CSS code editor"
    />
  );
}
