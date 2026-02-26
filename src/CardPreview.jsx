import { default as imgPlaceholder } from './assets/img/base/placeholder.jpg';
import { cData, getBgUrl } from './c-data';

function CardPreview(props) {
    return (
        <div className="card-preview-container" id="card-preview-container">
            {/* Título */}
            <h3 className="card-text card-title">{props.title}</h3>
            {/* Imagen placeholder */}
            <img
                className="card-preview-full-image"
                src={props.image ? props.image : imgPlaceholder}
            ></img>
            {/* Stats */}
            {props.type === "criatura" && <div className="card-text stat stat-vida">{props.vida}</div>}
            {props.type === "criatura" && <div className="card-text stat stat-mana">{props.mana}</div> }
            {props.type === "criatura" && <div className="card-text stat stat-ataque">{props.ataque}</div>}
            {props.type === "criatura" && <div className="card-text stat stat-punteria">{props.punteria}</div>}
            {props.type === "criatura" && <div className="card-text stat stat-velocidad">{props.velocidad}</div>}
            {props.type === "criatura" && <div className="card-text stat stat-defensa">{props.defensa}</div>}
            {(props.type === "conjuro" || props.type === "maldicion") && 
                <div className="card-text stat stat-mana stat-mana-main">{props.mana}</div>
            }
            {/* Descripción */}
            <div
                className="card-text card-description-container"
                style={{
                    width: props.type === "criatura" ? "60%" : "90%"
                }}
            >
                <div className="card-description" dangerouslySetInnerHTML={{__html:props.description}}></div>
            </div>
            {/* Marco e infoFondo de tipo de carta */}
            <div
                className="card-preview-full-image"
                style={{
                    backgroundImage: getBgUrl(cData.tiposCarta[props.type].imgInfoFondo)
                }}
            ></div>
            <div
                className="card-preview-full-image"
                style={{
                    backgroundImage: getBgUrl(cData.tiposCarta[props.type].img)
                }}
            ></div>
            {/* Línea fina de marco */}
            <div className="card-preview-full-image"
                style={{
                    clipPath: "inset(0 13% 0 0)",
                    backgroundImage: getBgUrl(cData.facciones.hivebreed.imgLinea)
                    // backgroundImage: getBgUrl(cData.facciones[props.faction].imgLinea)
                }}
            ></div>
            <div className="card-preview-full-image"
                style={{
                    clipPath: "inset(" + (9 + 5.5 * props.elements.length).toString() + "% 0 0 77%)",
                    backgroundImage: getBgUrl(cData.facciones.hivebreed.imgLinea)
                    // backgroundImage: getBgUrl(cData.facciones[props.faction].imgLinea)
                }}
            ></div>
            {/* Trama */}
            <div
                className="card-preview-full-image"
                style={{
                    backgroundImage: getBgUrl(props.type === "maldicion" 
                        ? cData.facciones[props.faction].imgTramaN : cData.facciones[props.faction].imgTrama)
                }}
            ></div>
            {/* Facción */}
            <div className="card-preview-full-image card-preview-faccion"
                style={{
                    backgroundImage: getBgUrl(cData.facciones[props.faction].imgCarta)
                }}
            ></div>

            <div className="card-preview-types-container">
                {/* Raza */}
                {props.race != "ninguna" &&
                    <div className="card-preview-type card-preview-race">
                        <img className="card-preview-type-icon" src={cData.razas[props.race].img} />
                        {props.type === "criatura" &&
                        <p
                            className="card-type-name"
                            style={{
                                color: (props.race != "ninguna") ? cData.razas[props.race].color : "#FFFFFF"
                            }}
                        >{props.race}</p>}
                    </div>
                }
                {/* Clase */}
                {props.cclass != "ninguna" &&
                    <div className="card-preview-type card-preview-class">
                        <img className="card-preview-type-icon" src={cData.clases[props.cclass].img} />
                        {props.type === "criatura" &&
                        <p
                            className="card-type-name"
                            style={{
                                color: (props.cclass != "ninguna") ? cData.clases[props.cclass].color : "#FFFFFF"
                            }}
                        >{props.cclass}</p>}
                    </div>
                }
                {/* Atributos de conjuro */}
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
                                        color: cData.cAtributos[att].color
                                    }}
                                >{att}</p>
                            </div>
                        ))}
                    </div>
                }
            </div>
            {/* Elementos */}
            <div className="card-preview-elements-container">
                {props.elements.map(function(el, i) {
                    return <img className="card-preview-element" src={cData.elementos[el].img} />
                })}
            </div>

            <div
                className="card-preview-type-container"
                style={{
                    backgroundColor: (props.race != "ninguna") ? cData.razas[props.race].color : "#FFFFFF"
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