


# 🧊 3D Model Viewer Application

## 🔍 Overview  
This is an **open-source 3D Model Viewer** built using modern web technologies like **React**, **React Three Fiber**, **Three.js**, and **Bootstrap**. It enables users to load, explore, and interact with 3D models through a responsive and intuitive interface.

---

## ✨ Key Features  

### 📐 Layout  
- **Responsive Header & Footer**  
  - Automatically adjusts height based on screen size:  
    - XS: 50px | SM: 60px | MD: 70px | LG: 80px | XL: 90px  
  - Includes:  
    - App logo  
    - Minimize / Maximize controls  
    - Current date and time  
    - Quick access options  

- **Dynamic Sidebar**  
  - Automatically opens when a model is loaded  
  - Includes settings for:  
    - Background color  
    - Environment presets  
  - **Meshes Section**:  
    - Traverse model hierarchy  
    - Toggle part visibility  
    - Highlight selected parts (syncs with canvas)

- **3D Model Canvas**  
  - Fully responsive and adaptive canvas  
  - Drag-and-drop or file input to load models  
  - Clickable parts: highlights selection with blue tint and transparency  
  - Seamless synchronization with sidebar part selection  

---

### ⚙️ Functionality  

#### 💡 Lighting Helper  
- Adjustable lighting controls for better visualization of 3D models.

#### 🧭 Model Traversal  
- Lists mesh/part names in the sidebar  
- Enables toggling visibility and highlighting of parts  
- Bi-directional syncing between canvas and sidebar selections

#### 📸 Snapshot Tool  
- Capture screenshots of the canvas in various resolutions:  
  - Small (1280×720)  
  - Medium (1920×1080)  
  - Large (2560×1440)  
  - Custom (user-defined size)  
- Option to include a **transparent background** in snapshots

---

### 🎨 UI Customizations  
- Integrated custom font: **ForumRegular** (`./fonts/Forum-Regular.ttf`) for a clean, modern look

---

## 🧱 Technology Stack  
- **React**  
- **React Three Fiber**  
- **Drei**  
- **Three.js**  
- **Bootstrap**

---

## 🚀 Getting Started  

### 🔧 Installation  
```bash
git clone https://github.com/Omkarkumbhar47/3d-viewer.git
cd 3d-viewer
npm install
npm start
```

### 📁 Project Structure  
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

---

## 🧪 Usage  

1. Launch the app and upload a 3D model via file input or drag-and-drop  
2. Explore and toggle visibility of individual model parts from the sidebar or canvas  
3. Customize lighting and background/environment settings  
4. Use the snapshot tool to export canvas images in your preferred resolution

---

## 🚧 Future Roadmap  
- Add animation transitions for parts and camera  
- Support additional 3D model formats  
- Implement dark/light theme toggle  
- Export model metadata as JSON  

---

## 💡 Contributing  

This project is open to contributions!  

If you're passionate about:
- 🧱 3D rendering on the web  
- 🎨 Enhancing UI/UX for interactive applications  
- 🧰 Adding new tools, features, or model utilities  

Feel free to fork the repo, open issues, suggest features, or raise PRs! 🚀  

### 🛠️ Getting Started  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Omkarkumbhar47/3d-viewer.git
   cd 3d-viewer
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Run the app locally**  
   ```bash
   npm start
   ```

4. Start building and experimenting with features!

📬 For major changes or feature discussions, feel free to open an issue or connect with me on [LinkedIn](https://linkedin.com/in/omkar-kumbhar-291168259/)

Let’s build something awesome together! 💻✨

---

## 🔗 Links  

- 🌐 **Live Demo**: [3d-viewer-seven.vercel.app](https://3d-viewer-seven.vercel.app/)  
- 📂 **Source Code**: [github.com/Omkarkumbhar47/3d-viewer](https://github.com/Omkarkumbhar47/3d-viewer)  
- 📫 **Connect**: [LinkedIn](https://linkedin.com/in/omkar-kumbhar-291168259/)

---

## 📄 License  

This project is open source under the [MIT License](LICENSE).

```MIT License

Copyright (c) 2025 Omkar Kumbhar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
