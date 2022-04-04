import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class NewsItem extends Component {
    static propTypes = {

    }

    render() {

        let { title, description, imageUrl, newsUrl } = this.props;

        return (
            <div className='my-3'>
                <div className="card" >
                    <img src={!imageUrl?"https://images.hindustantimes.com/img/2022/04/03/1600x900/7ce78bca-849d-49d7-b88c-7cc0b2fddf25_1649002921867_1649002933593.jpg":imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description} </p>
                        <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-info">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
