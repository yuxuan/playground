import React, { Component } from 'react';

class VanillaJS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        }
        this.selectFile = this.selectFile.bind(this);
        this.onPostButtonClick = this.onPostButtonClick.bind(this);
    }
    
    onGetButtonClick() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost:3002/api/v1/test', true);
        xhr.send(null);
    }

    onPostButtonClick() {
        const xhr = new XMLHttpRequest();
        xhr.open('post', 'http://localhost:3002/api/v1/test', true);
        // xhr.setRequestHeader('Content-Type','application/json')
        var formData = new FormData()
        formData.append('name','gavin');
        formData.append('file', this.state.file);
        xhr.send(formData);
    }
    
    selectFile(e) {
        this.setState({file: e.target.files[0]})
    }

    render() {
        return (<div>
            <button onClick={ this.onGetButtonClick }>GET</button>
            <form>
                <input type="file" onChange={this.selectFile}/>
            </form>
            <button onClick={ this.onPostButtonClick }>POST</button>
        </div>);
    }
} 
  
export default VanillaJS;