// React
import React from 'react';
// React router
import { Link } from 'react-router';
// Material UI Components
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
    container: {
        marginTop: 10,
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
        marginBottom: 0,
        maxWidth: 440
    },
    tile: {}
};

const tilesData = [
    {
        id: 0,
        img: require('assets/images/discusion.jpg'),
        title: 'Discusión',
        link: '/app/chat'
    },
    {
        id: 1,
        img: require('assets/images/eventos.jpg'),
        title: 'Eventos',
        link: '/app/eventos'
    },
    {
        id: 2,
        img: require('assets/images/mensaje-a-unete.jpg'),
        title: 'Mensaje a UNETE',
        link: '/app/mensajes'
    },
    {
        id: 3,
        img: require('assets/images/noticias.jpg'),
        title: 'Noticias',
        link: '/app/noticias'
    },
    {
        id: 4,
        img: require('assets/images/contenidos-unete.jpg'),
        title: 'Contenidos UNETE',
        link: '/app/recursos'
    },
    // {
    //     id: 5,
    //     img: require('assets/images/img_mesa_ayuda.jpg'),
    //     title: 'Mesa de Ayuda',
    //     link: '/app/mesa_ayuda'
    // }

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
                            <Link key={tile.id} to={tile.link} >
                                <GridTile
                                    key={tile.id}
                                    title={tile.title}
                                    style={styles.tile}
                                    >
                                    <img src={tile.img} />
                                </GridTile>
                            </Link>
                        ))}
                    </GridList>
                </div>
            </div>
        )
    }
}
