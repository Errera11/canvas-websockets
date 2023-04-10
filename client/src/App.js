import './styles/App.scss';
import Toolbar from "./components/Toolbar";
import SettingsBar from "./components/SettingsBar";
import Canvas from "./components/Canvas";

function App() {
    return (
        <div className="App">
            <Toolbar/>
            <SettingsBar/>
            <Canvas/>
        </div>
    );
}

export default App;
