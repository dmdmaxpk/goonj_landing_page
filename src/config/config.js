export const config = {
    development: {
        base_url: 'https://api.goonj.pk/v2',
        mainWebsiteUrl: "http://staging.goonj.pk" 
    },
    production: {
        base_url: 'https://api.goonj.pk/v2',
        mainWebsiteUrl: "https://goonj.pk"
    }
};


let environment = 'production';
if (process.env.REACT_APP_ENV) {
  environment = process.env.REACT_APP_ENV ;
} else {
    environment = 'production';
}
export default config[environment];