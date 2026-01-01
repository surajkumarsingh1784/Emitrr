import { useState, useCallback } from 'react';
import { createNode } from '../utils/workflowHelpers';

export const useWorkflowState = () => {
  // Initialize with a start node
  const initialState = createNode('start', 'Start');

  const [currentState, setCurrentState] = useState(initialState);
  const [history, setHistory] = useState([initialState]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Update state and add to history
  const updateWorkflow = useCallback((newState) => {
    setCurrentState(newState);
    
    // Add to history (remove any future states if we're not at the end)
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    
    // Limit history to 50 states to prevent memory issues
    if (newHistory.length > 50) {
      newHistory.shift();
    } else {
      setHistoryIndex(historyIndex + 1);
    }
    
    setHistory(newHistory);
  }, [history, historyIndex]);

  // Undo action
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentState(history[newIndex]);
    }
  }, [history, historyIndex]);

  // Redo action
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentState(history[newIndex]);
    }
  }, [history, historyIndex]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return {
    workflow: currentState,
    updateWorkflow,
    undo,
    redo,
    canUndo,
    canRedo
  };
};
