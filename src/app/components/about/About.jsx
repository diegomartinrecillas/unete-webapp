// React
import React from 'react';
// Components
import ArrowBack from 'app/components/misc/ArrowBack';
import CenteredContainer from 'app/components/misc/CenteredContainer';
import Divider from 'app/components/misc/Divider';
import InnerContainer from 'app/components/misc/InnerContainer';
// Material UI Components
import Paper from 'material-ui/Paper';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
// Colors
import { primary, accent } from 'app/styles/colors';

const styles = {
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
    cardsContainer: {
        textAlign: 'left'
    },
    cardSpacer: {
        height: 10
    },
    cardText: {
        textAlign: 'justify'
    },
    spacer: {
        height: '5vh'
    },
    footer: {
        color: 'grey'
    }
}

export default class About extends React.Component {
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

    render() {
        return (
            <CenteredContainer>
                <ArrowBack/>
                <InnerContainer>
                    <section style={styles.title}>
                        Acerca de UNETE
                    </section>
                    <div style={styles.spacer}/>
                    <div style={styles.cardsContainer}>
                        <Card expanded={this.state.expandedOne} onExpandChange={this.handleExpandChangeOne}>
                            <CardHeader
                                title="¿Qué es la Comunidad UNETE?"
                                actAsExpander={true}
                                showExpandableButton={true}
                                />
                            <CardText expandable={true} style={styles.cardText}>
                                <p>
                                    UNETE, comprometido con la calidad y equidad de la educación en México, ha desarrollado el portal educativo de la Comunidad UNETE que tiene por objetivo acercar a la comunidad docente, recursos didácticos y herramientas tecnológicas dirigidas a cada nivel educativo.
                                    Este espacio cuenta con los mejores contenidos educativos digitales tanto nacionales como internacionales, con los que el docente tiene la posibilidad de calificarlos, comentarlos, compartirlos y recomendarlos a la comunidad escolar.
                                </p>
                                <p>
                                    Contamos con cuatro diferentes modelos de equipamiento tecnológico, en base a las necesidades particulares de las escuelas de educación básica y pública de México. Asimismo, ofrecemos un modelo de capacitación como complemento al modelo de equipamiento denominado “Trayecto Formativo”, el cual favorece al docente en el desarrollo de habilidades de pensamiento, tecnológicas, de comunicación y para la vida.
                                </p>
                                <p>
                                    Propiciamos nuevos ambientes de aprendizaje para que el docente intercambie información y contenidos a través de nuestra Red Docente, conformada por foros y comunidades virtuales que generan espacios de encuentro y colaboración.
                                </p>
                                <p>
                                    Te invitamos a integrarte a la Comunidad UNETE para que descubras los grandes beneficios que encontrarás para tu práctica docente.
                                </p>
                            </CardText>
                        </Card>
                        <div style={styles.cardSpacer}/>
                        <Card expanded={this.state.expandedTwo} onExpandChange={this.handleExpandChangeTwo}>
                            <CardHeader
                                title="Aviso de Privacidad y manejo de datos personales UNETE, A.C."
                                actAsExpander={true}
                                showExpandableButton={true}
                                />
                            <CardText expandable={true} style={styles.cardText}>
                                <p>
                                    La Unión de Empresarios para la Tecnología en la Educación, Asociación Civil (“UNETE”), con domicilio en General Salvador Alvarado 8 - 2o. Piso, Col. Hipódromo Condesa, C.P. 06170, México, Distrito Federal, informa el tratamiento que se otorga a sus datos personales y datos personales sensibles (los “Datos”). Los Datos, entre los que se encuentran, de manera enunciativa, mas no limitativa; nombre, dirección, correo electrónico, teléfono, fecha de nacimiento, sexo, número de cuenta bancaria, Registro Federal de Contribuyentes y que se obtienen directamente de usted; tienen como finalidad integrar los procedimientos de UNETE para:
                                </p>

                                <ol>
                                    <li>
                                        Promoción de actividades y eventos que realice UNETE relacionados con su misión y objeto social.
                                    </li>
                                    <li>
                                        Procesos de gestión administrativa interna.
                                    </li>
                                    <li>
                                        Integrar la base de datos sobre impacto de los programas en las escuelas en relación con los resultados de alumnos, maestros y padres de familia.
                                    </li>
                                    <li>
                                        Integrar la base de datos de donantes, proveedores y especialistas de UNETE.
                                    </li>
                                    <li>
                                        Seguimiento y atención de especialistas, donantes y programas de obtención de fondos para UNETE.
                                    </li>
                                    <li>
                                        Participación en concursos para la expansión de los proyectos y programas de UNETE para la obtención de fondos.
                                    </li>
                                    <li>
                                        Contratación, evaluación y desarrollo de especialistas y proveedores que colaboren con UNETE.
                                    </li>
                                    <li>
                                        Procesos relacionados a encuestas y evaluaciones de programas educativos en las escuelas beneficiadas por UNETE.
                                    </li>
                                    <li>
                                        Enviar información promocional de cursos, talleres, eventos y actividades.
                                    </li>
                                    <li>
                                        Validar y verificar la gestión de los especialistas, proveedores y colaboradores.
                                    </li>
                                    <li>
                                        Compartir o transferir los datos con terceros únicamente en relación con la implementación de nuevos programas en las escuelas beneficiadas y para la obtención de donativos.
                                    </li>
                                    <li>
                                        Recolección y publicación de fotos en medios impresos (folletos, gacetas, revistas, periódicos, etc.) y electrónicos (sitios web, redes sociales, etc.) de eventos académicos, administrativos, reconocimientos y especiales.
                                    </li>
                                    <li>
                                        Elaboración de estadísticas e informes.
                                    </li>
                                    <li>
                                        Permitir a UNETE la acreditación con terceros y frente a la Secretaría de Educación Pública u otras autoridades, así como el establecimiento de convenios.
                                    </li>
                                    <li>
                                        Implementar y reforzar la relación con otras instituciones afines, donantes y autoridades.
                                    </li>
                                    <li>
                                        Realizar las actividades y los proyectos en las escuelas con alumnos, padres de familia y maestros.
                                    </li>
                                    <li>
                                        UNETE observa los principios de confidencialidad, licitud, consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y responsabilidad en la protección de los Datos.
                                    </li>
                                </ol>

                                <p>
                                    Los Datos serán tratados de conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y su Reglamento. Únicamente las personas autorizadas por UNETE y con quienes medie un convenio de confidencialidad tendrán acceso a sus Datos.
                                </p>
                                <p>
                                    En caso de existir alguna modificación al presente Aviso de Privacidad se hará de su conocimiento en nuestro sitio de Internet http://www.unete.org
                                </p>
                                <p>
                                    En cualquier momento Ud. podrá ejercer los derechos de acceso, rectificación, cancelación u oposición (“Derechos ARCO”) al tratamiento de sus Datos, presentando su solicitud a través del correo electrónico: [ contacto@uneteya.org]
                                </p>
                                <p>
                                    UNETE comunicará al titular en quince días hábiles, contados desde la fecha en que se recibió la solicitud de acceso, rectificación, cancelación u oposición, para que proceda de conformidad a lo requerido y responda a Ud. dentro de los quince días siguientes por el mismo medio electrónico.
                                </p>
                                <p>
                                    Tratándose de solicitudes de acceso a datos personales, procederá la entrega, previa acreditación del interés legítimo del solicitante o su representante legal (identidad  y copia de poder notarial según corresponda). Los plazos, antes referidos podrán ampliarse por un periodo igual, siempre que las circunstancias lo ameriten.
                                </p>
                                <p>
                                    Por favor tome en cuenta que el sitio web www.uneteya.org contiene enlaces a otros sitios web de redes asociadas y terceros, por lo que si usted accede a un hipervínculo de esos sitios web, estos pueden tener sus propias políticas de privacidad, de las cuales UNETE no se hace responsable, ni tampoco de la intrusión de datos, pérdida de datos o programas maliciosos que se pudieran alojar en su equipo de navegación. La inclusión de cualquier vínculo a otros sitios web, no implica la aprobación o adhesión por parte de UNETE a esas páginas o de su contenido.
                                </p>
                                <p>
                                    En virtud de la entrega de formatos impresos o llenado en nuestros sitios o su remisión electrónica incluyendo mensajes por vía celular (SMS, MMS o equivalentes), Usted está de acuerdo con la recopilación, uso, transferencia y almacenamiento de los Datos en los términos antedichos, lo que significa que si en el plazo de 30 días siguientes a que tenga acceso a este Aviso de Privacidad, no se opone a sus términos entenderemos que ha aceptado las políticas de manejo de datos expuestos en este Aviso de Privacidad.
                                </p>
                                <p>
                                    Ud. podrá revocar su consentimiento o autorización al tratamiento de sus Datos personales para lo cual bastará con entregar con acuse de recibo un aviso en ese sentido correo electrónico: [ contacto@unete.org], mismo que por ninguna causa podrá tener efectos retroactivos.
                                </p>
                            </CardText>
                        </Card>
                        <div style={styles.cardSpacer}/>
                        <Card expanded={this.state.expandedThree} onExpandChange={this.handleExpandChangeThree}>
                            <CardHeader
                                title="Aviso de Privacidad y manejo de datos personales UNETE, I.A.P."
                                actAsExpander={true}
                                showExpandableButton={true}
                                />
                            <CardText expandable={true} style={styles.cardText}>
                                <p>
                                    UNETE, Institución de Asistencia Privada (“UNETE”), con domicilio en General Salvador Alvarado 8 - 2o. Piso, Col. Hipódromo Condesa, C.P. 06170, México, Distrito Federal, informa el tratamiento que se otorga a sus datos personales y datos personales sensibles (los “Datos”). Los Datos, entre los que se encuentran, de manera enunciativa, mas no limitativa; nombre, dirección, correo electrónico, teléfono, fecha de nacimiento, sexo, número de cuenta bancaria, Registro Federal de Contribuyentes y que se obtienen directamente de usted; tienen como finalidad integrar los procedimientos de UNETE para:
                                </p>
                                <ol>
                                    <li>
                                        Promoción de actividades y eventos que realice UNETE relacionados con su misión y objeto social.
                                    </li>
                                    <li>
                                        Procesos de gestión administrativa interna.
                                    </li>
                                    <li>
                                        Integrar la base de datos sobre impacto de los programas en las escuelas en relación con los resultados de alumnos, maestros y padres de familia.
                                    </li>
                                    <li>
                                        Integrar la base de datos de donantes, proveedores y especialistas de UNETE.
                                    </li>
                                    <li>
                                        Seguimiento y atención de especialistas, donantes y programas de obtención de fondos para UNETE.
                                    </li>
                                    <li>
                                        Participación en concursos para la expansión de los proyectos y programas de UNETE para la obtención de fondos.
                                    </li>
                                    <li>
                                        Contratación, evaluación y desarrollo de especialistas y proveedores que colaboren con UNETE.
                                    </li>
                                    <li>
                                        Procesos relacionados a encuestas y evaluaciones de programas educativos en las escuelas beneficiadas por UNETE.
                                    </li>
                                    <li>
                                        Enviar información promocional de cursos, talleres, eventos y actividades.
                                    </li>
                                    <li>
                                        Validar y verificar la gestión de los especialistas, proveedores y colaboradores.
                                    </li>
                                    <li>
                                        Compartir o transferir los datos con terceros únicamente en relación con la implementación de nuevos programas en las escuelas beneficiadas y para la obtención de donativos.
                                    </li>
                                    <li>
                                        Recolección y publicación de fotos en medios impresos (folletos, gacetas, revistas, periódicos, etc.) y electrónicos (sitios web, redes sociales, etc.) de eventos académicos, administrativos, reconocimientos y especiales.
                                    </li>
                                    <li>
                                        Elaboración de estadísticas e informes.
                                    </li>
                                    <li>
                                        Permitir a UNETE la acreditación con terceros y frente a la Secretaría de Educación Pública u otras autoridades, así como el establecimiento de convenios.
                                    </li>
                                    <li>
                                        Implementar y reforzar la relación con otras instituciones afines, donantes y autoridades.
                                    </li>
                                    <li>
                                        Realizar las actividades y los proyectos en las escuelas con alumnos, padres de familia y maestros.
                                    </li>
                                    <li>
                                        UNETE observa los principios de confidencialidad, licitud, consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y responsabilidad en la protección de los Datos.
                                    </li>
                                </ol>
                                <p>
                                    Los Datos serán tratados de conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y su Reglamento. Únicamente las personas autorizadas por UNETE y con quienes medie un convenio de confidencialidad tendrán acceso a sus Datos.
                                </p>
                                <p>
                                    En caso de existir alguna modificación al presente Aviso de Privacidad se hará de su conocimiento en nuestro sitio de Internet http://www.unete.org
                                </p>
                                <p>

                                </p>
                                <p>
                                    En cualquier momento Ud. podrá ejercer los derechos de acceso, rectificación, cancelación u oposición (“Derechos ARCO”) al tratamiento de sus Datos, presentando su solicitud a través del correo electrónico: [ contacto@uneteya.org]
                                </p>
                                <p>
                                    UNETE comunicará al titular en quince días hábiles, contados desde la fecha en que se recibió la solicitud de acceso, rectificación, cancelación u oposición, para que proceda de conformidad a lo requerido y responda a Ud. dentro de los quince días siguientes por el mismo medio electrónico.
                                </p>
                                <p>
                                    Tratándose de solicitudes de acceso a datos personales, procederá la entrega, previa acreditación del interés legítimo del solicitante o su representante legal (identidad  y copia de poder notarial según corresponda). Los plazos, antes referidos podrán ampliarse por un periodo igual, siempre que las circunstancias lo ameriten.
                                </p>
                                <p>
                                    Por favor tome en cuenta que el sitio web www.uneteya.org contiene enlaces a otros sitios web de redes asociadas y terceros, por lo que si usted accede a un hipervínculo de esos sitios web, estos pueden tener sus propias políticas de privacidad, de las cuales UNETE no se hace responsable, ni tampoco de la intrusión de datos, pérdida de datos o programas maliciosos que se pudieran alojar en su equipo de navegación. La inclusión de cualquier vínculo a otros sitios web, no implica la aprobación o adhesión por parte de UNETE a esas páginas o de su contenido.
                                </p>
                                <p>
                                    En virtud de la entrega de formatos impresos o llenado en nuestros sitios o su remisión electrónica incluyendo mensajes por vía celular (SMS, MMS o equivalentes), Usted está de acuerdo con la recopilación, uso, transferencia y almacenamiento de los Datos en los términos antedichos, lo que significa que si en el plazo de 30 días siguientes a que tenga acceso a este Aviso de Privacidad, no se opone a sus términos entenderemos que ha aceptado las políticas de manejo de datos expuestos en este Aviso de Privacidad.
                                </p>
                                <p>
                                    Ud. podrá revocar su consentimiento o autorización al tratamiento de sus Datos personales para lo cual bastará con entregar con acuse de recibo un aviso en ese sentido correo electrónico: [ contacto@unete.org], mismo que por ninguna causa podrá tener efectos retroactivos.
                                </p>
                            </CardText>
                        </Card>
                    </div>
                    <div style={styles.spacer}/>
                    <Divider/>
                    <p style={styles.footer}>
                        Comunidad UNETE 2016
                    </p>
                </InnerContainer>
            </CenteredContainer>
        );
    }
}
