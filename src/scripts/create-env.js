const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config()

// Pull the API keys given to netlify out into Angular's environment file
fs.writeFileSync('./src/environments/environment.prod.ts',`\
export const environment = {
    production: true,
    OMDB_API_KEY: ${OMDB_API_KEY}
};
`)

console.log(`prod env file generated sucessfully`)