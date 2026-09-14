import ArenaCanvas from "./ArenaCanvas";

export default function WebGLLab() {
  return (
    <div className="player lab">
      <ArenaCanvas mode="play" />
      <p className="player-hint">WASD to move · mouse to lean the camera</p>
    </div>
  );
}
