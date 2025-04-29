body, html {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: #000;
}

#gameCanvas {
  display: block;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(45deg, #111, #333);
}

.hud {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #fff;
  font-family: 'Segoe UI', sans-serif;
}

.controls {
  margin-top: 10px;
}

button {
  padding: 8px 15px;
  margin-right: 10px;
  font-size: 1em;
  border: none;
  border-radius: 6px;
  background: #007bff;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #0056b3;
}

#pauseBtn {
  background: #ffc107;
  color: black;
}

#pauseBtn:hover {
  background: #e0a800;
}

#restartBtn {
  background: #28a745;
}

#restartBtn:hover {
  background: #218838;
}
