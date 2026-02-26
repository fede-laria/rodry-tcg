import React from 'react';
import CardPreview from './CardPreview'
import {useEffect} from 'react'
import domtoimage from 'dom-to-image';
import {cData, getBgUrl} from './c-data';

function CardBuilder() {
    // Características principales
    const [title, setTitle] = React.useState("Nueva Carta");
    const [type, setType] = React.useState("criatura");
    const [faction, setFaction] = React.useState("ninguna");
    const [race, setRace] = React.useState("ninguna");
    const [cclass, setClass] = React.useState("ninguna");
    // Atributos de conjuro/maldicion/accion
    const maxSpellAtts = 3;
    const [spellAtts, setSpellAtts] = React.useState([Array(maxSpellAtts).fill("ninguno")]);
    const [repeatedSpellAtts, setRepeatedSpellAtts] = React.useState(false);
    useEffect(() => {
        setRepeatedSpellAtts(checkForRepeatedAtts(spellAtts));
    }, [spellAtts]);
    // Elementos
    const maxElements = 4;
    const [elements, setElements] = React.useState(Array(maxElements).fill("ninguno"));
    const [repeatedElement, setRepeatedElement] = React.useState(false);
    useEffect(() => {
        setRepeatedElement(checkForRepeatedAtts(elements));
    }, [elements]);
    // Stats
    const [vida, setVida] = React.useState(1);
    const [mana, setMana] = React.useState(1);
    const [ataque, setAtaque] = React.useState(1);
    const [punteria, setPunteria] = React.useState(1);
    const [velocidad, setVelocidad] = React.useState(1);
    const [defensa, setDefensa] = React.useState(1);
    // Descripción de la carta
    const [description, setDescription] = React.useState("");
    const [htmlDescription, setHTMLDescription] = React.useState("");
    const [formattingTips, setFormattingTips] = React.useState([]);
    // Errores al crear la carta
    const [errorText, setErrorText] = React.useState("");
    // Al cambiar el valor de la descripción, buscar códigos y reemplazarlos por el texto final
    useEffect(() => { 
        let sy = ["%", "!", "#", "/", "$", "&", "=", "¡", "*", "°", "?", "¿"];
        let arrData = Object.entries(cData);
        let raceOrClassIndex = -1;
        let finalDescription = description;
        let formTips = [];
        for (let i = 0; i<arrData.length; i++) {
            let ar = arrData[i];
            let isRaceOrClass = (ar[0] === "razas" || ar[0] === "clases");
            if (isRaceOrClass && raceOrClassIndex === -1) raceOrClassIndex = i;
            let itemsList = Object.entries(ar[1]);
            let syToUse = (isRaceOrClass && raceOrClassIndex > 0) ? sy[raceOrClassIndex] : sy[i];
            formTips.push(uppercaseFirstLetter(ar[0]) + ":");
            for (let z = 0; z<itemsList.length; z++) {
                let itemName = itemsList[z][0];
                let itemData = itemsList[z][1];
                let nameFirst = (ar[0] === "stats");
                let iconImage = Object.hasOwn(itemData, "img") ? itemData.img : "";
                let abbreviation = (Object.hasOwn(itemData, "keyword") ? itemData.keyword : itemName.substring(0,3)).toUpperCase();
                let keyword = syToUse + abbreviation;
                let nameToShow = Object.hasOwn(itemData, "shownName") ? itemData.shownName : itemName;
                finalDescription = parseStatInText(finalDescription, keyword, iconImage, nameFirst, itemName, nameToShow);
                if (z === 3) formTips[i] = formTips[i] + " etc..."
                else if (z < 3) formTips[i] = formTips[i] + " " + keyword;
            }
        }
        setHTMLDescription(finalDescription);
        setFormattingTips(formTips);
    }, [description]);
    // Imagen
    const [image, setImage] = React.useState(null);
    // Escalado
    const scale = window.devicePixelRatio;

    // Chequear que no se hayan seleccionado elementos o atributos de conjuro repetidos
    function checkForRepeatedAtts(a) {
        let realA = a.filter((e) => e != "ninguno");
        for (let i=0; i<realA.length; i++){
            if (realA.indexOf(realA[i]) !== realA.lastIndexOf(realA[i])) { return true; }
        }
        return false;
    }
    // Chequear errores
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
    // Reemplazar un código en la descipción por el texto final + icono
    function parseStatInText(text, lookFor, iconImage, nameFirst, name, shownName = name) {
        if (shownName === name) { shownName = uppercaseFirstLetter(shownName); }

        let spanName = "<span class='description-stat " + name + "'>" + shownName  + "</span>";
        let img = (iconImage != "") ? "<img class='description-icon " + name + "' src='" + iconImage + "' />" : "";
        let space = "<span class='description-icon-space'></span>";
        let spanPlusImg = (nameFirst ? (spanName + space + img) : (img + space + spanName));

        return text.replaceAll(
            lookFor, "<span class='description-parse-wrapper'>" + spanPlusImg + "</span>"
        );
    }
    // Mayúscula en primera letra
    function uppercaseFirstLetter(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
    // Sacar captura de carta
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
    // Delay
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    // Reiniciar todos los campos
    function resetInputs() {
        if (confirm("¿Borrar todos los datos y empezar nueva carta?")) {
            setTitle("Nueva Carta");
            setType("criatura");
            setFaction("ninguna");
            setRace("ninguna");
            setClass("ninguna");

            setVida(10);
            setMana(1);
            setAtaque(3);
            setPunteria(1);
            setVelocidad(1);
            setDefensa(1);

            setDescription("");

            setImage(null);

            resetElements();
            resetSpellAtts();
        }
    }
    // Reiniciar elementos
    function resetElements() {
        setElements(Array(maxElements).fill("ninguno"));
    }
    // Reiniciar atributos de conjuro
    function resetSpellAtts() {
        setSpellAtts(Array(maxSpellAtts).fill("ninguno"));
    }
    // Actualizar elementos
    function updateElements(newEl, index) {
        let newArray = [...elements];
        newArray[index] = newEl;
        setElements(newArray);
    }
    // Actualizar atributos de conjuro
    function updateSpellAtts(newAt, index) {
        let newArray = [...spellAtts];
        newArray[index] = newAt;
        setSpellAtts(newArray);
    }
    // Actualizar una de las stats
    function updateStat(stat, newVal) {
        switch(stat) {
            case "vida": setVida(newVal); break;
            case "mana": setMana(newVal); break;
            case "ataque": setAtaque(newVal); break;
            case "defensa": setDefensa(newVal); break;
            case "punteria": setPunteria(newVal); break;
            case "velocidad": setVelocidad(newVal); break;
        }
    }
    // Conseguir nombre a mostrar al usuario
    function getShownName(key, obj) {
        return (obj.shownName) ? obj.shownName : String(key).charAt(0).toUpperCase() + String(key).slice(1);
    }

    return (
        <div className="card-builder-container">
            <div className="card-builder-data">
                {/* Título */}
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

                {/* Tipo */}
                <label className="label-half">
                    Tipo de Carta: 
                    <select
                        name="cardType"
                        id="select-card-type"
                        onChange={(event) => {
                            setType(event.target.value);
                        }}
                    >
                        {Object.entries(cData.tiposCarta).map(([key, value]) => {
                            return <option value={key}>{getShownName(key, value)}</option>
                        })}
                    </select>
                </label>

                {/* Facción */}
                <label className="label-half">
                    <img className="card-builder-icon" src={cData.facciones[faction].img} />
                    Facción:
                    <select
                        name="cardFaction"
                        onChange={(event) => {
                            setFaction(event.target.value);
                        }}
                    > 
                        {Object.entries(cData.facciones).map(([key, value]) => {
                            return <option value={key}>{getShownName(key, value)}</option>
                        })}
                    </select>
                </label>

                <hr />

                {/* Imagen */}
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

                {/* Descripción */}
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
                        {formattingTips.map((t) => {
                            return <span className="word-spacing-big">{t}<br /></span>
                        })}
                    </p>
                </label>
                
            </div>

            {/* Preview de Carta */}
            <div>
                <CardPreview
                    title={title}
                    type={type}
                    vida={vida}
                    mana={mana}
                    ataque={ataque}
                    punteria={punteria}
                    velocidad={velocidad}
                    defensa={defensa}
                    faction={faction}
                    elements={elements.filter(e => e != "ninguno")}
                    spellAtts={spellAtts.filter(e => !e.includes("ninguno"))}
                    description={htmlDescription}
                    image={image}
                    race={race}
                    cclass={cclass}
                />

                {/* Botones para guardar */}
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

            {/* Stats */}
            <div className="card-builder-data">
                {Object.entries(cData.stats).map(([key, value]) => {
                    return <label
                        className="label-half"
                        style={{
                            display: (Object.hasOwn(value, "exclusiveTo") && value.exclusiveTo.includes(type)) ? "inline-block" : "none"
                        }}
                    >
                        <img className="card-builder-icon" src={value.img} />
                        {getShownName(key, value)}
                        <input
                            value={window[key]}
                            defaultValue={window[key]}
                            name={"card" + key}
                            type="number"
                            max="99"
                            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                            onChange={(event) => {
                                updateStat(key, event.target.value);
                            }}
                        />
                    </label>
                })}

                <hr />

                {/* Raza */}
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
                        {Object.entries(cData.razas).map(([key, value]) => {
                            return <option value={key}>{getShownName(key, value)}</option>
                        })}
                    </select>
                </label>

                {/* Clase */}
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
                        {Object.entries(cData.clases).map(([key, value]) => {
                            return <option value={key}>{getShownName(key, value)}</option>
                        })}
                    </select>
                </label>

                {/* Atributos de Conjuros */}
                {(type === "conjuro" || type === "maldicion" || type === "accion") &&
                    <div>
                        <hr />
                        {[...Array(maxSpellAtts)].map((e, i) => {
                            return <label className="label-elemento">
                                A{i + 1}:
                                <select
                                    name={"cardSpellAtt" + (i + 1).toString()}
                                    value={spellAtts[i]}
                                    onChange={(event) => {
                                        updateSpellAtts(event.target.value, i);
                                    }}
                                >
                                    <option value="ninguno">Ninguno</option>
                                    {Object.entries(cData.cAtributos).map(([key, value]) => {
                                        return <option value={key}>{getShownName(key, value)}</option>
                                    })}
                                </select>
                            </label>
                        })}
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
                
                {/* Elementos */}
                {[...Array(maxElements)].map((e, i) => {
                    return <label className="label-elemento">
                        {elements.length === 0 || elements[i] === "ninguno" ?
                            <div className="card-builder-no-icon-space">-</div>
                            :
                            <img className="card-builder-icon element-icon" src={cData.elementos[elements[i]].img} />
                        }
                        E{i + 1}:
                        <select
                            name={"cardElement" + (i + 1).toString()}
                            value={elements[i]}
                            onChange={(event) => {
                                updateElements(event.target.value, i);
                            }}
                        >
                            <option value="ninguno">Ninguno</option>
                            {Object.entries(cData.elementos).map(([key, value]) => {
                                return <option value={key}>{getShownName(key, value)}</option>
                            })}
                        </select>
                    </label>
                })}

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