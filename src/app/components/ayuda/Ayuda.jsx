// React
import React from 'react';
import { Link, hashHistory } from 'react-router';
// Material UI Components
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
// Components
import ArrowBack from 'app/components/misc/ArrowBack';
// Colors
import { primary, accent } from 'app/styles/colors';
// Textos
import { AyudaTxt } from 'assets/texts/AyudaTxt';

const styles = {
    container: {
        paddingTop: '2%',
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: '0%',
        textAlign: 'center',
    },
    innerContainer: {
        display: 'inline-block',
        width: '100%',
        maxWidth: 400
    },
    button: {
        margin: 12,
        width: '70%',
        height: 50
    },
    title: {
        paddingTop: '12%',
        paddingBottom: '5%',
        fontSize: 30,
        fontWeight: 500,
        color: primary
    },
    legend: {
        color: 'grey',
        paddingTop: '5%',
        paddingLeft: '10%',
        paddingRight: '10%',
        textAlign: 'center'
    },
    divider: {
        maxWidth: '80%',
        height: 1,
        border: 'none',
        backgroundColor: 'rgb(224, 224, 224)'
    },
    cardsContainer: {
        textAlign: 'left'
    },
    cardSpacer: {
        height: 10
    },
    spacer: {
        height: '5vh'
    },
    footer: {
        color: 'grey'
    }
}


export default class Ayuda extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chatHelp: false,
            eventsHelp: false,
            messagesHelp: false,
            newsHelp: false,
            resourcesHelp: false
        };
    }

    handleChatHelp = (expanded) => {
        this.setState({
            chatHelp: expanded
        })
    }

    handleEventsHelp = (expanded) => {
        this.setState({
            eventsHelp: expanded
        })
    }

    handleMessagesHelp = (expanded) => {
        this.setState({
            messagesHelp: expanded
        })
    }

    handleNewsHelp = (expanded) => {
        this.setState({
            newsHelp: expanded
        })
    }

    handleResourcesHelp = (expanded) => {
        this.setState({
            resourcesHelp: expanded
        })
    }

    render() {
        return (
            <div style={styles.container}>
                <ArrowBack />
                <div style={styles.innerContainer}>
                    <section style={styles.title}>
                        Ayuda
                    </section>
                    <div style={styles.spacer}/>
                    <div style={styles.cardsContainer}>
                        <Card expanded={this.state.chatHelp} onExpandChange={this.handleChatHelp}>
                            <CardHeader
                                title={AyudaTxt.Foro.title}
                                subtitle={AyudaTxt.Foro.subtitle}
                                actAsExpander={true}
                                showExpandableButton={true}
                                />
                            <CardText expandable={true}>
                                {AyudaTxt.Foro.text}
                            </CardText>
                        </Card>
                        <div style={styles.cardSpacer}/>
                        <Card expanded={this.state.eventsHelp} onExpandChange={this.handleEventsHelp}>
                            <CardHeader
                                title={AyudaTxt.Eventos.title}
                                subtitle={AyudaTxt.Eventos.subtitle}
                                actAsExpander={true}
                                showExpandableButton={true}
                                />
                            <CardText expandable={true}>
                                {AyudaTxt.Eventos.text}
                            </CardText>
                        </Card>
                        <div style={styles.cardSpacer}/>
                        <Card expanded={this.state.messagesHelp} onExpandChange={this.handleMessagesHelp}>
                            <CardHeader
                                title={AyudaTxt.Mensaje.title}
                                subtitle={AyudaTxt.Mensaje.subtitle}
                                actAsExpander={true}
                                showExpandableButton={true}
                                />
                            <CardText expandable={true}>
                                {AyudaTxt.Mensaje.text}
                            </CardText>
                        </Card>
                        <div style={styles.cardSpacer}/>
                        <Card expanded={this.state.newsHelp} onExpandChange={this.handleNewsHelp}>
                            <CardHeader
                                title={AyudaTxt.Noticias.title}
                                subtitle={AyudaTxt.Noticias.subtitle}
                                actAsExpander={true}
                                showExpandableButton={true}
                                />
                            <CardText expandable={true}>
                                {AyudaTxt.Noticias.text}
                            </CardText>
                        </Card>
                        <div style={styles.cardSpacer}/>
                        <Card expanded={this.state.resourcesHelp} onExpandChange={this.handleResourcesHelp}>
                            <CardHeader
                                title={AyudaTxt.Recursos.title}
                                subtitle={AyudaTxt.Recursos.subtitle}
                                actAsExpander={true}
                                showExpandableButton={true}
                                />
                            <CardText expandable={true}>
                                {AyudaTxt.Recursos.text}
                            </CardText>
                        </Card>
                    </div>
                    <div style={styles.spacer}/>
                    <hr style={styles.divider}/>
                    <p style={styles.footer}>
                        Comunidad UNETE 2016
                    </p>
                </div>
            </div>
        )
    }
}
