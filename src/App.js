import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListaImagenes from './components/ListaImagenes';


function App() {

  const [busqueda, guardarBusqueda] = useState("");
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarApi = async () => {
      const imagenesPorPagina = 36;
      const key = "13889457-8171a358ae0c8cfeac382b7cd";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      const calcularTotalPaginas = Math.ceil(resultado.totalHits/imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);
      guardarImagenes(resultado.hits);
    }

    if (busqueda !== "") {
      consultarApi();
    }

    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.scrollIntoView({behavior:'smooth'});
    
  }, [busqueda, paginaActual])

  const paginaAnterior = () => {
    let nuevaPaginaActual = paginaActual-1;
    guardarPaginaActual (nuevaPaginaActual);
  }

  const paginaSiguiente = () => {
    let nuevaPaginaActual = paginaActual+1;
    guardarPaginaActual (nuevaPaginaActual);
  }

  return (
    <div className="container-fluid">
      <div className="jumbotron jumbotron-fluid">
        <p className="lead text-center">Buscador de imágenes</p>
        <Formulario guardarBusqueda={guardarBusqueda}/>
      </div>
        <div className="container">
          <div className="row justify-content-center">
            <ListaImagenes imagenes={imagenes}/>
            { paginaActual === 1 ? null : <button type="button" className="btn btn-info mr-1" onClick={paginaAnterior}>Anterior &laquo;</button> }
            { paginaActual === totalPaginas ? null : <button type="button" className="btn btn-info" onClick={paginaSiguiente}>Siguiente &raquo;</button> }
          </div>
      </div>
    </div>
  );
}

export default App;
