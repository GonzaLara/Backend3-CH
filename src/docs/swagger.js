import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'API - Proyecto Adopciones',
      version: '1.0.0',
      description: 'Documentación de la API',
    },
  },
  apis: ['src/docs/**/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;