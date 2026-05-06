import React from 'react';
import { useParams } from 'react-router-dom';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div>
      <h1>Serviço: {slug}</h1>
      <p>Detalhe do serviço (slug). (A ser implementado)</p>
    </div>
  );
};
