import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    static propTypes = {}


    constructor() {
        super();
        console.log('HELLO I AM CONSTRUCTOR FORM NEWS.JS');
        this.state = {
            articles: [],
            loading: false
        }
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=5680b86b1fbc419d83531858b7427bec";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles:parsedData.articles})
    }

    render() {
        return (
            <div className='container my-3'>
                <h2>Dev News - Top HeadLines</h2>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
            </div>
        )
    }
}

export default News