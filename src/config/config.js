export const config = {
    development: {
        base_url: 'https://api.goonj.pk/v2',
        mainWebsiteUrl: "http://web.st.goonj.pk" 
    },
    production: {
        base_url: 'https://api.goonj.pk/v2',
        mainWebsiteUrl: "https://goonj.pk"
    }
};


let environment = 'development';
if (process.env.REACT_APP_ENV) {
  environment = process.env.REACT_APP_ENV ;
} else {
    environment = 'development';
}
export default config[environment];