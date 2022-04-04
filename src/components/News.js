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
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=5680b86b1fbc419d83531858b7427bec&pageSize=20";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles , totalResults: parsedData.totalResults })
    }

    // for previous click
    handlePrevClick = async () => {
        console.log('ptrvious');

        let url = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=5680b86b1fbc419d83531858b7427bec&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
        })

    }

    // for next click
    handleNextClick = async () => {
        console.log('next');

        // condition for when no of page greater than to totalResults then next will not working
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

        } else {
            
            let url = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=5680b86b1fbc419d83531858b7427bec&page=${this.state.page + 1}&pageSize=20`;
            let data = await fetch(url);
            let parsedData = await data.json();
    
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
        }
    }

    render() {
        return (
            <div className='container my-3'>
                <h2>Dev News - Top HeadLines</h2>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-sm btn-outline-dark" onClick={this.handlePrevClick}>&#x029CF; Previous</button>
                    <button type="button" className="btn btn-sm btn-outline-dark mx-3" onClick={this.handleNextClick}>Next &#x029D0;</button>
                </div>
            </div>
        )
    }
}

export default News