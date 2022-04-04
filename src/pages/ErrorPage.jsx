import React from 'react'


function ErrorPage() {

    const centerh2 = {
        textAlign : 'center',
        marginTop : '35px'}

    const image = {
        display :'block',
        margin : '60px auto',
    }

    return (
        <div className="quiz-bg">
            <div className="container">
                <h2 style = {centerh2} >Oup ! cette page n'existe pas</h2>
            
            </div>   
        </div>
    )
}

export default ErrorPage;
