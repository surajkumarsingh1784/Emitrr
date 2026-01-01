# Workflow Builder UI

A visual workflow builder application built with React.

## Features

- **Visual Workflow Canvas**: Interactive canvas with a tree/flow layout
- **Multiple Node Types**:
  - **Action Node**: Single sequential step with one outgoing connection
  - **Branch Node**: Decision point with multiple outgoing connections (True/False)
  - **End Node**: Terminal node with no outgoing connections
- **Interactive Editing**:
  - Add new nodes to any branch
  - Delete nodes with automatic reconnection
  - Edit node labels inline
- **Bonus Features**:
  - Save workflow (logs JSON structure to console)
  - Undo/Redo functionality
  - Context-sensitive node creation UI

## Technology Stack

- React 18 with Hooks
- JavaScript (ES6+)
- CSS3 with transitions
- Vite for build tooling

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Data Model

The workflow is represented as a tree structure where each node contains:

```javascript
{
  id: string,           // Unique identifier
  type: string,         // 'start' | 'action' | 'branch' | 'end'
  label: string,        // Display text
  children: {           // Child nodes
    next?: Node,        // For action/start nodes
    true?: Node,        // For branch nodes (true path)
    false?: Node        // For branch nodes (false path)
  }
}
```

## Usage

1. **Add Node**: Click the "+" button on any connection point
2. **Delete Node**: Click the "×" button on any node (except Start)
3. **Edit Label**: Click on the node label to edit
4. **Save**: Click "Save Workflow" to log the structure to console
5. **Undo/Redo**: Use the Undo/Redo buttons to revert changes

## Project Structure

```
src/
├── components/
│   ├── WorkflowCanvas.jsx    # Main canvas component
│   ├── WorkflowNode.jsx       # Individual node component
│   ├── NodeEditor.jsx         # Inline label editor
│   └── AddNodeMenu.jsx        # Node type selection menu
├── hooks/
│   └── useWorkflowState.js    # State management with undo/redo
├── utils/
│   └── workflowHelpers.js     # Helper functions
├── styles/
│   ├── App.css                # Global styles
│   ├── WorkflowCanvas.css     # Canvas styles
│   └── WorkflowNode.css       # Node styles
├── App.jsx                    # Root component
└── main.jsx                   # Entry point
```

## License

MIT
