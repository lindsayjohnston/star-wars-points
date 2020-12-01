import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import styles from './CSVReader.module.css';
const buttonRef = React.createRef();

class Reader extends Component {
    state={
       loadedData: null
    }
    handleOpenDialog = (e) => {
        // Note that the ref is set async, so it might be null at some point
        if (buttonRef.current) {
            buttonRef.current.open(e)
        }
    }

    handleOnFileLoad = (data) => {
        console.log('---------------------------')
        console.log(data);
        this.setState({loadedData: data})
        console.log('---------------------------')
    }

    handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
    }

    handleOnRemoveFile = (data, handler) => {
        console.log('---------------------------')
        console.log(data)
        console.log('---------------------------')
    }

    handleRemoveFile = (e) => {
        // Note that the ref is set async, so it might be null at some point
        if (buttonRef.current) {
            buttonRef.current.removeFile(e)
        }
    }

    render() {
        return (
            <div className={styles.Reader}>

                <CSVReader
                    ref={buttonRef}
                    onFileLoad={this.handleOnFileLoad}
                    onError={this.handleOnError}
                    noClick
                    noDrag
                    onRemoveFile={this.handleOnRemoveFile}
                >
                    {({ file }) => (
                        <aside>
                            <button
                                type='button'
                                onClick={this.handleOpenDialog}
                                className={styles.BrowseButton}>
                                Browse File
                            </button>

                            <div className={styles.FileBox}>
                                {file && file.name}
                            </div>
                            <button
                               className={styles.RemoveButton}
                                onClick={this.handleRemoveFile}>
                                Remove
                            </button>
                            <button 
                                className={styles.GenerateButton}
                                onClick={()=>this.props.dataLoaded(this.state.loadedData)}
                                >Generate Results</button>
                        </aside>
                    )}
                </CSVReader>

                

            </div>

        )
    }
}



export default Reader;