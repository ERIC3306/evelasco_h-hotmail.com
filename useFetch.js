import { useEffect, useState } from 'react';
const localCache = {};

export const useFetch = ( url ) => {
  

  const [state, setState] = useState({
    data: null ,
    isLoading: true,
    hasError: false,
    error: null,
  });


  useEffect(() => {
    getFetch();
  }, [url]);        //Se dispara el hook cuando la url cambia


  const setLoadingState = () => {       //Estado de carga de la pantalla, propiedades iniciales
    setState({
      data: null,
      isLoading: true,          //si isLoading es TRUE ejecuta el archivo LoadingMessage desde MultipleCustom
      hasError: false,
      error: null,
    });
  }


  const getFetch = async() => {
    if ( localCache[url] ) {        //Verificamos que la variable localCache tenga un valor
      console.log('Usando caché');
      setState({
        data: localCache[url],
        isLoading: false,
        hasError: false,
        error: null,
      });
      return;
    }


    setLoadingState();


    const resp = await fetch(url);
    // sleep
    await new Promise( resolve => setTimeout(resolve, 1500) );      //Espera 1.5 seg para hacer la peticion
    if ( !resp.ok ) {       //Si sucede algun error al llamar al servidor se colocan las siguientes propiedades
      setState({
        data:null,
        isLoading: false,
        hasError: true,
        error: {
          code: resp.status,
          message: resp.statusText,
        }
      });
      return;
    }
  

    const data = await resp.json();     //data de la respuesta al servidor
    setState({
      data: data,
      isLoading: false,
      hasError: false,
      error: null,
    })

    // Manejo del caché, almacenamiento en cache. Evita la inyeccion de informacion que ya se tiene al ejecutarse por primera vez
    localCache[url] = data;
  }
  
  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  }

}