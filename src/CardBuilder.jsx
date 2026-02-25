import React from 'react';
import CardPreview from './CardPreview'
import {useEffect} from 'react'
import domtoimage from 'dom-to-image';

function CardBuilder() {
    const [title, setTitle] = React.useState("Nueva Carta");
    const [type, setType] = React.useState("criatura");
    const [faction, setFaction] = React.useState("ninguna");
    const [race, setRace] = React.useState("ninguna");
    const [cclass, setClass] = React.useState("ninguna");

    const [spellAtt1, setSpellAtt1] = React.useState("ninguno");
    const [spellAtt2, setSpellAtt2] = React.useState("ninguno");
    const [spellAtt3, setSpellAtt3] = React.useState("ninguno");
    const [repeatedSpellAtts, setRepeatedSpellAtts] = React.useState(false);
    const [spellAtts, setSpellAtts] = React.useState([]);

    const [element1, setElement1] = React.useState("ninguno");
    const [element2, setElement2] = React.useState("ninguno");
    const [element3, setElement3] = React.useState("ninguno");
    const [element4, setElement4] = React.useState("ninguno");
    const [repeatedElement, setRepeatedElement] = React.useState(false);
    const [elements, setElements] = React.useState([]);

    const scale = window.devicePixelRatio;

    useEffect(() => { 
        updateElements()
    }, [element1, element2, element3, element4]);

    useEffect(() => {
        updateSpellAtts()
    }, [spellAtt1, spellAtt2, spellAtt3]);

    const [health, setHealth] = React.useState(10);
    const [mana, setMana] = React.useState(1);
    const [attack, setAttack] = React.useState(3);
    const [accuracy, setAccuracy] = React.useState(1);
    const [speed, setSpeed] = React.useState(1);
    const [defense, setDefense] = React.useState(1);

    const [description, setDescription] = React.useState("");
    const [htmlDescription, setHTMLDescription] = React.useState("");

    const [errorText, setErrorText] = React.useState("");

    useEffect(() => { 
        // STATS
        let finalDesc = parseStatInText(description, "!DEF", "defensa");
        finalDesc = parseStatInText(finalDesc, "!ATK", "ataque", "ATK");
        finalDesc = parseStatInText(finalDesc, "!VIDA", "vida", "VIDA");
        finalDesc = parseStatInText(finalDesc, "!MANA", "mana", "MANÁ");
        finalDesc = parseStatInText(finalDesc, "!PUN", "punteria", "PUN");
        finalDesc = parseStatInText(finalDesc, "!VEL", "velocidad", "VEL");
        // Facciones
        finalDesc = parseStatInText(finalDesc, "$NIN", "ninguna");
        finalDesc = parseStatInText(finalDesc, "$THA", "thavensol");
        finalDesc = parseStatInText(finalDesc, "$HIV", "hivebreed");
        finalDesc = parseStatInText(finalDesc, "$KOR", "korai-kan");
        finalDesc = parseStatInText(finalDesc, "$DRA", "drask");
        // Tipos de Carta
        finalDesc = parseStatInText(finalDesc, "%CRI", "criatura");
        finalDesc = parseStatInText(finalDesc, "%CON", "conjuro");
        finalDesc = parseStatInText(finalDesc, "%MAL", "maldicion", "Maldición");
        finalDesc = parseStatInText(finalDesc, "%ACC", "accion", "Acción");
        finalDesc = parseStatInText(finalDesc, "%EQU", "equipamiento");
        finalDesc = parseStatInText(finalDesc, "%TOK", "token");
        finalDesc = parseStatInText(finalDesc, "%LOC", "locacion", "Locación");
        // Razas y Clases
        finalDesc = parseStatInText(finalDesc, "&HUM", "humano");
        finalDesc = parseStatInText(finalDesc, "&BES", "bestia");
        finalDesc = parseStatInText(finalDesc, "&REP", "reptiliano");
        finalDesc = parseStatInText(finalDesc, "&INS", "insectoide");
        
        finalDesc = parseStatInText(finalDesc, "&GUE", "guerrero_");
        finalDesc = parseStatInText(finalDesc, "&TAN", "tanque_");
        finalDesc = parseStatInText(finalDesc, "&BER", "berserker_");
        finalDesc = parseStatInText(finalDesc, "&ASE", "asesino_");
        finalDesc = parseStatInText(finalDesc, "&MAG", "mago_");
        finalDesc = parseStatInText(finalDesc, "&SUP", "support_");
        // Elementos
        finalDesc = parseStatInText(finalDesc, "#TIE", "tierra");
        finalDesc = parseStatInText(finalDesc, "#AGU", "agua");
        finalDesc = parseStatInText(finalDesc, "#FUE", "fuego");
        finalDesc = parseStatInText(finalDesc, "#AIR", "aire");
        finalDesc = parseStatInText(finalDesc, "#TRU", "trueno");
        finalDesc = parseStatInText(finalDesc, "#HIE", "hielo");
        // Atributos conjuros
        finalDesc = parseStatInText(finalDesc, "/RAP", "rapido", "Rápido");
        finalDesc = parseStatInText(finalDesc, "/OFE", "ofensivo");
        finalDesc = parseStatInText(finalDesc, "/RES", "restrictivo");
        finalDesc = parseStatInText(finalDesc, "/UNI", "unico", "Único");
        setHTMLDescription(finalDesc);
    }, [description]);

    const [image, setImage] = React.useState(null);

    function updateElements() {
        let els = [element1, element2, element3, element4].filter((e) => e != "ninguno");
        setElements(els);
        setRepeatedElement(checkForRepeatedAtts(els));
    }

    function updateSpellAtts() {
        let atts = [spellAtt1, spellAtt2, spellAtt3].filter((e) => e != "ninguno");
        setSpellAtts(atts);
        setRepeatedSpellAtts(checkForRepeatedAtts(atts));
    }

    function checkForRepeatedAtts(a) {
        for (let i=0; i<a.length; i++){
            if (a.indexOf(a[i]) !== a.lastIndexOf(a[i])) { return true; }
        }
        return false;
    }

    function areThereErrors() {
        if (checkForRepeatedAtts(elements)) {
            prevSetErrorText("Elementos repetidos");
            return true;
        }
        if (checkForRepeatedAtts(spellAtts)) {
            prevSetErrorText("Atributos de conjuro repetidos");
            return true;
        }
        if (title === "" || title === "Nueva Carta") {
            prevSetErrorText("Falta titular carta");
            return true;
        }
        if (image === null) {
            prevSetErrorText("Falta la imagen");
            return true;
        }
        if (description === "") {
            prevSetErrorText("Falta la descripción");
            return true;
        }
        prevSetErrorText("");
        return false;
    }

    function prevSetErrorText(newText) {
        if (errorText != newText) { setErrorText(newText) }
    }

    function parseStatInText(text, lookFor, name, shownName = name) {
        let srcPath = "";
        let nameFirst = false;
        let hasIcon = true;
        if (shownName === name) { shownName = shownName.charAt(0).toUpperCase() + shownName.slice(1); }
        switch(lookFor[0]) {
            case "!": //Stats
                srcPath = "img/stats/";
                nameFirst = true;
                break;
            case "$": //Facciones
                srcPath = "img/facciones/icono-";
                break;
            case "#": //Elementos
                srcPath = "img/elementos/";
                break;
            case "&": //Clases y Razas
                let isClass = (name.slice(-1) === "_");
                if (isClass) {
                        name = name.slice(0, -1);
                        shownName = shownName.slice(0, -1);
                }
                srcPath = "svg/" + (isClass ? "clases" : "razas") + "/";
                break;
            case "%": case "/": //Tipos de Cartas -- Atributos de Conjuros
                hasIcon = false;
                break;
        }

        let spanName = "<span class='description-stat " + name + "'>" + shownName  + "</span>";
        let img = (hasIcon) ? "<img class='description-icon " + name + "' src='src/assets/" + srcPath + name + ".png' />" : "";
        let space = "<span class='description-icon-space'></span>";
        let spanPlusImg = (nameFirst ? (spanName + space + img) : (img + space + spanName));

        return text.replaceAll(
            lookFor, "<span class='description-parse-wrapper'>" + spanPlusImg + "</span>"
        );
    }

    function takeCardScreenshot() {
        let card = document.getElementById("card-preview-container");
        card.style.borderRadius = "0px";

        domtoimage.toPng(card, {
            height: card.offsetHeight * scale,
            width: card.offsetWidth * scale,
            style: {
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                width: `${card.offsetWidth}px`,
                height: `${card.offsetHeight}px`
            }
        })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = (title.length > 0 ? title : "Carta Sin Nombre") + '.png';
            link.href = dataUrl;
            link.click();
        });

        delay(1000).then(() => card.style.borderRadius = null);
    }

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    function resetInputs() {
        if (confirm("¿Borrar todos los datos y empezar nueva carta?")) {
            setTitle("Nueva Carta");
            setType("criatura");
            setFaction("ninguna");
            setRace("ninguna");
            setClass("ninguna");

            setHealth(10);
            setMana(1);
            setAttack(3);
            setAccuracy(1);
            setSpeed(1);
            setDefense(1);

            setDescription("");

            setImage(null);

            resetElements();
            resetSpellAtts();
        }
    }

    function resetSpellAtts() {
        setSpellAtt1("ninguno");
        setSpellAtt2("ninguno");
        setSpellAtt3("ninguno");
    }

    function resetElements() {
        setElement1("ninguno");
        setElement2("ninguno");
        setElement3("ninguno");
        setElement4("ninguno");
    }

    useEffect(() => { 
        updateElements()
    }, [element1, element2, element3, element4]);


    return (
        <div className="card-builder-container">
            <div className="card-builder-data">
                <label>
                    Título: 
                    <input
                        value={title}
                        name="cardTitle"
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                    />
                </label>

                <label className="label-half">
                    Tipo de Carta: 
                    <select
                        name="cardType"
                        id="select-card-type"
                        onChange={(event) => {
                            setType(event.target.value);
                        }}
                    >
                        <option value="criatura">Criatura</option>
                        <option value="conjuro">Conjuro</option>
                        <option value="maldicion">Maldición</option>
                        <option value="accion">Acción</option>
                        <option value="equipamiento">Equipamiento</option>
                        <option value="token">Token</option>
                        <option value="locacion">Locación</option>
                    </select>
                </label>

                <label className="label-half">
                    <img className="card-builder-icon" src={'src/assets/img/facciones/icono-' + faction + '.png'} />
                    Facción: 
                    <select
                        name="cardFaction"
                        onChange={(event) => {
                            setFaction(event.target.value);
                        }}
                    >
                        <option value="ninguna">Ninguna</option>
                        <option value="thavensol">Thavensol</option>
                        <option value="hivebreed">Hivebreed</option>
                        <option value="korai-kan">Korai-kan</option>
                        <option value="drask">Drask</option>
                    </select>
                </label>

                <hr />

                <label>
                    Imagen (543x756px)
                    <input
                        type="file"
                        name="cardImage"
                        accept="image/*"
                        // Event handler to capture file selection and update the state
                        onChange={(event) => {
                        console.log(event.target.files[0]); // Log the selected file
                        setImage(URL.createObjectURL(event.target.files[0])); // Update the state with the selected file
                        }}
                    />  
                </label>
                
                
                <hr />

                <label>
                    Descripción
                    <textarea
                        name="cardDescription"
                        id="card-builder-description"
                        value={description}
                        onChange={(event) => {
                            setDescription(event.target.value);
                        }}
                    ></textarea>
                    <p className="tooltip">
                        Códigos para formato automático:<br />
                        <span className="word-spacing-big">Stats: !VIDA !MANA !ATK !DEF !PUN !VEL</span><br />
                        <span className="word-spacing-big">Cartas: %CRI %CON %MAL etc...</span><br />
                        <span className="word-spacing-big">Facciones: $HIV $DRA $KOR etc...</span><br />
                        <span className="word-spacing-big">Razas/Clases: &HUM &BES &GUE &TAN etc...</span><br />
                        <span className="word-spacing-big">Elementos: #TIE #FUE #AGU etc...</span><br />
                        <span className="word-spacing-big">Att.Conjuros: /RAP /OFE /DES etc...</span>
                    </p>
                </label>
                
            </div>
            <div>
                <CardPreview
                    title={title}
                    type={type}
                    health={health}
                    mana={mana}
                    attack={attack}
                    accuracy={accuracy}
                    speed={speed}
                    defense={defense}
                    faction={faction}
                    elements={elements}
                    spellAtts={spellAtts}
                    description={htmlDescription}
                    image={image}
                    race={race}
                    cclass={cclass}
                />

                <div className="btn-main-container">
                    <div className="btn-guardar-container">
                        <button
                            className={"btn-guardar" + (areThereErrors() ? " error" : " ")}
                            onClick={() => takeCardScreenshot()}
                        >Guardar Imagen</button>

                        <button
                            className={"btn-guardar" + (areThereErrors() ? " error" : " ")}
                            onClick={() => window.print()}
                        >Imprimir</button>

                        <p className="error-p">{errorText}</p>
                    </div>
                    
                    <button
                        className="btn-borrar"
                        onClick={() => resetInputs()}
                    >Borrar Todo</button>
                </div>
                
            </div>
            <div className="card-builder-data">
                {type === "criatura" &&
                <label className="label-half">
                    <img className="card-builder-icon" src={'src/assets/img/stats/vida.png'} />
                    Vida
                    <input
                        value={health}
                        name="cardHealth"
                        type="number"
                        max="999"
                        onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                        onChange={(event) => {
                            setHealth(event.target.value);
                        }}
                    />
                </label>}
                {(type === "criatura" || type === "conjuro" || type === "maldicion") &&
                <label className="label-half">
                    <img className="card-builder-icon" src={'src/assets/img/stats/mana.png'} />
                    Maná
                    <input
                        value={mana}
                        name="cardMana"
                        type="number"
                        max="99"
                        onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                        onChange={(event) => {
                            setMana(event.target.value);
                        }}
                    />
                </label>}
                {type === "criatura" &&
                <div>
                    <label className="label-half">
                        <img className="card-builder-icon" src={'src/assets/img/stats/ataque.png'} />
                        Ataque
                        <input
                            value={attack}
                            name="cardAttack"
                            type="number"
                            max="99"
                            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                            onChange={(event) => {
                                setAttack(event.target.value);
                            }}
                        />
                    </label>
                    <label className="label-half">
                        <img className="card-builder-icon" src={'src/assets/img/stats/defensa.png'} />
                        Defensa
                        <input
                            value={defense}
                            name="cardDefense"
                            type="number"
                            max="99"
                            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                            onChange={(event) => {
                                setDefense(event.target.value);
                            }}
                        />
                    </label>
                    <label className="label-half">
                        <img className="card-builder-icon" src={'src/assets/img/stats/punteria.png'} />
                        Puntería
                        <input
                            value={accuracy}
                            name="cardAccuracy"
                            type="number"
                            max="99"
                            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                            onChange={(event) => {
                                setAccuracy(event.target.value);
                            }}
                        />
                    </label>
                    <label className="label-half">
                        <img className="card-builder-icon" src={'src/assets/img/stats/velocidad.png'} />
                        Velocidad
                        <input
                            value={speed}
                            name="cardSpeed"
                            type="number"
                            max="99"
                            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                            onChange={(event) => {
                                setSpeed(event.target.value);
                            }}
                        />
                    </label>
                </div>}

                <hr />

                <label className="label-half">
                    {race != "ninguna" &&
                        <img className="card-builder-icon type-icon" src={'src/assets/svg/razas/' + race + '.svg'} />
                    }
                    Raza: 
                    <select
                        name="cardRace"
                        value={race}
                        onChange={(event) => {
                            setRace(event.target.value);
                        }}
                    >
                        <option value="ninguna">Ninguna</option>
                        <option value="humano">Humano</option>
                        <option value="bestia">Bestia</option>
                        <option value="reptiliano">Reptiliano</option>
                        <option value="insectoide">Insectoide</option>
                    </select>
                </label>

                <label className="label-half">
                    {cclass != "ninguna" &&
                        <img className="card-builder-icon type-icon" src={'src/assets/svg/clases/' + cclass + '.svg'} />
                    }
                    Clase: 
                    <select
                        name="cardClass"
                        value={cclass}
                        onChange={(event) => {
                            setClass(event.target.value);
                        }}
                    >
                        <option value="ninguna">Ninguna</option>
                        <option value="guerrero">Guerrero</option>
                        <option value="tanque">Tanque</option>
                        <option value="berserker">Berserker</option>
                        <option value="asesino">Asesino</option>
                        <option value="mago">Mago</option>
                        <option value="support">Support</option>
                    </select>
                </label>

                {(type === "conjuro" || type === "maldicion" || type === "accion") &&
                    <div>
                        <hr />

                        <label className="label-elemento">
                            A1:
                            <select
                                name="cardSpellAtt1"
                                value={spellAtt1}
                                onChange={(event) => {
                                    setSpellAtt1(event.target.value);
                                }}
                            >
                                <option value="ninguno">Ninguno</option>
                                <option value="rapido">Rápido</option>
                                <option value="ofensivo">Ofensivo</option>
                                <option value="restrictivo">Restrictivo</option>
                                <option value="unico">Único</option>
                            </select>
                        </label>

                        <label className="label-elemento">
                            A2:
                            <select
                                name="cardSpellAtt2"
                                value={spellAtt2}
                                onChange={(event) => {
                                    setSpellAtt2(event.target.value);
                                }}
                            >
                                <option value="ninguno">Ninguno</option>
                                <option value="rapido">Rápido</option>
                                <option value="ofensivo">Ofensivo</option>
                                <option value="restrictivo">Restrictivo</option>
                                <option value="unico">Único</option>
                            </select>
                        </label>

                        <label className="label-elemento">
                            A3:
                            <select
                                name="cardSpellAtt3"
                                value={spellAtt3}
                                onChange={(event) => {
                                    setSpellAtt3(event.target.value);
                                }}
                            >
                                <option value="ninguno">Ninguno</option>
                                <option value="rapido">Rápido</option>
                                <option value="ofensivo">Ofensivo</option>
                                <option value="restrictivo">Restrictivo</option>
                                <option value="unico">Único</option>
                            </select>
                        </label>

                        <button
                            className="elementos-btn-reiniciar"
                            onClick={() => {
                                resetSpellAtts();
                            }}
                        >
                            Borrar Atributos
                        </button>

                        {repeatedSpellAtts &&
                            <p className="elementos-repetidos">ATRIBUTOS REPETIDOS</p>
                        }
                    </div>
                }

                <hr />

                <label className="label-elemento">
                    {element1 != "ninguno" ?
                        <img className="card-builder-icon element-icon" src={'src/assets/img/elementos/' + element1 + '.png'} />
                        :
                        <div className="card-builder-no-icon-space">-</div>
                    }
                    E1: 
                    <select
                        name="cardElement1"
                        value={element1}
                        onChange={(event) => {
                            setElement1(event.target.value);
                        }}
                    >
                        <option value="ninguno">Ninguno</option>
                        <option value="tierra">Tierra</option>
                        <option value="agua">Agua</option>
                        <option value="fuego">Fuego</option>
                        <option value="aire">Aire</option>
                        <option value="trueno">Trueno</option>
                        <option value="hielo">Hielo</option>
                    </select>
                </label>

                <label className="label-elemento">
                    {element2 != "ninguno" ?
                        <img className="card-builder-icon element-icon" src={'src/assets/img/elementos/' + element2 + '.png'} />
                        :
                        <div className="card-builder-no-icon-space">-</div>
                    }
                    E2: 
                    <select
                        name="cardElement2"
                        value={element2}
                        onChange={(event) => {
                            setElement2(event.target.value);
                        }}
                    >
                        <option value="ninguno">Ninguno</option>
                        <option value="tierra">Tierra</option>
                        <option value="agua">Agua</option>
                        <option value="fuego">Fuego</option>
                        <option value="aire">Aire</option>
                        <option value="trueno">Trueno</option>
                        <option value="hielo">Hielo</option>
                    </select>
                </label>

                <label className="label-elemento">
                    {element3 != "ninguno" ?
                        <img className="card-builder-icon element-icon" src={'src/assets/img/elementos/' + element3 + '.png'} />
                        :
                        <div className="card-builder-no-icon-space">-</div>
                    }
                    E3: 
                    <select
                        name="cardElement3"
                        value={element3}
                        onChange={(event) => {
                            setElement3(event.target.value);
                        }}
                    >
                        <option value="ninguno">Ninguno</option>
                        <option value="tierra">Tierra</option>
                        <option value="agua">Agua</option>
                        <option value="fuego">Fuego</option>
                        <option value="aire">Aire</option>
                        <option value="trueno">Trueno</option>
                        <option value="hielo">Hielo</option>
                    </select>
                </label>

                <label className="label-elemento">
                    {element4 != "ninguno" ?
                        <img className="card-builder-icon element-icon" src={'src/assets/img/elementos/' + element4 + '.png'} />
                        :
                        <div className="card-builder-no-icon-space">-</div>
                    }
                    E4: 
                    <select
                        name="cardElement4"
                        value={element4}
                        onChange={(event) => {
                            setElement4(event.target.value);
                        }}
                    >
                        <option value="ninguno">Ninguno</option>
                        <option value="tierra">Tierra</option>
                        <option value="agua">Agua</option>
                        <option value="fuego">Fuego</option>
                        <option value="aire">Aire</option>
                        <option value="trueno">Trueno</option>
                        <option value="hielo">Hielo</option>
                    </select>
                </label>

                <button
                    className="elementos-btn-reiniciar"
                    onClick={() => {
                        resetElements();
                    }}
                >
                    Borrar Elementos
                </button>

                {repeatedElement &&
                    <p className="elementos-repetidos">ELEMENTOS REPETIDOS</p>
                }
            </div>
        </div>
    )
}

export default CardBuilder