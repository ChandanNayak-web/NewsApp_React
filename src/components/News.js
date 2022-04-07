import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
    static propTypes = {
        country: PropTypes.string ,
        pageSize: PropTypes.number,
        category:PropTypes.string
    }

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
      }

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
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5680b86b1fbc419d83531858b7427bec&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    // for previous click
    handlePrevClick = async () => {
        console.log('ptrvious');

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5680b86b1fbc419d83531858b7427bec&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false,
        })

    }

    // for next click
    handleNextClick = async () => {
        console.log('next');

        // condition for when no of page greater than to totalResults then next will not working
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5680b86b1fbc419d83531858b7427bec&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json();

            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false,
            })
        }
    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className="text-center">Dev News - Top HeadLines</h1>
                {/* below conditon is if this.state.loading=true then show <Spinner /> */}
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-sm btn-outline-dark" onClick={this.handlePrevClick}>&#x029CF; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-sm btn-outline-dark mx-3" onClick={this.handleNextClick}>Next &#x029D0;</button>
                </div>
            </div>
        )
    }
}

export default News