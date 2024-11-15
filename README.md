---

# 3D Model Viewer Application  

## Overview  
This project is a **3D Model Viewer** built with **React**, **React Three Fiber**, **Drei**, **Three.js**, and **Bootstrap**. It allows users to load, explore, and interact with 3D models in an intuitive and responsive interface.  

## Features  
### Layout  
- **Responsive Header and Footer**:  
  - Heights adjust based on screen size:  
    - XS (<576px): 50px  
    - SM (576px - 767px): 60px  
    - MD (768px - 991px): 70px  
    - LG (992px - 1199px): 80px  
    - XL (1200px+): 90px  
  - Header includes:  
    - Logo  
    - Minimize/Maximize controls  
    - Current date and time  
    - Other options  

- **Sidebar**:  
  - Opens automatically when a model is loaded.  
  - Settings to configure:  
    - Background color  
    - Environment settings  
  - 'Meshes' section to traverse model parts, toggle visibility, and highlight selected parts.  

- **Model Viewer**:  
  - Responsive canvas adapting to screen size.  
  - Supports file selection and drag-and-drop for loading 3D models.  
  - Highlights model parts on click with transparency and blue shade.  
  - Synchronizes part selection between canvas and sidebar.  

### Functionality  
1. **Lighting Helper**  
   - Adjustable lighting settings for better model visualization.  

2. **Model Traversal**  
   - Displays part names in the sidebar's 'Meshes' section.  
   - Allows toggling part visibility.  
   - Highlights the selected part and synchronizes its state with the sidebar.  

3. **Snapshot Tool**  
   - Capture screenshots of the canvas in various resolutions:  
     - Small (1280x720)  
     - Medium (1920x1080)  
     - Large (2560x1440)  
     - Custom (user-defined width and height)  
   - Option to enable/disable transparent background in the snapshot.  

### Customizations  
- Integrated a custom font: **ForumRegular**, sourced from a local file (`./fonts/Forum-Regular.ttf`).  

### Technology Stack  
- **React**  
- **React Three Fiber**  
- **Drei**  
- **Three.js**  
- **Bootstrap**  

## Getting Started  
### Installation  
1. Clone the repository:  
   ```bash  
   git clone <repository-url>  
   cd <project-directory>  
   ```  

2. Install dependencies:  
   ```bash  
   npm install  
   ```  

3. Run the project:  
   ```bash  
   npm start  
   ```  

### File Structure  
```plaintext  
src/  
├── components/  
│   ├── Header/  
│   ├── Footer/  
│   ├── Sidebar/  
│   ├── ModelViewer/  
├── fonts/  
│   └── Forum-Regular.ttf  
├── utils/  
│   └── lightingHelper.js  
├── App.js  
└── index.js  
```  

## Usage  
1. Load a 3D model through file selection or drag-and-drop.  
2. Explore model parts, toggle visibility, and highlight parts via the sidebar or canvas.  
3. Adjust canvas lighting and environment settings through the sidebar.  
4. Take snapshots with the customizable screenshot tool.  

## Future Improvements  
- Add animations for transitions and interactions.  
- Extend format support for 3D models.  
- Implement a dark/light theme toggle.  


---  
