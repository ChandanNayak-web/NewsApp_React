import PropTypes from 'prop-types'
import React, { useEffect,useState } from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);


    // below function can capitalize the title
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    // below function updateName will work fethch API , set the loding functionality and do the all functionality by using news API
    const updateName = async () => {
        props.setProgress(10); // initially progress bar shows 10%
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        setLoading(true)
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json();
        props.setProgress(70);

        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults)
        setLoading(false)

        props.setProgress(100); // finally progress bar shows 100%
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - Dev News`;
        updateName();
        // eslint-disable-next-line
    }, []);



    // for previous click
    const handlePrevClick = async () => {
        // console.log('ptrvious');

        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5680b86b1fbc419d83531858b7427bec&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();

        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false,
        // })
        setPage(page - 1);
        updateName();
    }

    // for next click
    const handleNextClick = async () => {
        console.log('next');

        // condition for when no of page greater than to totalResults then next will not working
        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize))) {

        //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5680b86b1fbc419d83531858b7427bec&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
        //     this.setState({ loading: true });
        //     let data = await fetch(url);
        //     let parsedData = await data.json();

        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading: false,
        //     })
        // }
        setPage(page + 1);
        updateName();
    }

    // fetchmoredata from API
    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5680b86b1fbc419d83531858b7427bec&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)

    }


        return (
            <div className='container my-3'>
                <h1 className="text-center" style={{marginTop: '80px'}}> Dev News - Top {capitalizeFirstLetter(props.category)} HeadLines </h1>
                {/* below conditon is if this.state.loading=true then show <Spinner /> */}
                {loading && <Spinner />}

                {/* adding infinite scrollbar */}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className='container'>
                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>

                    </div>
                </InfiniteScroll>

            </div>
        )
    
}


News. propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

News. defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}


export default News