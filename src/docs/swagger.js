import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'API - Proyecto Adopciones',
      version: '1.0.0',
      description: 'Documentacion Users',
    },
    servers: [
      { url: 'http://localhost:4000', description: 'Local' }
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'coderCookie'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string', enum: ['user','admin'] },
            pets: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: { type: 'string' }
                }
              }
            }
          }
        },
        CreateUserInput: {
          type: 'object',
          required: ['first_name','last_name','email','password'],
          properties: {
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', format: 'password' },
            role: { type: 'string', enum: ['user','admin'] }
          }
        },
        UpdateUserInput: {
          type: 'object',
          properties: {
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            role: { type: 'string', enum: ['user','admin'] }
          }
        }
      }
    }
  },
  apis: ['src/routes/users.router.js'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;