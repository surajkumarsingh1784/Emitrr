import { useState } from 'react';
import '../styles/AddNodeMenu.css';

const AddNodeMenu = ({ onSelect, onClose, availableTypes = ['action', 'branch', 'end'] }) => {
  const nodeTypeInfo = {
    action: {
      label: 'Action',
      description: 'A single sequential step',
      icon: '⚡'
    },
    branch: {
      label: 'Branch',
      description: 'A decision point (if/else)',
      icon: '🔀'
    },
    end: {
      label: 'End',
      description: 'Terminal step',
      icon: '🏁'
    }
  };

  return (
    <div className="add-node-menu-overlay" onClick={onClose}>
      <div className="add-node-menu" onClick={(e) => e.stopPropagation()}>
        <div className="add-node-menu-header">
          <h3>Add Node</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="add-node-menu-options">
          {availableTypes.map(type => (
            <button
              key={type}
              className="node-type-option"
              onClick={() => onSelect(type)}
            >
              <span className="node-type-icon">{nodeTypeInfo[type].icon}</span>
              <div className="node-type-info">
                <div className="node-type-label">{nodeTypeInfo[type].label}</div>
                <div className="node-type-description">{nodeTypeInfo[type].description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddNodeMenu;
