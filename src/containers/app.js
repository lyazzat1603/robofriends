import React, { Component } from 'react';
import Cardlist from '../components/cardlist';
import Searchbox from '../components/searchbox';
import './app.css';
import Scroll from '../components/scroll';


class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                return response.json()
            })
            .then(users =>{
                console.log("response: ", users);
                this.setState({ robots: users })
            })
            .catch((err) => {
                console.log("error: ", err);
            })

    }


    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });

    }
    render() {
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        });

        return !robots.length ?
            <h1>Loading</h1> :
            (
                <div className="tc">
                    <h1 className='f2'>Robofriends</h1>
                    <Searchbox searchChange={this.onSearchChange} />
                    <Scroll>
                        <Cardlist robots={filteredRobots} />
                    </Scroll>
                </div>
            )

    }
}

export default App;