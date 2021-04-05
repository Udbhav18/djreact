import React from 'react'
import APIService from '../APIService'
import { useCookies } from 'react-cookie'

function ArticleList(props) {

    const [token] = useCookies(['Token'])

    const editbtn = (article) => {
        props.editbtn(article)
    }

    const deletebtn = (article) => {
        APIService.DeleteArticle(article.id, token['Token'])
        .then(() => props.deletebtn(article))
    }

    return (
        <div>
            {props.articles && props.articles.map(article => {
                return (
                    <div key={article.id}>
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>

                        <div className="row">
                            <div className="col-md-1">
                                <button className="btn btn-primary" onClick={() => editbtn(article)}>UPDATE</button>
                            </div>

                            <div className="col">
                                <button className="btn btn-danger" onClick={() => deletebtn(article)}>DELETE</button>
                            </div>
                        </div>
                        <hr className="hrclass" />
                    </div>
                )
            })}
        </div>
    )
}

export default ArticleList
