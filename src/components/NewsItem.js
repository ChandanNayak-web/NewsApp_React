import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class NewsItem extends Component {
    static propTypes = {

    }

    render() {

        let { title, description } = this.props;

        return (
            <div>
                <div className="card" style={{width: "18rem"}}>
                    <img src="https://live-production.wcms.abc-cdn.net.au/cca56ba98abb099854bbd695da8c7822?impolicy=wcms_crop_resize&cropH=2813&cropW=5000&xPos=0&yPos=260&width=862&height=485" className="card-img-top" alt="..." />
                        <div className="card-body">
                        <h5 className="card-title">{ title }</h5>
                        <p className="card-text">{ description }</p>
                            <a href="/newsdetails" className="btn btn-primary">Go somewhere</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
