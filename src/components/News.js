import React, { Component } from "react";
import NewsItem from "./NewsItem";
import "./globalClass";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import eventBus from "../utility/EventBus";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    pageSize: 20,
    country: "in",
    category: "business",
  };

  static propsType = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      totalResults: 0,
      loading: false,
      disaplyArticalCount:0,
      uniqueKey: 0
    };

    let category =
      this.props.category[0].toUpperCase() + this.props.category.slice(1);
    document.title = `${category} - News Monkey`;
    console.log("constructore called");
  }

  componentDidMount() {
    eventBus.on("couponApply", (data) => {
      console.log("Event Listned successfully.");
    });

    this.fetchNewsDataFromServer();
  }

  async fetchNewsDataFromServer() {
    let LUrl = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=${this.props.apiKey}
    &page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });
    let LData = await fetch(LUrl);
    let LParsedata = await LData.json();
    this.setState({ loading: false });

    let LArticals = LParsedata.articles;
    this.setState({ disaplyArticalCount: this.state.disaplyArticalCount + this.state.articles.length });
    
    LArticals = this.validateArray(LArticals);

    LArticals = this.state.articles.concat(LArticals);
    this.setState({
      articles: LArticals,
      totalResults: LParsedata.totalResults,
    });

    return LParsedata;
  }

  fetchMoreData = () => {
    this.setState({ page: this.state.page + 1 });
    this.fetchNewsDataFromServer();
  };

  validateArray(p_arrJson) {
    let LResultArray = [];
    for (let itemObject of p_arrJson) {
      if (
        itemObject.title &&
        itemObject.description &&
        itemObject.urlToImage &&
        itemObject.url
      ) {
        LResultArray.push(itemObject);
      }
    }
    return LResultArray;
  }
  render() {
    return (
      <>
        <h1 className="text-center">
          News Monkey - Top{" "}
          {this.props.category[0].toUpperCase() + this.props.category.slice(1)}{" "}
          Headline
        </h1>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={ this.state.disaplyArticalCount  !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((item) => {

              //  this.setState({uniqueKey:this.state.uniqueKey+1});
               
                return (
                  <div className="col-md-4" key={item.url + item.urlToImage + item.author}>
                    <NewsItem
                      title={item.title ? item.title.slice(0, 40) : ""}
                      description={
                        item.description ? item.description.slice(0, 88) : ""
                      }
                      imageUrl={item.urlToImage ? item.urlToImage : ""}
                      newsUrl={item.url ? item.url : ""}
                      publishedAt={item.publishedAt ? item.publishedAt : ""}
                      author={item.author ? item.author : ""}
                      source={item.source ? item.source : ""}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
