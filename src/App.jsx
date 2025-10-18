import Game from "./components/Game";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/inika";

/*
  Root application component.
  Contains a navbar and embeds the main Game component.
*/

export default function App() {
  return (
    <div className="">
      <nav className="navbar navbar-dark bg-dark mb-4 ">
        <div className="container-fluid d-flex justify-content-center">
          <span className="navbar-brand h1">🎮 Welcome to Tic Tac toe game </span>
        </div>
      </nav>

      <Game />
    </div>
  );
}
