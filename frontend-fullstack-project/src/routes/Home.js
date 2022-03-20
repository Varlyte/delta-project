import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import Articles from '../components/Articles';
import NewArticle from '../components/NewArticle';

import Categories from '../components/Categories';

import '../App.css';
import '../components/articles.css';
import "../components/newArticle.css";

export default function Home() {

	// useState is used to save data
	const token = sessionStorage.getItem('token') || '';
	const [allArticles, setAllArticles] = useState([]);
	const [allCategories, setAllCategories] = useState([]);
  
	const [newArticle, setNewArticle] = useState({
	  id: 0,
	  title: "",
	  author: "",
	  date: "",
	  category: "jeux-videos",
	  categories: [],
	  content: ""
	});
  
	const [toDelete, setToDelete] = useState({deleting: false});
	const [posting, setPosting] = useState(false);
	const [inputInvalid, setInputInvalid] = useState(false);
  
	const [categorietoShow, setArticlesOfCategoriesToShow] = useState({show: false, categorieId: 0});
  
	
	// fetch articles and categories data from API
	useEffect(() => {
		fetch('http://localhost:9000/api/private/articles',
		{
			headers: {
			'Authorization': `Bearer ${token}`,
			'Accept': '*/*'
			}
		}
		)
		.then(res => res.json())
		.then(data => {
		  setAllArticles(data);
		})
		.catch(e => console.log(e.toString()));
	
		fetch('http://localhost:9000/api/private/category',
		{
			headers: {
			'Authorization': `Bearer ${token}`,
			'Accept': '*/*'
			}
		})
		.then(res => res.json())
		.then(data => {
		  setAllCategories(data);
		})
		.catch(e => console.log("error"));
	  }, [posting, toDelete]);
  
	function validateUrl(url) {
	  const parsed = new URL(url);
	  return ["https:", "http:"].includes(parsed.protocol);
	}
  
  
	// initialize invalidInput state to false to handle error messages
	function initInvalidInput() {
	  setInputInvalid(false);
	}
  
	// validate inputs, handle errors messages and update newArticle state
	function handleChange(event) {
	  const {type, name, value} = event.target;
  
	  type === "number" ?
		value.match(/^[0-9]+$/) ?
		  setNewArticle(prevState => {
			initInvalidInput();  
			return {...prevState,
			  id: allArticles.length + 1,
			  [name]: Number(value)
			}
		  }) 
		  :
		  setInputInvalid("Cost must be a positive number")
		:
		value.match(/^.*[<>/\\].*$/) ?
		  setInputInvalid("Only letters, numbers and spaces") 
		  :
		  value.length > 255 ?
			setInputInvalid("Max characters is 255")
			:
			setNewArticle(prevState => {
			  initInvalidInput();
  
			  return {...prevState,
				id: allArticles.length + 1,
				[name]: value
			  }
			});
	}
  
  
	// triggers submit and send POST request
	function submitArticle() {
	  setPosting(true);
	}
  
	useEffect( () => {
		if (posting) {
		newArticle.categories.push({name: newArticle.category, categoryId: allCategories.find().categoryId})
		  fetch('http://localhost:9000/api/private/articles', 
			  {
				  method: 'POST',
				  headers: {
					  'Accept': 'application/json',
					  'Content-type': 'application/json',
					  'Authorization': `Bearer ${token}`
				  },
				  body: JSON.stringify(newArticle)
			  }
		  )
		  .then( (res) => res.json() )
		  .then( (data) => {
			console.log(data);
			setPosting(false);
		  })
		  .catch( (error) => {
			console.log(error.toString());
		  });
		}
	  }, [posting, newArticle, allCategories]);
  
  
	// triggers deletion and send DELETE request
	function deleteArticle(event, id) {
	  event.stopPropagation();
  
	  Swal.fire({
		title: 'Do you really want to delete this product?',
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!'
	  })
	  .then((result) => {
		if (result.isConfirmed) {
		  setToDelete({deleting: true, articleId: id});
  
		  Swal.fire(
			'Deleted!',
			'Your file has been deleted.',
			'success'
		  )
		};
	  });
	  
	}
  
	useEffect(() => {
	  if (toDelete.deleting) {
		fetch(`http://localhost:9000/api/private/articles/${toDelete.articleId}`, {
		  method: "DELETE", 
		  headers: {
			'Authorization': `Bearer ${token}`
			}
		})
		.then(() => {
		  setToDelete({deleting: false});
		})
		.catch(e => console.log(e.toString()));
	  }
	}, [toDelete.deleting])
	
	function showCategorie(event, categorieId) {
	  setArticlesOfCategoriesToShow({show: true, categorieId: categorieId});
	}
  
	useEffect(() => {
	  if (categorietoShow.show) {
		fetch(`http://localhost:9000/api/private/articles`)
		.then(res => res.json())
		.then(data => {
		  if (categorietoShow.categorieId !== 0) {
			setAllArticles(data.filter(article => article.categories.some(category => category.categoryId === categorietoShow.categorieId)))
		  }
		  else {
			setAllArticles(data);
		  }
		  setArticlesOfCategoriesToShow({show: false})
		})
		.catch(e => console.log(e.toString()));
	  }
	});
	console.log("charging /Home");
	return (
	  <div>  
		<Categories 
		  data={allCategories}
		  showCategorie={showCategorie}
		/>
		<Articles 
		  data={allArticles}
		  deleteArticle={deleteArticle}
		  validateUrl={validateUrl}
		/>
		<NewArticle
		  data={allCategories}
		  newArticle={newArticle}
		  handleChange={handleChange}
		  submitArticle={submitArticle}
		  inputInvalid={inputInvalid} 
		/>
	  </div>
	);
}