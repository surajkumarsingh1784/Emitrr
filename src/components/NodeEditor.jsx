import { useState, useRef, useEffect } from 'react';
import '../styles/NodeEditor.css';

const NodeEditor = ({ value, onSave, onCancel }) => {
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  const handleSave = () => {
    const trimmed = editValue.trim();
    if (trimmed) {
      onSave(trimmed);
    } else {
      onCancel();
    }
  };

  return (
    <div className="node-editor">
      <input
        ref={inputRef}
        type="text"
        className="node-editor-input"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
      />
    </div>
  );
};

export default NodeEditor;
