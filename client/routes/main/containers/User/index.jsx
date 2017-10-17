import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchUsers from 'modules/users/actions/fetch.js';
import setMainPageData from 'modules/main_page/actions/set_data.js';

class User extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    componentWillMount(){
        this.props.fetchUsers();

        this.props.setMainPageData({
            activePage: "user"
        });
    }

    render() {
        const
            user = _.find(this.props.users, {'id': parseInt(this.props.params.id)}),

            {first_name, last_name} = (user || {
                first_name: 'Незарегистрированный', last_name: 'Пользователь'
            });

        {/* WARN remove placeholder object when user fetch is completely implemented */}

        return (
            <div>
                <div className="content-header content-header-media">
                    <div className="header-section">
                        <img src="../../../../assets/images/profile.jpg" alt="Avatar" className="pull-right img-circle"></img>

                        <h1>
                            {`${first_name} ${last_name}`}
                            <br></br>
                            <small>Агент</small>
                        </h1>
                    </div>

                    <img src="../../../../assets/images/headers/profile_header.jpg" alt="header image" className="animation-pulseSlow"></img>
                </div>

                <div className="row">
                    <div className="col-md-6 col-lg-7">
                        <div className="block">
                            <div className="block-title">
                                <div className="block-options pull-right">
                                    <a href="javascript:void(0)" className="btn btn-sm btn-alt btn-default" data-toggle="tooltip" title="Privacy Settings"><i className="fa fa-cog"></i></a>
                                </div>
                                <h2><strong>Share</strong> something..</h2>
                            </div>

                            <form action="page_ready_user_profile.html" method="post" className="block-content-full block-content-mini-padding">
                                <textarea id="default-textarea" name="default-textarea" rows="2" className="form-control push-bit" placeholder="What are you thinking?"></textarea>
                                <div className="clearfix">
                                    <button type="submit" className="btn btn-sm btn-primary pull-right"><i className="fa fa-pencil"></i> Post</button>
                                    <a href="#" className="btn btn-link btn-icon" data-toggle="tooltip" data-placement="bottom" title="Add Location"><i className="fa fa-location-arrow"></i></a>
                                    <a href="#" className="btn btn-link btn-icon" data-toggle="tooltip" data-placement="bottom" title="Add Voice"><i className="fa fa-microphone"></i></a>
                                    <a href="#" className="btn btn-link btn-icon" data-toggle="tooltip" data-placement="bottom" title="Add Photo"><i className="fa fa-camera"></i></a>
                                    <a href="#" className="btn btn-link btn-icon" data-toggle="tooltip" data-placement="bottom" title="Add File"><i className="fa fa-file"></i></a>
                                </div>
                            </form>
                        </div>

                        <div className="block">
                            <div className="block-title">
                                <div className="block-options pull-right">
                                    <a href="#" className="label label-danger animation-pulse">Live Feed</a>

                                    <a href="#" className="btn btn-sm btn-alt btn-default" data-toggle="tooltip" title="Customize Feed">
                                        <i className="fa fa-pencil"></i>
                                    </a>
                                </div>

                                <h2><strong>Newsfeed</strong></h2>
                            </div>

                            <div className="block-content-full">
                                <ul className="media-list media-feed media-feed-hover">
                                    <li id="newsfeed-update-example" className="media display-none">
                                        <a href="page_ready_user_profile.html" className="pull-left">
                                            <img src="../../../../assets/images/profile.jpg" alt="Avatar" className="img-circle"></img>
                                        </a>
                                        <div className="media-body">
                                            <p className="push-bit">
                                                <span className="text-muted pull-right">
                                                    <small>just now</small>
                                                    <span className="text-success" data-toggle="tooltip" title="From Mobile"><i className="fa fa-mobile"></i></span>
                                                </span>
                                                <strong><a href="page_ready_user_profile.html">User</a> uploaded 2 new photos.</strong>
                                            </p>
                                            <div className="row push">
                                                <div className="col-sm-6 col-md-4">
                                                    <a href="../../../../assets/images/photos/photo13.jpg" data-toggle="lightbox-image">
                                                        <img src="../../../../assets/images/photos/photo13.jpg" alt="image"></img>
                                                    </a>
                                                </div>
                                                <div className="col-sm-6 col-md-4">
                                                    <a href="../../../../assets/images/photos/photo23.jpg" data-toggle="lightbox-image">
                                                        <img src="../../../../assets/images/photos/photo23.jpg" alt="image"></img>
                                                    </a>
                                                </div>
                                            </div>
                                            <p>
                                                <a href="javascript:void(0)" className="btn btn-xs btn-default"><i className="fa fa-thumbs-o-up"></i> Like</a>
                                                <a href="javascript:void(0)" className="btn btn-xs btn-default"><i className="fa fa-comments-o"></i> Comment</a>
                                                <a href="javascript:void(0)" className="btn btn-xs btn-default"><i className="fa fa-share-square-o"></i> Share</a>
                                            </p>
                                        </div>
                                    </li>

                                    <li className="media">
                                        <a href="page_ready_user_profile.html" className="pull-left">
                                            <img src="../../../../assets/images/profile.jpg" alt="Avatar" className="img-circle"></img>
                                        </a>
                                        <div className="media-body">
                                            <p className="push-bit">
                                                <span className="text-muted pull-right">
                                                    <small>45 min now</small>
                                                    <span className="text-danger" data-toggle="tooltip" title="From Web"><i className="fa fa-globe"></i></span>
                                                </span>
                                                <strong><a href="page_ready_user_profile.html">Explorer</a> published a new story.</strong>
                                            </p>
                                            <h5><a href="page_ready_article.html"><strong>The Mountain Trip</strong> &bull; Once in a lifetime experience</a></h5>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ultrices, justo vel imperdiet gravida, urna ligula hendrerit nibh, ac cursus nibh sapien in purus. Mauris tincidunt tincidunt turpis in porta. Etiam egestas fringilla enim, id convallis lectus laoreet at. Fusce purus nisi, gravida sed consectetur ut, interdum quis nisi. Quisque egestas nisl id lectus facilisis scelerisque? Proin rhoncus dui at ligula vestibulum ut facilisis ante sodales! Suspendisse potenti..</p>
                                            <p>
                                                <a href="javascript:void(0)" className="btn btn-xs btn-success"><i className="fa fa-thumbs-up"></i> You Like it</a>
                                                <a href="javascript:void(0)" className="btn btn-xs btn-default"><i className="fa fa-share-square-o"></i> Share</a>
                                            </p>

                                            <ul className="media-list push">
                                                <li className="media">
                                                    <a href="page_ready_user_profile.html" className="pull-left">
                                                        <img src="../../../../assets/images/profile.jpg" alt="Avatar" className="img-circle"></img>
                                                    </a>
                                                    <div className="media-body">
                                                        <a href="page_ready_user_profile.html"><strong>User</strong></a>
                                                        <span className="text-muted"><small><em>29 min ago</em></small></span>
                                                        <p>Sed porttitor pretium venenatis. Suspendisse potenti. Aliquam quis ligula elit. Aliquam at orci ac neque semper dictum.</p>
                                                    </div>
                                                </li>
                                                <li className="media">
                                                    <a href="page_ready_user_profile.html" className="pull-left">
                                                        <img src="../../../../assets/images/profile.jpg" alt="Avatar" className="img-circle"></img>
                                                    </a>
                                                    <div className="media-body">
                                                        <a href="page_ready_user_profile.html"><strong>User</strong></a>
                                                        <span className="text-muted"><small><em>18 min ago</em></small></span>
                                                        <p>In hac habitasse platea dictumst. Proin ac nibh rutrum lectus rhoncus eleifend</p>
                                                    </div>
                                                </li>
                                                <li className="media">
                                                    <a href="page_ready_user_profile.html" className="pull-left">
                                                        <img src="../../../../assets/images/profile.jpg" alt="Avatar" className="img-circle"></img>
                                                    </a>
                                                    <div className="media-body">
                                                        <form action="page_ready_user_profile.html" method="post">
                                                            <textarea id="profile-newsfeed-comment1" name="profile-newsfeed-comment1" className="form-control" rows="2" placeholder="Your comment.."></textarea>
                                                            <button type="submit" className="btn btn-xs btn-primary"><i className="fa fa-pencil"></i> Post Comment</button>
                                                        </form>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li className="media">
                                        <a href="page_ready_user_profile.html" className="pull-left">
                                            <img src="../../../../assets/images/profile.jpg" alt="Avatar" className="img-circle"></img>
                                        </a>
                                        <div className="media-body">
                                            <p className="push-bit">
                                                <span className="text-muted pull-right">
                                                    <small>1 hour ago</small>
                                                    <span className="text-success" data-toggle="tooltip" title="From Mobile"><i className="fa fa-mobile"></i></span>
                                                </span>
                                                <strong><a href="page_ready_user_profile.html">Adventurer</a> checked in at <a href="javascript:void(0)">Cafe-Bar</a>.</strong>
                                            </p>
                                            <div id="gmap-checkin" className="gmap push"></div>
                                            <p>
                                                <a href="javascript:void(0)" className="btn btn-xs btn-default"><i className="fa fa-thumbs-o-up"></i> Like</a>
                                                <a href="javascript:void(0)" className="btn btn-xs btn-default"><i className="fa fa-comments-o"></i> Comment</a>
                                                <a href="javascript:void(0)" className="btn btn-xs btn-default"><i className="fa fa-share-square-o"></i> Share</a>
                                            </p>
                                        </div>
                                    </li>

                                    <li className="media">
                                        <a href="page_ready_user_profile.html" className="pull-left">
                                            <img src="../../../../assets/images/profile.jpg" alt="Avatar" className="img-circle"></img>
                                        </a>
                                        <div className="media-body">
                                            <p className="push-bit">
                                                <span className="text-muted pull-right">
                                                    <small>5 hours ago</small>
                                                    <span className="text-info" data-toggle="tooltip" title="From Custom App"><i className="fa fa-wrench"></i></span>
                                                </span>
                                                <strong><a href="page_ready_user_profile.html">User</a> updated status.</strong>
                                            </p>
                                            <p>Hey there! First post from the new application!</p>
                                            <p>
                                                <a href="javascript:void(0)" className="btn btn-xs btn-default"><i className="fa fa-thumbs-o-up"></i> Like</a>
                                                <a href="javascript:void(0)" className="btn btn-xs btn-default"><i className="fa fa-share-square-o"></i> Share</a>
                                            </p>
                                            <ul className="media-list push">
                                                <li className="media">
                                                    <a href="page_ready_user_profile.html" className="pull-left">
                                                        <img src="../../../../assets/images/profile.jpg" alt="Avatar" className="img-circle"></img>
                                                    </a>
                                                    <div className="media-body">
                                                        <a href="page_ready_user_profile.html"><strong>User</strong></a>
                                                        <span className="text-muted"><small><em>1 hour ago</em></small></span>
                                                        <p>Aliquam quis ligula elit. Aliquam at orci ac neque semper dictum.</p>
                                                    </div>
                                                </li>
                                                <li className="media">
                                                    <a href="page_ready_user_profile.html" className="pull-left">
                                                        <img src="../../../../assets/images/profile.jpg" alt="Avatar" className="img-circle"></img>
                                                    </a>
                                                    <div className="media-body">
                                                        <form action="page_ready_user_profile.html" method="post">
                                                            <textarea id="profile-newsfeed-comment" name="profile-newsfeed-comment" className="form-control" rows="2" placeholder="Your comment.."></textarea>
                                                            <button type="submit" className="btn btn-xs btn-primary"><i className="fa fa-pencil"></i> Post Comment</button>
                                                        </form>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="media text-center">
                                        <a href="javascript:void(0)" className="btn btn-xs btn-default push">View more..</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-5">
                        <div className="block">
                            <div className="block-title">
                                <div className="block-options pull-right">
                                    <a href="javascript:void(0)" className="btn btn-alt btn-sm btn-default" data-toggle="tooltip" title="Friend Request"><i className="fa fa-plus"></i></a>
                                    <a href="javascript:void(0)" className="btn btn-alt btn-sm btn-default" data-toggle="tooltip" title="Hire"><i className="fa fa-briefcase"></i></a>
                                </div>
                                <h2>About <strong>John Doe</strong> <small>&bull; <i className="fa fa-file-text text-primary"></i> <a href="javascript:void(0)" data-toggle="tooltip" title="Download Bio in PDF">Bio</a></small></h2>
                            </div>

                            <table className="table table-borderless table-striped">
                                <tbody>
                                    <tr>
                                        <td style={{width: '20%'}}><strong>Info</strong></td>
                                        <td>Proin ac nibh rutrum lectus rhoncus eleifend. Sed porttitor pretium venenatis. Suspendisse potenti. Aliquam quis ligula elit. Aliquam at orci ac neque semper dictum. Sed tincidunt scelerisque ligula, et facilisis nulla hendrerit non.</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Founder</strong></td>
                                        <td><a href="javascript:void(0)">Company Inc</a></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Education</strong></td>
                                        <td><a href="javascript:void(0)">University Name</a></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Projects</strong></td>
                                        <td><a href="javascript:void(0)" className="label label-danger">168</a></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Best Skills</strong></td>
                                        <td>
                                            <a href="javascript:void(0)" className="label label-info">HTML</a>
                                            <a href="javascript:void(0)" className="label label-info">CSS</a>
                                            <a href="javascript:void(0)" className="label label-info">Javascript</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="block">
                            <div className="block-title">
                                <div className="block-options pull-right">
                                    <a href="javascript:void(0)" className="btn btn-alt btn-sm btn-default" data-toggle="tooltip" title="Редактировать"><i className="fa fa-pencil"></i></a>
                                </div>
                                
                                <h2>Best <strong>Photos</strong> <small>&bull; <a href="javascript:void(0)">25 Albums</a></small></h2>
                            </div>

                            <div className="gallery" data-toggle="lightbox-gallery">
                                <div className="row">
                                    <div className="col-xs-6 col-sm-3">
                                        <a href="../../../../assets/images/photos/photo12.jpg" className="gallery-link" title="Image Info">
                                            <img src="../../../../assets/images/photos/photo12.jpg" alt="image"></img>
                                        </a>
                                    </div>
                                    <div className="col-xs-6 col-sm-3">
                                        <a href="../../../../assets/images/photos/photo15.jpg" className="gallery-link" title="Image Info">
                                            <img src="../../../../assets/images/photos/photo15.jpg" alt="image"></img>
                                        </a>
                                    </div>
                                    <div className="col-xs-6 col-sm-3">
                                        <a href="../../../../assets/images/photos/photo3.jpg" className="gallery-link" title="Image Info">
                                            <img src="../../../../assets/images/photos/photo3.jpg" alt="image"></img>
                                        </a>
                                    </div>
                                    <div className="col-xs-6 col-sm-3">
                                        <a href="../../../../assets/images/photos/photo4.jpg" className="gallery-link" title="Image Info">
                                            <img src="../../../../assets/images/photos/photo4.jpg" alt="image"></img>
                                        </a>
                                    </div>
                                    <div className="col-xs-6 col-sm-3">
                                        <a href="../../../../assets/images/photos/photo5.jpg" className="gallery-link" title="Image Info">
                                            <img src="../../../../assets/images/photos/photo5.jpg" alt="image"></img>
                                        </a>
                                    </div>
                                    <div className="col-xs-6 col-sm-3">
                                        <a href="../../../../assets/images/photos/photo6.jpg" className="gallery-link" title="Image Info">
                                            <img src="../../../../assets/images/photos/photo6.jpg" alt="image"></img>
                                        </a>
                                    </div>
                                    <div className="col-xs-6 col-sm-3">
                                        <a href="../../../../assets/images/photos/photo20.jpg" className="gallery-link" title="Image Info">
                                            <img src="../../../../assets/images/photos/photo20.jpg" alt="image"></img>
                                        </a>
                                    </div>
                                    <div className="col-xs-6 col-sm-3">
                                        <a href="../../../../assets/images/photos/photo17.jpg" className="gallery-link" title="Image Info">
                                            <img src="../../../../assets/images/photos/photo17.jpg" alt="image"></img>
                                        </a>
                                    </div>
                                    <div className="col-xs-6 col-sm-3">
                                        <a href="../../../../assets/images/photos/photo14.jpg" className="gallery-link" title="Image Info">
                                            <img src="../../../../assets/images/photos/photo14.jpg" alt="image"></img>
                                        </a>
                                    </div>
                                    <div className="col-xs-6 col-sm-3">
                                        <a href="../../../../assets/images/photos/photo9.jpg" className="gallery-link" title="Image Info">
                                            <img src="../../../../assets/images/photos/photo9.jpg" alt="image"></img>
                                        </a>
                                    </div>
                                    <div className="col-xs-6 col-sm-3">
                                        <a href="../../../../assets/images/photos/photo11.jpg" className="gallery-link" title="Image Info">
                                            <img src="../../../../assets/images/photos/photo11.jpg" alt="image"></img>
                                        </a>
                                    </div>
                                    <div className="col-xs-6 col-sm-3">
                                        <a href="../../../../assets/images/photos/photo10.jpg" className="gallery-link" title="Image Info">
                                            <img src="../../../../assets/images/photos/photo10.jpg" alt="image"></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="block">
                            <div className="block-title">
                                <h2>New <strong>Friends</strong> <small>&bull; <a href="javascript:void(0)">450</a></small></h2>
                            </div>

                            <div className="row text-center">
                                <div className="col-xs-4 col-sm-3 col-lg-2 block-section">
                                    <a href="javascript:void(0)">
                                        <img src="../../../../assets/images/profile.jpg" alt="image" className="img-circle" data-toggle="tooltip" title="Username"></img>
                                    </a>
                                </div>
                                <div className="col-xs-4 col-sm-3 col-lg-2 block-section">
                                    <a href="javascript:void(0)">
                                        <img src="../../../../assets/images/profile.jpg" alt="image" className="img-circle" data-toggle="tooltip" title="Username"></img>
                                    </a>
                                </div>
                                <div className="col-xs-4 col-sm-3 col-lg-2 block-section">
                                    <a href="javascript:void(0)">
                                        <img src="../../../../assets/images/profile.jpg" alt="image" className="img-circle" data-toggle="tooltip" title="Username"></img>
                                    </a>
                                </div>
                                <div className="col-xs-4 col-sm-3 col-lg-2 block-section">
                                    <a href="javascript:void(0)">
                                        <img src="../../../../assets/images/profile.jpg" alt="image" className="img-circle" data-toggle="tooltip" title="Username"></img>
                                    </a>
                                </div>
                                <div className="col-xs-4 col-sm-3 col-lg-2 block-section">
                                    <a href="javascript:void(0)">
                                        <img src="../../../../assets/images/profile.jpg" alt="image" className="img-circle" data-toggle="tooltip" title="Username"></img>
                                    </a>
                                </div>
                                <div className="col-xs-4 col-sm-3 col-lg-2 block-section">
                                    <a href="javascript:void(0)">
                                        <img src="../../../../assets/images/profile.jpg" alt="image" className="img-circle" data-toggle="tooltip" title="Username"></img>
                                    </a>
                                </div>
                                <div className="col-xs-4 col-sm-3 col-lg-2 block-section">
                                    <a href="javascript:void(0)">
                                        <img src="../../../../assets/images/profile.jpg" alt="image" className="img-circle" data-toggle="tooltip" title="Username"></img>
                                    </a>
                                </div>
                                <div className="col-xs-4 col-sm-3 col-lg-2 block-section">
                                    <a href="javascript:void(0)">
                                        <img src="../../../../assets/images/profile.jpg" alt="image" className="img-circle" data-toggle="tooltip" title="Username"></img>
                                    </a>
                                </div>
                                <div className="col-xs-4 col-sm-3 col-lg-2 block-section">
                                    <a href="javascript:void(0)">
                                        <img src="../../../../assets/images/profile.jpg" alt="image" className="img-circle" data-toggle="tooltip" title="Username"></img>
                                    </a>
                                </div>
                                <div className="col-xs-4 col-sm-3 col-lg-2 block-section">
                                    <a href="javascript:void(0)">
                                        <img src="../../../../assets/images/profile.jpg" alt="image" className="img-circle" data-toggle="tooltip" title="Username"></img>
                                    </a>
                                </div>
                                <div className="col-xs-4 col-sm-3 col-lg-2 block-section">
                                    <a href="javascript:void(0)">
                                        <img src="../../../../assets/images/profile.jpg" alt="image" className="img-circle" data-toggle="tooltip" title="Username"></img>
                                    </a>
                                </div>
                                <div className="col-xs-4 col-sm-3 col-lg-2 block-section">
                                    <a href="javascript:void(0)">
                                        <img src="../../../../assets/images/profile.jpg" alt="image" className="img-circle" data-toggle="tooltip" title="Username"></img>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="block full">
                            <div className="block-title">
                                <div className="block-options pull-right">
                                    <a href="javascript:void(0)" className="btn btn-sm btn-alt btn-default" data-toggle="tooltip" title="Редактировать">
                                        <i className="fa fa-pencil"></i>
                                    </a>
                                </div>
                                
                                <h2>Twitter <strong>Feed</strong></h2>
                            </div>

                            <div className="block-top block-content-mini-padding">
                                <form action="page_ready_user_profile.html" method="post">
                                    <textarea id="profile-tweet" name="profile-tweet" className="form-control push-bit" rows="3" placeholder="Share something on Twitter.."></textarea>
                                    <div className="clearfix">
                                        <button type="submit" className="btn btn-sm btn-primary pull-right"><i className="fa fa-twitter"></i> Tweet</button>
                                        <a href="javascript:void(0)" className="btn btn-link btn-icon" data-toggle="tooltip" data-placement="bottom" title="Add Location"><i className="fa fa-location-arrow"></i></a>
                                        <a href="javascript:void(0)" className="btn btn-link btn-icon" data-toggle="tooltip" data-placement="bottom" title="Add Photo"><i className="fa fa-camera"></i></a>
                                    </div>
                                </form>
                            </div>
                            <ul className="media-list">
                                <li className="media">
                                    <a href="page_ready_user_profile.html" className="pull-left">
                                        <img src="../../../../assets/images/profile.jpg" alt="Avatar" className="img-circle"></img>
                                    </a>
                                    <div className="media-body">
                                        <span className="text-muted pull-right"><small><em>30 min ago</em></small></span>
                                        <a href="page_ready_user_profile.html"><strong>John Doe</strong></a>
                                        <p>In hac <a href="javascript:void(0)">habitasse</a> platea dictumst. Proin ac nibh rutrum lectus rhoncus eleifend. <a href="javascript:void(0)" className="text-danger"><strong>#dev</strong></a></p>
                                    </div>
                                </li>
                                <li className="media">
                                    <a href="page_ready_user_profile.html" className="pull-left">
                                        <img src="../../../../assets/images/profile.jpg" alt="Avatar" className="img-circle"></img>
                                    </a>
                                    <div className="media-body">
                                        <span className="text-muted pull-right"><small><em>3 hours ago</em></small></span>
                                        <a href="page_ready_user_profile.html"><strong>John Doe</strong></a>
                                        <p>Sed porttitor pretium venenatis. Suspendisse potenti. Aliquam quis ligula elit. Aliquam at orci ac neque semper dictum.</p>
                                    </div>
                                </li>
                                <li className="media">
                                    <a href="page_ready_user_profile.html" className="pull-left">
                                        <img src="../../../../assets/images/profile.jpg" alt="Avatar" className="img-circle"></img>
                                    </a>
                                    <div className="media-body">
                                        <span className="text-muted pull-right"><small><em>yesterday</em></small></span>
                                        <a href="page_ready_user_profile.html"><strong>John Doe</strong></a>
                                        <p>In hac habitasse platea dictumst. Proin ac nibh rutrum <a href="javascript:void(0)">lectus</a> rhoncus eleifend <a href="javascript:void(0)" className="text-danger"><strong>#design</strong></a></p>
                                    </div>
                                </li>
                                <li className="media">
                                    <a href="page_ready_user_profile.html" className="pull-left">
                                        <img src="../../../../assets/images/profile.jpg" alt="Avatar" className="img-circle"></img>
                                    </a>
                                    <div className="media-body">
                                        <span className="text-muted pull-right"><small><em>2 days ago</em></small></span>
                                        <a href="page_ready_user_profile.html"><strong>John Doe</strong></a>
                                        <p>Donec lacinia venenatis metus at bibendum? In hac habitasse platea dictumst. Proin ac nibh rutrum lectus rhoncus eleifend.</p>
                                    </div>
                                </li>
                                <li className="media">
                                    <a href="page_ready_user_profile.html" className="pull-left">
                                        <img src="../../../../assets/images/profile.jpg" alt="Avatar" className="img-circle"></img>
                                    </a>
                                    <div className="media-body">
                                        <span className="text-muted pull-right"><small><em>3 days ago</em></small></span>
                                        <a href="page_ready_user_profile.html"><strong>John Doe</strong></a>
                                        <p>In hac habitasse platea dictumst. Proin ac nibh rutrum lectus rhoncus eleifend.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.userData,
        users: state.users.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUsers: bindActionCreators(fetchUsers, dispatch),
        setMainPageData: bindActionCreators(setMainPageData, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
