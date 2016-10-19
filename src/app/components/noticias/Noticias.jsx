// React
import React from 'react';
// Facebook Plugins
import {
    FBComments,
    FBCommentsCount,
    FBEmbedPost,
    FBEmbedVideo,
    FBFollow,
    FBLike,
    FBPage,
    FBSend,
    FBShare
} from 'facebook-plugins';
// Colors
import { primary, accent } from 'app/styles/colors';
// Spinner Loader
import Loader from 'react-loader'

// Material UI Components

// Material Icons


const styles = {
    container: {

    },
    divStyle: {
        padding: '2%'
    }
}

export default class Ayuda extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    componentDidMount() {

    }

    goBack = () => {
        window.history.back();
    }
    render() {
        let loaderOptions = {
            lines: 9,
            length: 20,
            color: primary,
            radius: 30,
            width: 10
        }
        return (
            <div>
                <Loader loaded={!this.state.isLoading} options={loaderOptions}>
                    <div style={styles.container}>
                        <div>
                            <div style={styles.divStyle}>
                                <FBLike appId="yourFacebookAppId"
                                    href="http://facebook.com"
                                    action="like"
                                    layout="button_count"
                                    locale="es_MX"
                                    share={true}
                                    showFaces={true}/>
                            </div>
                            <div style={styles.divStyle}>
                                <FBSend appId="yourFacebookAppId"
                                    href="http://facebook.com"/>
                            </div>
                            <div style={styles.divStyle}>
                                <FBShare appId="yourFacebookAppId"
                                    href="http://facebook.com"
                                    layout="box_count"
                                    locale="es_MX"/>
                            </div>
                            <div style={styles.divStyle}>
                                <FBEmbedPost appId="yourFacebookAppId"
                                    href="https://www.facebook.com/20531316728/posts/10154009990506729/"
                                    width={750}
                                    locale="es_MX"/>
                            </div>
                            <div style={styles.divStyle}>
                                <FBEmbedVideo appId="yourFacebookAppId"
                                    href="https://www.facebook.com/facebook/videos/10153231379946729/"
                                    width={750}
                                    locale="es_MX"/>
                            </div>
                            <div style={styles.divStyle}>
                                <FBComments appId="yourFacebookAppId"
                                    href="http://developers.facebook.com/docs/plugins/comments/"
                                    width={750}
                                    numPosts={5}
                                    locale="es_MX"/>
                            </div>
                            <div style={styles.divStyle}>
                                <FBCommentsCount appId="yourFacebookAppId"
                                    href="http://developers.facebook.com/docs/plugins/comments/"
                                    width={750}
                                    numPosts={5}
                                    locale="es_MX"/>
                            </div>
                            <div style={styles.divStyle}>
                                <FBPage appId="yourFacebookAppId"
                                    href="https://www.facebook.com/facebook"
                                    tabs={['timeline', 'events', 'messages']}/>
                            </div>
                            <div style={styles.divStyle}>
                                <FBFollow appId="yourFacebookAppId"
                                    href="https://www.facebook.com/zuck"
                                    tabs={['timeline', 'events', 'messages']}/>
                            </div>
                        </div>
                    </div>
                </Loader>
            </div>
        )
    }
}
