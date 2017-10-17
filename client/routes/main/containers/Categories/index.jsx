import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import setMainPageData from 'modules/main_page/actions/set_data.js';
import CategoriesTable from 'routes/main/components/CategoriesTable';
import fetchCategories from 'modules/categories/actions/fetch.js';
import removeCategory from 'modules/categories/actions/remove.js';

class Categories extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

	componentWillMount(){
        this.props.fetch();

        this.props.setMainPageData({
            activePage: "categories"
        });
	}

    handleRemove = (e, id) => {
        e.preventDefault();
        this.props.remove(id);
    }

    render() {
        return (
        	<div>
                <div className="content-header">
                    <div className="header-section">
                        <h1>
                            <Link to='/categories/new/edit' className="btn btn-default pull-right">Добавить</Link>
                            Категории
                            <br></br>
                            <small>Таблица категорий</small>
                        </h1>
                    </div>
                </div>

                <CategoriesTable data={this.props.categories} entity="categories" remove={this.handleRemove} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categories.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetch          : bindActionCreators(fetchCategories, dispatch),
        remove         : bindActionCreators(removeCategory, dispatch),
        setMainPageData: bindActionCreators(setMainPageData, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
