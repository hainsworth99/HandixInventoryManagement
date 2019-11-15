import React, {Component} from 'react';
import Assemblies from './components/assemblies.js'

class App extends Component{

    state = {
        assemblies: [],
        parts: []
    }

    componentDidMount() {
        // get assemblies
        fetch('http://localhost:8000/api/assemblies')
        .then(res => res.json())
        .then((data) => {
            this.setState({ assemblies: data['response'] })
        })
        .catch(console.log)

        // get parts
        fetch('http://localhost:8000/api/parts')
        .then(res => res.json())
        .then((data) => {
            this.setState({ parts: data['response'] })
        })
        .catch(console.log)
    }

    render(){
        console.log(this.state)
        return(
            <Assemblies assemblies={this.state.assemblies}/>
        );
    }
}

export default App;
