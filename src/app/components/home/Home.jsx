import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
    container: {
        paddingLeft: '1%',
        paddingRight: '1%'
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        marginBottom: 24,
    },
};

const tilesData = [
    {
        img: require('assets/images/libros.jpg'),
        title: 'Cursos',
        author: 'avepizz',
    },
    {
        img: require('assets/images/estadistica.jpg'),
        title: 'Estadisticas',
        author: 'avepizz',
    },
    {
        img: require('assets/images/noticias.jpg'),
        title: 'Noticias',
        author: 'avepizz',
    },
    {
        img: require('assets/images/curp.jpg'),
        title: 'CURP',
        author: 'avepizz',
    },
    {
        img: require('assets/images/mensaje.jpg'),
        title: 'Mensajes',
        author: 'avepizz',
    }

];

export default class Launcher extends React.Component {
    render() {
        return (
            <div style={styles.container}>
                <div style={styles.root}>
                    <GridList
                        cellHeight={200}
                        style={styles.gridList}>
                        {tilesData.map((tile) => (
                            <GridTile
                                key={tile.img}
                                title={tile.title}
                                subtitle={<span>by <b>{tile.author}</b></span>}
                                actionIcon={<IconButton><StarBorder color="white" /></IconButton>}>
                                <img src={tile.img} />
                            </GridTile>
                        ))}
                    </GridList>
                </div>
            </div>
        )
    }
}
