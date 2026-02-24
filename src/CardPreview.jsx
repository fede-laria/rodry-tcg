function CardPreview(props) {
    function getRaceHex(rr) {
        switch(rr) {
            case "insectoide": return "#b4a2a2";
            case "reptiliano": return "#54b633";
            case "humano": return "#b9b190";
            case "bestia": return "#a9390a";
            default: return "#c7c7c7";
        }
    }

    function getClassHex(cc) {
        switch(cc) {
            case "berserker": return "#a71b2a";
            case "asesino": return "#900072";
            case "tanque": return "#b2625e";
            case "support": return "#4a8857";
            case "mago": return "#5b7acc";
            case "guerrero": return "#b4aab3";
            default: return "#c7c7c7";
        }
    }

    function getSpellAttHex(a) {
        switch(a) {
            case "rapido": return "#ffc477";
            case "ofensivo": return "#db5f40";
            case "restrictivo": return "#9b6bf5";
            case "unico": return "#fdff81";
            default: return "#c7c7c7";
        }
    }

    function getTextBgSrc() {
        let src = "";
        switch(props.type) {
            case "criatura":
                src = "criatura";
                break;
            case "conjuro": case "maldicion":
                src = "conjuro";
                break;
            default:
                src = "equipamiento";
                break;
        }
        src = "url(src/assets/img/info-fondo/info-fondo-" + src + ".png)";
        return src;
    }

    return (
        <div className="card-preview-container" id="card-preview-container">
            <h3 className="card-text card-title">{props.title}</h3>

            <img
                className="card-preview-full-image"
                src={props.image ? props.image : "src/assets/img/base/placeholder.jpg"}
            ></img>

            {props.type === "criatura" && <div className="card-text stat stat-health">{props.health}</div>}
            {props.type === "criatura" && <div className="card-text stat stat-mana">{props.mana}</div> }
            {props.type === "criatura" && <div className="card-text stat stat-attack">{props.attack}</div>}
            {props.type === "criatura" && <div className="card-text stat stat-accuracy">{props.accuracy}</div>}
            {props.type === "criatura" && <div className="card-text stat stat-speed">{props.speed}</div>}
            {props.type === "criatura" && <div className="card-text stat stat-defense">{props.defense}</div>}
            {(props.type === "conjuro" || props.type === "maldicion") && 
                <div className="card-text stat stat-mana stat-mana-main">{props.mana}</div>
            }

            <div
                className="card-text card-description-container"
                style={{
                    width: props.type === "criatura" ? "60%" : "90%"
                }}
            >
                <div className="card-description" dangerouslySetInnerHTML={{__html:props.description}}></div>
            </div>

            <div
                className="card-preview-full-image card-preview-info-fondo"
                style={{
                    backgroundImage: getTextBgSrc()
                }}
            ></div>
            <div className={"card-preview-full-image card-preview-info-fondo card-preview-info-fondo-" + props.type}></div>
            <div
                className="card-preview-full-image card-preview-marco"
                style={{
                    backgroundImage: "url(src/assets/img/marco/marco-" + props.type + ".png)"
                }}
            ></div>
            {/* <div className="card-preview-full-image card-preview-marco-linea"
                style={{
                    backgroundImage: 'url(src/assets/img/marco/linea/marco-linea-' 
                                     + props.faction + '-' + props.elements.length + 'e.png)'
                }}
            ></div> */}
            <div className="card-preview-full-image"
                style={{
                    clipPath: "inset(0 13% 0 0)",
                    backgroundImage: 'url(src/assets/img/marco/linea/marco-linea-hivebreed.png)'
                    // backgroundImage: 'url(src/assets/img/marco/linea/marco-linea-' + props.faction + '.png)'
                }}
            ></div>
            <div className="card-preview-full-image"
                style={{
                    clipPath: "inset(" + (9 + 5.5 * props.elements.length).toString() + "% 0 0 77%)",
                    backgroundImage: 'url(src/assets/img/marco/linea/marco-linea-' + props.faction + '.png)'
                }}
            ></div>
            <div
                className={
                    "card-preview-full-image" + (props.type === "maldicion" ? " card-preview-trama-invertido" : "")
                }
                style={{
                    backgroundImage: 'url(src/assets/img/marco/tramas/' 
                    + props.faction + (props.type === "maldicion" ? "-negativo" : "") + '.png)'
                }}
            ></div>

            <div className="card-preview-full-image card-preview-faccion"
                style={{
                    backgroundImage: 'url(src/assets/img/facciones/' + props.faction + '.png)'
                }}
            ></div>

            <div className="card-preview-types-container">
                {props.race != "ninguna" &&
                    <div className="card-preview-type card-preview-race">
                        <img className="card-preview-type-icon" src={'src/assets/svg/razas/' + props.race + '.png'} />
                        {props.type === "criatura" &&
                        <p
                            className="card-type-name"
                            style={{
                                color: getRaceHex(props.race)
                            }}
                        >{props.race}</p>}
                    </div>
                }

                {props.cclass != "ninguna" &&
                    <div className="card-preview-type card-preview-class">
                        <img className="card-preview-type-icon" src={'src/assets/svg/clases/' + props.cclass + '.png'} />
                        {props.type === "criatura" &&
                        <p
                            className="card-type-name"
                            style={{
                                color: getClassHex(props.cclass)
                            }}
                        >{props.cclass}</p>}
                    </div>
                }

                {(props.type === "conjuro" || props.type === "maldicion" || props.type === "accion") &&
                    <div className="card-preview-atts-container">
                        {(props.spellAtts.length > 0 && (props.cclass != "ninguna" || props.race != "ninguna")) &&
                            <span className="card-preview-types-separator">/</span>
                        }
                        {props.spellAtts.map((att) => (
                            <div className="card-preview-type card-preview-class">
                                <p
                                    className="card-type-name"
                                    style={{
                                        color: getSpellAttHex(att)
                                    }}
                                >{att}</p>
                            </div>
                        ))}
                    </div>
                }
            </div>

            <div className="card-preview-elements-container">
                {props.elements.map(function(el, i) {
                    return <img className="card-preview-element" src={'src/assets/img/elementos/' + el + '.png'} />
                })}
            </div>

            <div
                className="card-preview-type-container"
                style={{
                    backgroundColor: getRaceHex(props.race)
                }}
            >
                <div>
                    <span className="card-preview-type-span">{props.type}</span>
                </div>
            </div>

            {/* <div className="card-preview-full-image card-preview-texture"></div> */}
        </div>
    )
}

export default CardPreview