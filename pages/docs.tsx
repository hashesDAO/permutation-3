import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function Docs() {
  return (
      <SwaggerUI url="/api/docs" />
  )
}