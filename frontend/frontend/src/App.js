import './App.css';
import { useState, useEffect } from 'react';
import ArticleList from './components/ArticleList';
import Form from './components/Form';
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'

function App() {

  const [articles, setArticles] = useState([])
  const [editArticle, setEditArticle] = useState(null)
  const [token,, removeToken] = useCookies(['Token'])
  let history = useHistory()

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/articles', {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['Token']}`
      }
    })
      .then(resp => resp.json())
      .then(resp => setArticles(resp))
      .catch(err => console.log(err))
  }, [token])

  const editbtn = (article) => {
    setEditArticle(article)
  }

  const updatedInfo = (articlenew) => {
    const new_article = articles.map(article => {
      if (article.id === articlenew.id) {
        return articlenew;
      }
      else {
        return article;
      }
    })

    setArticles(new_article);
  }

  const insertedInfo = (article) => {
    const new_articles = [...articles, article]
    setArticles(new_articles)
  }

  const articleForm = () => {
    setEditArticle({ title: '', description: '' })
  }

  const deletebtn = (article) => {
    const new_articles = articles.filter(a => {
      if (a.id === article.id) {
        return false
      }
      else {
        return true
      }
    })

    setArticles(new_articles)
  }

  const logoutbtn = () => {
    removeToken(['Token'])
  }

  useEffect(() => {
    if (!token['Token']) {
      history.push('/')
    }
  }, [token, history])

  return (
    <div className="App">

      <div className="row">
        <div className="col">

          <h2>Django and ReactJs Blog App</h2>
          <br /><br />
        </div>

        <div className="col">
          <button onClick={articleForm} className="btn btn-primary">Insert Article</button>
        </div>

        <div className="col">
          <button onClick={logoutbtn} className="btn btn-primary">LOGOUT</button>
        </div>

      </div>

      <ArticleList articles={articles} editbtn={editbtn} deletebtn={deletebtn} />

      {editArticle ? <Form article={editArticle} updatedInfo={updatedInfo} insertedInfo={insertedInfo} /> : null}

    </div>
  );
}

export default App;
