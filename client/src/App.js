import './styles/App.scss';
import Toolbar from "./components/Toolbar";
import SettingsBar from "./components/SettingsBar";
import Canvas from "./components/Canvas";
import Modal from 'react-modal';
import React, {useRef} from 'react';
import ReactDOM from 'react-dom';
import canvasState from "./store/canvasState";

Modal.setAppElement(document.getElementById('root'));
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

    },

};
function App() {
    const [modalIsOpen, setIsOpen] = React.useState(true);
    function closeModal() {
        setIsOpen(false);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        canvasState.setUsername(username.current.value)
        closeModal()
    }

    const username = useRef()

    return (
        <div className="App">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 >Set your username</h2>
                <form onSubmit={e => submitHandler(e)}>
                    <input ref={username} style={{margin: '15px'}} className={'input'} type={'text'}/>
                    <input style={{margin: '15px'}} className={'input'} type={'submit'}/>
                </form>
            </Modal>
            <Toolbar/>
            <SettingsBar/>
            <Canvas/>
        </div>
    );
}

export default App;
