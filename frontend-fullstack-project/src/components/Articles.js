import './articles.css';


export default function Articles(props) {

	const getArticleCategory = (Articles) => {
		return Articles.cost === 500 ? "articles-item articles-item--500" : "articles-item";
	}
	const getDeleteButtonClassName = (Articles) => {
		return Articles.cost === 500 ? "articles-deleteButton articles-deleteButton--500" : "product-delete-button";
	}
   const data = Array.from(props.data);
	const Articles = data.map( (Articles) => {
		return (
			<div key={Articles.id} className={getArticleCategory(Articles)}>
				<h3 className='article-title'><center>{Articles.title}</center></h3>
				<h3 className='article-subtitle'>Categorie: {Articles.category}</h3>
                <h3 className='article-date'>date : <center>{Articles.date}</center></h3>
				<p className='article-description'>{Articles.content}</p>
                <p className='article-subtitle'>auteur : {Articles.author}</p>
				<button 
					className={getDeleteButtonClassName(Articles)}
					onClick={ (event) => props.handleDelete(event, Articles.id)}
				>Delete</button>
			</div>
		);
	});

	return (
		<div className="articles">
			<h2 className="articles-title">Available products</h2>
			<div className="articles-container">
				{Articles}
			</div>
		</div>
	);
}