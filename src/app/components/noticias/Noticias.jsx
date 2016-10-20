// React
import React, { PropTypes } from 'react';
// // Facebook Plugins
// import {
//     FBComments,
//     FBCommentsCount,
//     FBEmbedPost,
//     FBEmbedVideo,
//     FBFollow,
//     FBLike,
//     FBPage,
//     FBSend,
//     FBShare
// } from 'facebook-plugins';

import Paper from 'material-ui/Paper'
// Colors
import { primary, accent } from 'app/styles/colors';

const styles = {
    container: {
        textAlign: 'center',
        position: 'fixed',
        marginTop: -75,
        marginBottom: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
        left: 0,
        right: 0
    },
    paper: {
        display: 'inline-block',
        width: '100%',
        height: '100%',
        maxWidth: 540
    }
}

export default class Ayuda extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingFBPage: true
        }
    }
    componentDidMount() {
        window.FB.Event.subscribe('xfbml.render', this._facebookPageFinishedLoading);
    }
    componentWillUnmount() {
        window.FB.Event.unsubscribe('xfbml.render', this._facebookPageFinishedLoading);
    }

    _facebookPageFinishedLoading = () => {
        this.setState({
            isLoadingFBPage: false
        })
    }
    render() {
        let width = window.innerWidth;
        let height = window.innerHeight + (-styles.container.marginTop);
        return (
            <div>
                <div hidden={!this.state.isLoadingFBPage} className='news spinner-container'>
                    <img className='news spinner' src={require('assets/images/spinner.gif')}/>
                </div>
                <div className='news container'>
                    <Paper zDepth={2} style={styles.paper}>
                        <FBPage
                            appId="yourFacebookAppId"
                            style={styles.page}
                            href="https://www.facebook.com/facebook"
                            tabs={['timeline']}
                            locale={'es_MX'}
                            smallHeader={true}
                            hideCover={true}
                            width={width}
                            height={height}/>
                    </Paper>
                </div>
            </div>
        )
    }
}

class FBPage extends React.Component {

    static propTypes = {
        adaptContainerWidth: PropTypes.bool,
        appId: PropTypes.string.isRequired,
        height: PropTypes.number,
        hideCover: PropTypes.bool,
        hideCta: PropTypes.bool,
        href: PropTypes.string.isRequired,
        locale: PropTypes.string,
        showFacepile: PropTypes.bool,
        smallHeader: PropTypes.bool,
        tabs: PropTypes.arrayOf(PropTypes.string),
        version: PropTypes.string,
        width: PropTypes.number,
        xfbml: PropTypes.bool

    }

    static defaultProps = {
        adaptContainerWidth: true,
        locale: 'en_US',
        height: 500,
        hideCover: false,
        hideCta: true,
        showFacepile: false,
        smallHeader: false,
        tabs: ['timeline'],
        version: 'v2.5',
        width: 340,
        xfbml: true
    }

    componentDidMount() {
        if (window.FB) {
            window.FB.XFBML.parse()
        }
    }

    render() {
        const {adaptContainerWidth, height, hideCover, hideCta, href, showFacepile, smallHeader, tabs, width} = this.props;
        return (
            <span>
                <div id="fb-root"></div>
                <div className="fb-page"
                    data-href={href}
                    data-width={width}
                    data-height={height}
                    data-adapt-container-width={adaptContainerWidth}
                    data-tabs={tabs.join()}
                    data-hide-cover={hideCover}
                    data-show-facepile={showFacepile}
                    data-hide-cta={hideCta}
                    data-small-header={smallHeader}
                    ></div>
            </span>
        );
    }
}
