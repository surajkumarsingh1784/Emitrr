import { useEffect } from 'react';
import WorkflowCanvas from './components/WorkflowCanvas';
import { useWorkflowState } from './hooks/useWorkflowState';
import { 
  addNodeToParent, 
  deleteNode, 
  updateNodeLabel,
  createNode,
  serializeWorkflow
} from './utils/workflowHelpers';
import './styles/App.css';

function App() {
  const { 
    workflow, 
    updateWorkflow, 
    undo, 
    redo, 
    canUndo, 
    canRedo 
  } = useWorkflowState();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const handleAddNode = (parentId, nodeType, connectionKey = 'next') => {
    const newNode = createNode(nodeType);
    const updatedWorkflow = addNodeToParent(workflow, parentId, newNode, connectionKey);
    updateWorkflow(updatedWorkflow);
  };

  const handleDeleteNode = (nodeId) => {
    const updatedWorkflow = deleteNode(workflow, nodeId);
    updateWorkflow(updatedWorkflow);
  };

  const handleUpdateLabel = (nodeId, newLabel) => {
    const updatedWorkflow = updateNodeLabel(workflow, nodeId, newLabel);
    updateWorkflow(updatedWorkflow);
  };

  const handleSaveWorkflow = () => {
    const serialized = serializeWorkflow(workflow);
    console.log('=== WORKFLOW SAVED ===');
    console.log(serialized);
    console.log('======================');
    
    // Also show a visual confirmation
    alert('Workflow saved! Check the browser console to see the JSON structure.');
  };

  return (
    <div className="app">
      <WorkflowCanvas
        workflow={workflow}
        onAddNode={handleAddNode}
        onDeleteNode={handleDeleteNode}
        onUpdateLabel={handleUpdateLabel}
        onSave={handleSaveWorkflow}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
    </div>
  );
}

export default App;
