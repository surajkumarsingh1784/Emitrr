import WorkflowNode from './WorkflowNode';
import '../styles/WorkflowCanvas.css';

const WorkflowCanvas = ({ 
  workflow, 
  onAddNode, 
  onDeleteNode, 
  onUpdateLabel,
  onSave,
  onUndo,
  onRedo,
  canUndo,
  canRedo
}) => {
  return (
    <div className="workflow-canvas-wrapper">
      <div className="workflow-canvas-toolbar">
        <h1>Workflow Builder</h1>
        <div className="toolbar-actions">
          <button 
            className="toolbar-button"
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
          >
            ↶ Undo
          </button>
          <button 
            className="toolbar-button"
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
          >
            ↷ Redo
          </button>
          <button 
            className="toolbar-button toolbar-button-primary"
            onClick={onSave}
            title="Save workflow to console"
          >
            💾 Save Workflow
          </button>
        </div>
      </div>

      <div className="workflow-canvas">
        <div className="workflow-tree">
          <WorkflowNode
            node={workflow}
            onAddNode={onAddNode}
            onDeleteNode={onDeleteNode}
            onUpdateLabel={onUpdateLabel}
            isRoot={true}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkflowCanvas;
