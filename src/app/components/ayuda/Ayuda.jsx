// React
import React from 'react';
// Material UI Components
import AppBar from 'material-ui/AppBar';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
// Material Icons
import ChevronLeftIcon from 'material-ui/svg-icons/navigation/chevron-left';

const styles = {
    container: {
        paddingTop: 70,
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: '15%',
        textAlign: 'center'
    },
    appbar: {
        position: 'fixed'
    },
    cardsContainer: {
        textAlign: 'left',
        display: 'inline-block',
        width: '100%',
        maxWidth: 700
    },
    spacer: {
        height: 10
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
            <div>
                <AppBar
                    title='AYUDA'
                    style={styles.appbar}
                    iconElementLeft={<IconButton onClick={this.goBack}><ChevronLeftIcon /></IconButton>}/>
                <div style={styles.container}>
                    <div style={styles.cardsContainer}>
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
                        <div style={styles.spacer}/>
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
                        <div style={styles.spacer}/>
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
                    </div>
                </div>
            </div>
        )
    }
}
