// React
import React from 'react';
// Material UI Components
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

// Material Icons
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import { primary, accent } from 'app/styles/colors';


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
    cardSpacer: {
        height: 10
    },
    spacer: {
        height: '5vh'
    },
    icon: {
        width: 40,
        height: 40,
        color: primary
    },
    iconButton: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        padding: 10,
    }
}


export default class Ayuda extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedOne: false,
            expandedTwo: false,
            expandedThree: false,
        };
    }

    handleExpandChangeOne = (expanded) => {
        this.setState({
            expandedOne: expanded,
            expandedTwo: false,
            expandedThree: false
        });
    };

    handleExpandChangeTwo = (expanded) => {
        this.setState({
            expandedOne: false,
            expandedTwo: expanded,
            expandedThree: false
        });
    };

    handleExpandChangeThree = (expanded) => {
        this.setState({
            expandedOne: false,
            expandedTwo: false,
            expandedThree: expanded
        });
    };

    goBack = () => {
        window.history.back();
    }
    render() {
        return (
            <div style={styles.container}>
                <IconButton
                    onClick={this.goBack}
                    iconStyle={styles.icon}
                    style={styles.iconButton}
                    >
                    <ArrowBackIcon />
                </IconButton>
                <div style={styles.innerContainer}>
                    <section style={styles.title}>
                        Ayuda
                    </section>
                    <div style={styles.spacer}/>
                    <Card expanded={this.state.expandedOne} onExpandChange={this.handleExpandChangeOne}>
                        <CardHeader
                            title="Ayuda Uno"
                            subtitle="Subtítulo de Ayuda Uno"
                            actAsExpander={true}
                            showExpandableButton={true}
                            />
                        <CardText expandable={true}>
                            Bacon ipsum dolor amet venison shankle pastrami, andouille biltong ground round short loin doner cupim turducken swine spare ribs. Ball tip picanha fatback jowl pork belly beef ribs bacon tenderloin venison shoulder ribeye salami rump corned beef spare ribs. T-bone shoulder alcatra kevin cupim chicken strip steak meatloaf pancetta. Fatback boudin frankfurter bacon tail. Alcatra beef shankle tail shoulder, chicken swine capicola doner ham hock tri-tip flank drumstick pork. Burgdoggen jerky hamburger chuck, picanha boudin tri-tip biltong short loin spare ribs pig chicken drumstick shankle pork belly.
                        </CardText>
                    </Card>
                    <div style={styles.cardSpacer}/>
                    <Card expanded={this.state.expandedTwo} onExpandChange={this.handleExpandChangeTwo}>
                        <CardHeader
                            title="Ayuda Dos"
                            subtitle="Subtítulo de Ayuda Dos"
                            actAsExpander={true}
                            showExpandableButton={true}
                            />
                        <CardText expandable={true}>
                            Bacon ipsum dolor amet venison shankle pastrami, andouille biltong ground round short loin doner cupim turducken swine spare ribs. Ball tip picanha fatback jowl pork belly beef ribs bacon tenderloin venison shoulder ribeye salami rump corned beef spare ribs. T-bone shoulder alcatra kevin cupim chicken strip steak meatloaf pancetta. Fatback boudin frankfurter bacon tail. Alcatra beef shankle tail shoulder, chicken swine capicola doner ham hock tri-tip flank drumstick pork. Burgdoggen jerky hamburger chuck, picanha boudin tri-tip biltong short loin spare ribs pig chicken drumstick shankle pork belly.
                        </CardText>
                    </Card>
                    <div style={styles.cardSpacer}/>
                    <Card expanded={this.state.expandedThree} onExpandChange={this.handleExpandChangeThree}>
                        <CardHeader
                            title="Ayuda Tres"
                            subtitle="Subtítulo de Ayuda Tres"
                            actAsExpander={true}
                            showExpandableButton={true}
                            />
                        <CardText expandable={true}>
                            Bacon ipsum dolor amet venison shankle pastrami, andouille biltong ground round short loin doner cupim turducken swine spare ribs. Ball tip picanha fatback jowl pork belly beef ribs bacon tenderloin venison shoulder ribeye salami rump corned beef spare ribs. T-bone shoulder alcatra kevin cupim chicken strip steak meatloaf pancetta. Fatback boudin frankfurter bacon tail. Alcatra beef shankle tail shoulder, chicken swine capicola doner ham hock tri-tip flank drumstick pork. Burgdoggen jerky hamburger chuck, picanha boudin tri-tip biltong short loin spare ribs pig chicken drumstick shankle pork belly.
                        </CardText>
                    </Card>
                    <div style={styles.spacer}/>
                    <hr style={styles.divider}/>
                    
                </div>
            </div>
        )
    }
}
