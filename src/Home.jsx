/* eslint-disable import/no-anonymous-default-export */
import React, { Component } from "react";
import Header from "./components/header";
import SelectDropdown from "./components/form/selectDropdown";
import RadioButtons from "./components/form/radioButtons";
import NobelPrize from "./components/nobelPrize";

import "./scss/app.scss";
import fetch from "fetch-everywhere";
import _ from "lodash";
// const axios = require('axios');


export default class extends Component {

 


api = "https://padillaco-datasets.s3.amazonaws.com/nobel.json";

    state = {
        prizes: false,
        activeFilter: null,
        sort: "desc"
    };

    categories = [  
        "chemistry",
        "economics",
        "literature",
        "medicine",
        "peace",
        "physics"
    ];

   
//constructor
    constructor() {
        super();

        this.sortPrizesByYear = this.sortPrizesByYear.bind(this);
        this.filterPrizesByCategory = this.filterPrizesByCategory.bind(this);
        this.showAllPrizes = this.showAllPrizes.bind(this);
    }

    componentDidMount() {
            // axios.get('https://padillaco-datasets.s3.amazonaws.com/nobel.json')
            // .then(function (response) {
            //     // handle success
            //     console.log(response);
            // })
            // .catch(function (error) {
            //     // handle error
            //     console.log(error);
            // })
        fetch(this.api)
            .then(res => res.json())
            .then(d => {
                console.log(d);
                const prizes = this.sortPrizes(d.prizes, this.state.sort);
                this.setState({ prizes });

            })
            .catch(err => {
                console.log(err);
            });
    }

    sortPrizesByYear(e) {
        const sort = e.target.value;
        const prizes = this.sortPrizes(this.state.prizes, sort);

        this.setState({ prizes, sort });
    }

    sortPrizes(prizes, direction) {
        return _.orderBy(prizes, ["year"], [direction]);
    }

    filterPrizesByCategory(e) {
        const activeFilter = e.target.value;

        this.setState({ activeFilter });
    }

    showAllPrizes() {
        this.setState({ activeFilter: null });
    }

    render() {
        const { prizes, activeFilter } = this.state;

        return (
            <div className="nobel-prizes-app">
        
                <Header/>
                <form className="nobel-prizes-form">
                    <SelectDropdown sortPrizesByYear={this.sortPrizesByYear} />
                    <RadioButtons
                        categories={this.categories}
                        showAllPrizes={this.showAllPrizes}
                        filterPrizesByCategory={this.filterPrizesByCategory}
                    />
                </form>

                <ul className="nobel-prizes-list">
                    {prizes.length > 0 &&
                        prizes.map(({ category, year, laureates }, index) => {
                            return (
                                <NobelPrize
                                    key={index}
                                    category={category}
                                    year={year}
                                    laureates={laureates}
                                    activeCategory = {activeFilter}
                                />
                            );
                        })}
                </ul>
            </div>
        );
    }
}
