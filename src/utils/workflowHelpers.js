// Generate unique IDs for nodes
export const generateId = () => {
  return `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Create a new node
export const createNode = (type, label = '') => {
  const defaultLabels = {
    start: 'Start',
    action: 'New Action',
    branch: 'Check Condition',
    end: 'End'
  };

  return {
    id: generateId(),
    type,
    label: label || defaultLabels[type] || 'New Node',
    children: {}
  };
};

// Find a node by ID in the tree
export const findNodeById = (root, targetId) => {
  if (!root) return null;
  if (root.id === targetId) return root;

  const childKeys = Object.keys(root.children);
  for (const key of childKeys) {
    const found = findNodeById(root.children[key], targetId);
    if (found) return found;
  }

  return null;
};

// Find parent node and the key that points to the child
export const findParentNode = (root, targetId, parent = null, childKey = null) => {
  if (!root) return null;
  if (root.id === targetId) return { parent, childKey };

  const childKeys = Object.keys(root.children);
  for (const key of childKeys) {
    const result = findParentNode(root.children[key], targetId, root, key);
    if (result) return result;
  }

  return null;
};

// Add a node as a child
export const addNodeToParent = (root, parentId, newNode, childKey = 'next') => {
  const parent = findNodeById(root, parentId);
  if (!parent) return root;

  // Clone the tree to maintain immutability
  const clonedRoot = deepClone(root);
  const clonedParent = findNodeById(clonedRoot, parentId);

  // If there's already a child at this key, insert the new node before it
  if (clonedParent.children[childKey]) {
    newNode.children = { ...newNode.children, [childKey]: clonedParent.children[childKey] };
  }

  clonedParent.children[childKey] = newNode;
  return clonedRoot;
};

// Delete a node and reconnect its children to its parent
export const deleteNode = (root, nodeId) => {
  if (root.id === nodeId) {
    // Cannot delete root node
    return root;
  }

  const clonedRoot = deepClone(root);
  const { parent, childKey } = findParentNode(clonedRoot, nodeId) || {};

  if (!parent) return root;

  const nodeToDelete = parent.children[childKey];

  // Reconnect logic based on node type
  if (nodeToDelete.type === 'action' || nodeToDelete.type === 'start') {
    // For action nodes, connect parent to the deleted node's child
    if (nodeToDelete.children.next) {
      parent.children[childKey] = nodeToDelete.children.next;
    } else {
      delete parent.children[childKey];
    }
  } else if (nodeToDelete.type === 'branch') {
    // For branch nodes, we'll just remove it and its subtree
    delete parent.children[childKey];
  } else if (nodeToDelete.type === 'end') {
    // For end nodes, just remove them
    delete parent.children[childKey];
  }

  return clonedRoot;
};

// Update node label
export const updateNodeLabel = (root, nodeId, newLabel) => {
  const clonedRoot = deepClone(root);
  const node = findNodeById(clonedRoot, nodeId);

  if (node) {
    node.label = newLabel;
  }

  return clonedRoot;
};

// Deep clone a node tree
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(item => deepClone(item));

  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
};

// Serialize workflow to JSON
export const serializeWorkflow = (root) => {
  return JSON.stringify(root, null, 2);
};

// Get all connection points for a node (where we can add children)
export const getConnectionPoints = (node) => {
  const points = [];

  if (node.type === 'start' || node.type === 'action') {
    points.push({
      key: 'next',
      label: 'Next',
      hasChild: !!node.children.next
    });
  } else if (node.type === 'branch') {
    points.push({
      key: 'true',
      label: 'True',
      hasChild: !!node.children.true
    });
    points.push({
      key: 'false',
      label: 'False',
      hasChild: !!node.children.false
    });
  }

  return points;
};
