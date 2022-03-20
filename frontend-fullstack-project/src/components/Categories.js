import Tabs from "./Tabs";

export default function Categories(props) {
  const categoriesElements = props.data.map(pos =>
    <div
      key={pos.categoryId}
      title={pos.name}
      onClick={event => props.showCategorie(event, pos.categoryId)}
    >
      <h3>{pos.name}</h3>
    </div>
  )
  categoriesElements.unshift(
    <div
      key="0"
      title="liste de tous les articles"
      onClick={event => props.showCategorie(event, 0)}
    >
      <h3>Voici le liste de tous les articles</h3>
    </div>
  )
  
  if (categoriesElements.length > 0) {
    return (
      <Tabs>
        {categoriesElements}
      </Tabs>
    )
  }
  else {
    return(
      <h3>Pas de catégories à afficher</h3>
    )
  }
}