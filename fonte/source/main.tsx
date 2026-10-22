import React from 'react';import {createRoot} from 'react-dom/client';
import PublicSite from './public-site';import DemoAdmin from './demo-admin';import './globals.css';
const params=new URLSearchParams(location.search),es=params.get('lang')==='es',admin=params.get('pagina')==='admin';
createRoot(document.getElementById('root')!).render(<><div className="static-demo-banner"><span>{es?'Demostración estática · anuncios ilustrativos. Los formularios no envían datos.':'Demonstração estática · anúncios ilustrativos. Os formulários não enviam dados.'}</span><a href={admin?'?lang=pt':'?pagina=admin'}>{admin?'Voltar ao site':es?'Panel demostrativo':'Painel demonstrativo'}</a></div>{admin?<DemoAdmin/>:<PublicSite lang={es?'es':'pt'} propertyId={params.get('imovel')||undefined}/>}</>);
