# HYPNOS

## HYPNOS  application React :  
### Gestion de reservation d'une chaine hoteliere
[Link to react app HYPNOS](https://hypnos-fr.herokuapp.com/)  
[Link to API documentation](https://hypnos-back.herokuapp.com/api/docs)  

### You need first to install locally API server
[Link to API documentation](https://hypnos-back.herokuapp.com/api/docs)   
[Link GITHUB to API-rest back-end application](https://github.com/jpLedos/hypnos-api)  

## Getting Started to deploy it locally
First , in you project folder :

```
git clone github.com/jpLedos/hypnos.git yourProject
cd cc-yourProject
npm install
```

Second step , run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## verify API server url : 
in config.js :

```
export const API_URL = 'https://localhost:8000/api/'
//export const API_URL = 'https://hypnos-back.herokuapp.com/api/'
  
  ```

## Cloudinary :
this app use Cloudinary. You need to create your cloudinary account and modufy config.js with your account variables : 

  ```
export const CLOUDINARY_URL = "cloudinary://"
export const CLOUDINARY_FOLDER = 'yourcloudinary'; 
export const CLOUDINARY_CLOUD_NAME="youcloudinaryname"
export const CLOUDINARY_API_KEY="xxxxxxxxxxxxx"
  ```


## Getting Started to deploy it in heroku

1. create a new app on heroku    
2. Connect your github repository  
3. heroku config:set NODE_OPTIONS='--max_old_space_size=460 (if you use free DYNO)
4. Deploy branch master  