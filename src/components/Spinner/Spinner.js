import React from 'react'
import spinnerImg from '../../images/spinner.gif';


const Spinner = () => {
    return (
        <React.Fragment>
            <div>
                <img src={spinnerImg} alt="Spinner Image" className="d-block m-auto" />
            </div>
        </React.Fragment>
    )
}

export default Spinner;