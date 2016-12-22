// React
import React from 'react';
// React Router
import { Link } from 'react-router';
// Libraries and Helpers
import _ from 'lodash';
import linkState from 'app/utils/onChangeHandlerFactory';
// Flux
import SignUpStore from 'app/stores/SignUpStore';
import SignUpActions from 'app/actions/SignUpActions';
// Material UI Components
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
// Phone
import ReactPhoneInput from 'react-phone-input';
// Colots
import { primary, accent } from 'app/styles/colors';

// CSS-in-JS
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
    image: {
        paddingTop: '5%',
        width: '80%'
    },
    link: {
        display: 'inline-block',
        paddingBottom: '5%',
        textDecoration: 'none',
        color: accent
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
    spacer: {
        height: '5vh'
    },
    radioGroup: {
        maxWidth: 250,
        textAlign: 'center'
    },
    radioButton: {
        marginBottom: 16,
    },
    diffCCT: {
        width: '70%',
        paddingLeft: '15%',
        paddingTop: '5%',
        paddingBottom: '5%'
    },
    notice: {
        textAlign: 'justify'
    }
}

export default class Datos extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            name: '',
            lastName1: '',
            lastName2: '',
            cellphone: '',
            cellphoneError: '',
            cct: '',
            cctError: '',
            doneSignUp: false,
            diffCCT: false
        };
    }
    componentDidMount() {
        this.SIGNUP_STORE_ID = SignUpStore.register(this._onChange);
    }

    componentWillUnmount() {
        SignUpStore.unregister(this.SIGNUP_STORE_ID);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.doneSignUp !== null) {
            if (this.state.doneSignUp) {
                let router = this.context.router;
                router.push('/app/home');
            }
        }
    }

    _onChange = () => {
        this.setState({
            doneSignUp: SignUpStore.state.get('doneSignUp')
        })
    }
    handleFormSubmit = (e) => {
        // Prevent default form submit behaviour
        e.preventDefault();

        if (this.allOK()) {
            // Show dialog with privacy notice
            this.handleDialogOpen();
        }

        return false;
    }

    handleCellphone = (event) => {
        let value = event.target.value;
        if (value.length <= 10 && this.state.cellphone !== null) {
            this.setState({
                'cellphone': value,
                'cellphoneError': ''
            });
        }
    }

    handleCCT = (event) => {
        let value = event.target.value;
        if (this.state.diffCCT) {
            if (value.length <= 16 && this.state.cct !== null) {
                this.setState({
                    'cct': value.toUpperCase(),
                    'cctError': ''
                });
            }
        } else if (value.length <= 10 && this.state.cct !== null) {
            this.setState({
                'cct': value.toUpperCase(),
                'cctError': ''
            });
        }
    }

    handleDialogOK = () => {
        let data = {};
        data.name = this.state.name;
        data.lastName1 = this.state.lastName1;
        data.lastName2 = this.state.lastName2;
        data.cellphone = this.state.cellphone;
        data.cct = this.state.cct;

        SignUpActions.setSignUpData(data);
    }

    handleDialogOpen = () => {
        this.setState({
            dialogOpen: true
        });
    }

    handleDialogClose = () => {
        this.setState({
            dialogOpen: false
        });
    }

    handleCheckbox = (event, isInputChecked) => {
        if (!isInputChecked && this.state.cct.length > 10) {
            this.setState({
                'cct': this.state.cct.slice(0,10),
                'cctError': ''
            });
        }
        this.setState({
            diffCCT: isInputChecked
        });
    }

    allOK = () => {
        let cellphone = false;
        let cct = false;

        if (this.state.cellphone.length === 10) {
            cellphone = true;
        } else {
            this.setState({
                'cellphoneError': 'Número celular inválido'
            })
        }

        let reg = new RegExp('^([0-2][1-9]|[3][0-2]|[1-2][0])[A-Z]{3}\\d{4}[A-Z]{1}$');

        if (this.state.diffCCT) {
            cct = true;
        } else if (this.state.cct.length === 10) {
            if (reg.test(this.state.cct)) {
                cct = true;
            } else {
                this.setState({
                    'cctError': 'Formato de CCT inválido'
                })
            }
        } else {
            this.setState({
                'cctError': 'Formato de CCT inválido'
            })
        }

        return cellphone && cct;

    }

    render() {
        const actions = [
            <FlatButton
                label="No Acepto"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleDialogClose}
                />,
            <FlatButton
                label="Acepto"
                secondary={true}
                onTouchTap={this.handleDialogOK}
                />,
        ];
        return (
            <div>
                <Dialog
                    title="Aviso de Privacidad"
                    actions={actions}
                    modal={false}
                    open={this.state.dialogOpen}
                    onRequestClose={this.handleDialogClose}
                    autoScrollBodyContent={true}
                    >
                    <section style={styles.notice}>
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
                        <hr/>
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
                    </section>
                </Dialog>
                <div style={styles.container}>
                    <div style={styles.innerContainer}>
                        <section style={styles.title}>
                            Ingresa tus datos
                        </section>
                        <section style={styles.legend}>
                            Termina tu registro llenando los siguientes datos para empezar a utilizar la aplicación.
                        </section>
                        <form onSubmit={this.handleFormSubmit}>
                            <section>
                                <TextField
                                    required={true}
                                    hintText="Nombre(s)"
                                    floatingLabelText="Nombre(s)"
                                    value={this.state.name}
                                    onChange={linkState(this, 'name')}
                                    />
                            </section>
                            <section>
                                <TextField
                                    required={true}
                                    hintText="Apellido Paterno"
                                    floatingLabelText="Apellido Paterno"
                                    value={this.state.lastName1}
                                    onChange={linkState(this, 'lastName1')}
                                    />
                            </section>
                            <section>
                                <TextField
                                    required={true}
                                    hintText="Apellido Materno"
                                    floatingLabelText="Apellido Materno"
                                    value={this.state.lastName2}
                                    onChange={linkState(this, 'lastName2')}
                                    />
                            </section>
                            <section>
                                <TextField
                                    type='number'
                                    required={true}
                                    hintText="Número Celular"
                                    floatingLabelText="Número Celular (10 números)"
                                    errorText={this.state.cellphoneError}
                                    value={this.state.cellphone}
                                    onChange={this.handleCellphone}
                                    />
                            </section>
                            <section>
                                <TextField
                                    required={true}
                                    hintText="Clave de Centro de Trabajo"
                                    floatingLabelText="Clave de Centro de Trabajo"
                                    errorText={this.state.cctError}
                                    value={this.state.cct}
                                    onChange={this.handleCCT}
                                    />
                            </section>
                            <section style={styles.diffCCT}>
                                <Checkbox
                                    labelStyle={{color: 'grey'}}
                                    label='Mi CCT es diferente'
                                    onCheck={this.handleCheckbox}/>
                            </section>
                            <section >
                                <span >
                                    <RaisedButton
                                        type="submit"
                                        label="Terminar Registro"
                                        secondary={true}
                                        style={styles.button} />
                                </span>
                            </section>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
