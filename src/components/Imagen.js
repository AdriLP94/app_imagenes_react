import React from 'react';

const Imagen = ({imagen}) => {

    const {largeImageURL, previewURL, likes, tags, views} = imagen;

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
                <img src={previewURL} alt={tags} className="card-img-top"/>
                <div className="card-body">
                    <p className="card-text"><i className="fas fa-thumbs-up"/> {likes}</p>
                    <p className="card-text"><i className="fas fa-eye"/> {views}</p>
                    <p className="card-text"><i className="fas fa-tags"/> {tags}</p>
                </div>
                <div className="card-footer">
                    <a href={largeImageURL} target="_blank" className="btn btn-primary btn-block" rel="noopener noreferrer">Ver imagen</a>
                </div>
            </div>
        </div>
    );
};

export default Imagen;