import React, {Component} from 'react';
import './randomChar.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {
    constructor() {
        super();
        this.updateChar();
    }
    gotService = new gotService();
    state = {
        char: {},
        loading: true,
        error: false 
    }

    onError = (err) => {
        this.setState({
            error: true, 
            loading: false
        })
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }
    updateChar() {
        const id = Math.floor(Math.random()*140 +25);
        this.gotService.getACharacters(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }


    render() {
        const {char, loading, error } = this.state;

        const content = !(loading || error) ? <View char={char}/>: null;
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}


const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    const nameCon = name ? name: 'no data :('
    const genderCon = gender ? gender: 'no data :('
    const bornCon = born ? born: 'no data :('
    const diedCon = died ? died: 'no data :('
    const cultureCon = culture ? culture: 'no data :('
    return (
        <>
            <h4>Random Character: {nameCon}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender </span>
                        <span>{genderCon}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born </span>
                        <span>{bornCon}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died </span>
                        <span>{diedCon}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture </span>
                        <span>{cultureCon}</span>
                    </li>
                </ul>
        </>
    )
}