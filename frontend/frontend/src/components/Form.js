import React, { useState, useEffect } from 'react'
import APIService from '../APIService'
import { useCookies } from 'react-cookie'

function Form(props) {

    const [title, setTitle] = useState(props.article.title)
    const [description, setDescription] = useState(props.article.description)
    const [token] = useCookies(['Token'])

    useEffect(() => {
        setTitle(props.article.title)
        setDescription(props.article.description)

    }, [props.article])

    const updateArticle = () => {
        APIService.UpdateArticle(props.article.id, { title, description }, token['Token'])
            .then(resp => props.updatedInfo(resp))
    }

    const insertArticle = () => {
        APIService.InsertArticle({ title, description }, token['Token'])
            .then(resp => props.insertedInfo(resp))
    }

    return (
        <div>

            {props.article ? (

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Please Enter the Title" value={title} onChange={e => setTitle(e.target.value)} />
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" rows="5" placeholder="Please Enter the Description" value={description} onChange={e => setDescription(e.target.value)} />
                    <br></br>

                    {props.article.id ? 
                    <button onClick={updateArticle} className="btn btn-success">Update</button> :
                    <button onClick={insertArticle} className="btn btn-success">Insert</button>}

                </div>

            ) : null}

        </div>
    )
}

export default Form
