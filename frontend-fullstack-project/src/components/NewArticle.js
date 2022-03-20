export default function NewArticle(props) {

    // the inputs are controled by the state in App.js
    return (
        <div className="newArticle-form">
            <h3 className="newArticle-title" >Ajouter un article</h3>
            
            <div className="newArticle-container">
                <label>Titre : {" "} </label>
                <input
                    className="newArticle-input" 
                    type="text"
                    placeholder="Titre de l'article." 
                    name="title"
                    value={props.newArticle.autor}
                    onChange={props.handleChange} 
                />
            </div>

            <div className="newArticle-container">
                <label>Auteur : {" "} </label>
                <input
                    className="newArticle-input" 
                    type="text"
                    placeholder="Auteur de l'arcticle." 
                    name="author"
                    value={props.newArticle.author}
                    onChange={props.handleChange} 
                />
            </div>

            <div className="newArticle-container">
                <label>Date : {" "}</label>
                <input
                    className="newArticle-input"
                    type="date" 
                    name="date"
                    value={props.newArticle.date}
                    onChange={props.handleChange}>
                </input>
            </div>

            <div className="newArticle-container">
                <label>Catégorie : {" "} </label>
                <input
                    type="text"
                    placeholder="categorie"                 
                    className="newArticle-input"
                    name="category"
                    value={props.newArticle.category}
                    onChange={props.handleChange}>
                </input>
            </div>

            <textarea
                className="newArticle-description"
                placeholder="Contenu de l'article." 
                name="content"
                value={props.newArticle.content}
                onChange={props.handleChange} 
            />

            {props.inputInvalid && <p>{props.inputInvalid}</p>}

            <button className="newArticle-submitButton" onClick={props.submitArticle}>Ajouter un article</button>
        </div>
        
    )
}

/*
                <select            
                    className="newArticle-input"
                    name="category"
                    value={props.newArticle.category}
                    onChange={props.handleChange}>
                    {props.data.map(i => {
                        return (
                            <option value={i.name} key={i.categoryId}>{i.name}</option>
                        )
                    })}
                </select>
*/