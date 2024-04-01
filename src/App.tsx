import Header from "./components/Header/header.tsx";
import {Container} from "./components/Container/container.tsx";

function App() {
    return (
        <>
            <div className="App">
                <Header title='Блог'></Header>
                <Container></Container>
            </div>
        </>
    );
}

export default App
