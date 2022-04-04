import React from 'react'
import { Fragment } from 'react'
import Title from '../components/Title'


const MentionsLegales = () => {
  return (
    <Fragment>
    <Title>Mentions légales & politique de confidentialité</Title>
        <section className="container-fluid px-0  ">   
            <div className="bg-light my-4 w-75">
                <h2>Identification</h2>
                <p className="px-5 pb-4">
                    <h3>GROUPE HYPNOS</h3>
                    <p>Groupe fictif pour l'ECF Graduate Full Stack</p>
                    <p>N° Siret  : 00 00 000 000</p>
                    12 rue de la sainte Barbe
                    <br />
                    <br />75001 PARIS
                </p> 
                <p className="px-5 pb-4">
                <h3>Hebergeur</h3>
                    Site actuellemment en test <br />
                    Non referencé par les moteurs de recherche
                </p>
                <p className="px-5 pb-4">
                <h3>Webmaster</h3>
                    Jean-Pierre LEDOS <br /> 
                    28230 EPERNON
                </p>
                <h2>Protection des données</h2>
                <p className="px-5 pb-4">
                <h3>Les droits des clients et utilisateurs</h3>
                Le RGPD octroie de nombreux droits aux personnes dont les données sont collectées et traitées. Il appartient à l’organisme collecteur de les informer sur ces droits. Ainsi, les mentions légales doivent impérativement informer les clients sur leurs droits :

d’accès aux données
de rectification : chaque client peut corriger ou compléter ses données
d’opposition : chaque client peut refuser le traitement de ses données (et ce à tout moment)
à l’effacement des données
à la portabilité des données : chaque client peut récupérer les données qu’il a fournies à l’organisme collecteur
de limitation du traitement : chaque client peut demander sous certaines conditions le gel de l’utilisation de ses données
</p>
            </div>
        </section>
    </Fragment>
  )
}

export default MentionsLegales