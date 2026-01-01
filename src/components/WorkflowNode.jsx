import { useState } from 'react';
import NodeEditor from './NodeEditor';
import AddNodeMenu from './AddNodeMenu';
import { getConnectionPoints } from '../utils/workflowHelpers';
import '../styles/WorkflowNode.css';

const WorkflowNode = ({ 
  node, 
  onAddNode, 
  onDeleteNode, 
  onUpdateLabel,
  isRoot = false 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [selectedConnectionKey, setSelectedConnectionKey] = useState(null);

  const connectionPoints = getConnectionPoints(node);

  const handleAddClick = (connectionKey) => {
    setSelectedConnectionKey(connectionKey);
    setShowAddMenu(true);
  };

  const handleNodeTypeSelect = (nodeType) => {
    onAddNode(node.id, nodeType, selectedConnectionKey);
    setShowAddMenu(false);
    setSelectedConnectionKey(null);
  };

  const handleLabelClick = () => {
    if (!isRoot) {
      setIsEditing(true);
    }
  };

  const handleLabelSave = (newLabel) => {
    onUpdateLabel(node.id, newLabel);
    setIsEditing(false);
  };

  const getNodeIcon = () => {
    const icons = {
      start: '▶️',
      action: '⚡',
      branch: '🔀',
      end: '🏁'
    };
    return icons[node.type] || '●';
  };

  return (
    <div className="workflow-node-container">
      <div className={`workflow-node workflow-node-${node.type}`}>
        <div className="node-header">
          <span className="node-icon">{getNodeIcon()}</span>
          {isEditing ? (
            <NodeEditor
              value={node.label}
              onSave={handleLabelSave}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <span className="node-label" onClick={handleLabelClick}>
              {node.label}
            </span>
          )}
          {!isRoot && (
            <button 
              className="node-delete-button" 
              onClick={() => onDeleteNode(node.id)}
              title="Delete node"
            >
              ×
            </button>
          )}
        </div>
        <div className="node-type-badge">{node.type}</div>
      </div>

      {/* Connection points */}
      {connectionPoints.length > 0 && (
        <div className="connection-points">
          {connectionPoints.map((point) => (
            <div key={point.key} className="connection-branch">
              {point.label && (
                <span className="connection-label">{point.label}</span>
              )}
              
              {/* Connection line */}
              <div className="connection-line">
                <div className="connection-line-vertical"></div>
                {!point.hasChild && (
                  <button 
                    className="add-node-button"
                    onClick={() => handleAddClick(point.key)}
                    title="Add node"
                  >
                    +
                  </button>
                )}
              </div>

              {/* Render child node */}
              {point.hasChild && node.children[point.key] && (
                <WorkflowNode
                  node={node.children[point.key]}
                  onAddNode={onAddNode}
                  onDeleteNode={onDeleteNode}
                  onUpdateLabel={onUpdateLabel}
                  isRoot={false}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add node menu */}
      {showAddMenu && (
        <AddNodeMenu
          onSelect={handleNodeTypeSelect}
          onClose={() => {
            setShowAddMenu(false);
            setSelectedConnectionKey(null);
          }}
        />
      )}
    </div>
  );
};

export default WorkflowNode;
